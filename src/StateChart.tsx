import { useService } from '@xstate/react';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as XState from 'xstate';
import {
  assign,
  EventObject,
  interpret,
  Interpreter,
  Machine,
  send,
  spawn,
  State,
  StateNode
} from 'xstate';
import { raise } from 'xstate/lib/actions';
import { EventPanel } from './EventPanel';
import { StatePanel } from './StatePanel';
import { DocsPanel } from './DocsPanel';
import { ListPanel } from './ListPanel';
import { StateChartContainer, StyledStateChartContainer } from './VizTabs';

const StyledViewTab = styled.li`
  padding: 0 1rem;
  border-bottom: 2px solid transparent;
  list-style: none;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not([data-active]):hover {
    border-color: var(--color-secondary-light);
  }

  &[data-active] {
    border-color: var(--color-secondary);
  }
`;

const StyledViewTabs = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0;
  padding: 0;
  flex-grow: 0;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--color-sidebar);
`;

const StyledSidebar = styled.div`
  background-color: var(--color-sidebar);
  color: white;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2rem 1fr;
  border-top-left-radius: 1rem;
  box-shadow: var(--shadow);
  transition: transform 0.6s cubic-bezier(0.5, 0, 0.5, 1);
  z-index: 1;
`;

export const StyledStateChart = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr var(--sidebar-width, 25rem);
  grid-template-rows: 1fr;
  grid-template-areas: 'content sidebar';
  font-family: sans-serif;
  font-size: 12px;
  overflow: hidden;
  max-height: inherit;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  > ${StyledSidebar} {
    grid-area: sidebar;
  }

  > ${StyledStateChartContainer} {
    grid-area: content;
  }

  > * {
    max-height: inherit;
    overflow-y: auto;
  }

  [data-layout='viz'] & {
    > :not(${StyledSidebar}) {
      grid-column: 1 / -1;
    }

    > ${StyledSidebar} {
      transform: translateX(100%);
    }
  }
`;

interface StateChartProps {
  className?: string;
  machine: StateNode<any> | StateNode<any>[];
  onSave: (machineString: string) => void;
  height?: number | string;
}

export interface EventRecord {
  event: EventObject;
  time: number;
}
export interface StateChartState {
  machine: StateNode<any>;
  preview?: State<any, any>;
  previewEvent?: string;
  view: string; //"definition" | "state";
  code: string;
  toggledStates: Record<string, boolean>;
  error?: any;
  events: Array<EventRecord>;
}

export function toMachine(machine: StateNode<any> | string): StateNode<any> {
  if (typeof machine !== 'string') {
    return machine;
  }

  let createMachine: Function;
  try {
    createMachine = new Function(
      'Machine',
      'interpret',
      'assign',
      'send',
      'sendParent',
      'spawn',
      'raise',
      'actions',
      'XState',
      machine
    );
  } catch (e) {
    throw e;
  }

  const machines: Array<StateNode<any>> = [];

  const machineProxy = (config: any, options: any) => {
    const machine = Machine(config, options);
    machines.push(machine);
    return machine;
  };

  try {
    createMachine(
      machineProxy,
      interpret,
      assign,
      send,
      XState.sendParent,
      spawn,
      raise,
      XState.actions,
      XState
    );
  } catch (e) {
    throw e;
  }

  return machines[machines.length - 1]! as StateNode<any>;
}

export const StateChart: React.FC<StateChartProps> = ({
  onSave,
  className,
  ...props
}) => {
  const [resetCount, setResetCount] = useState(0);
  const [events, setEvents] = useState<EventRecord[]>([]);

  const machines =
    props.machine instanceof Array ? props.machine : [props.machine];
  const _machine = toMachine(machines[0]);

  const [machine, setMachine] = useState(_machine);
  useEffect(() => {
    setMachine(_machine);
  }, [_machine]);

  const service = useMemo(() => {
    return interpret(machine).start();
  }, [machine, resetCount]);

  const [current] = useService(service);

  useEffect(() => {
    const formattedEvent = {
      event: current.event,
      time: Date.now()
    };

    setEvents(events.concat(formattedEvent));
  }, [current]);

  const [allState, setState] = useState<StateChartState>(
    (() => {
      return {
        preview: undefined,
        previewEvent: undefined,
        view: 'state',
        machine: _machine,
        code:
          typeof _machine === 'string'
            ? _machine
            : `Machine(${JSON.stringify(_machine.config, null, 2)})`,
        toggledStates: {},
        events: []
      };
    })()
  );

  function renderView(
    current: State<any, any>,
    service: Interpreter<any, any, EventObject>
  ) {
    const { view } = allState;

    switch (view) {
      case 'state':
        return <StatePanel state={current} service={service} />;
      case 'docs':
        return <DocsPanel state={current} service={service} />;
      case 'events':
        return (
          <EventPanel state={current} service={service} records={events} />
        );
      case 'models':
        return (
          <ListPanel
            service={service}
            machines={machines}
            onUpdate={(machine) => {
              setEvents([]);
              setResetCount(0);
              setMachine(machine);

              const code = (() => {
                const _machine = toMachine(machine);

                return typeof _machine === 'string'
                  ? _machine
                  : `Machine(${JSON.stringify(_machine.config, null, 2)})`;
              })();
              setState({ ...allState, machine, code, events: [] });
            }}
          />
        );
      default:
        return null;
    }
  }

  function reset(code = allState.code, machine = allState.machine) {
    setEvents([]);
    setResetCount(resetCount + 1);
    setMachine(machine);
    setState({ ...allState, code });
  }

  const { code } = allState;
  const views = ['state', 'docs', 'events'];
  if (machines.length > 1) {
    views.push('models');
  }

  return (
    <StyledStateChart
      className={className}
      key={code}
      style={{
        background: 'var(--color-app-background)'
      }}
    >
      <StateChartContainer service={service} onReset={() => reset()} />
      <StyledSidebar>
        <StyledViewTabs>
          {views.map((view) => {
            return (
              <StyledViewTab
                onClick={() => setState({ ...allState, view })}
                key={view}
                data-active={allState.view === view || undefined}
              >
                {view}
              </StyledViewTab>
            );
          })}
        </StyledViewTabs>
        {renderView(current, service)}
      </StyledSidebar>
    </StyledStateChart>
  );
};
