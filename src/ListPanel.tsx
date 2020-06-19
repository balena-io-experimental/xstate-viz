import React, { useEffect, useRef } from 'react';
import { StateNode, Interpreter } from 'xstate';
import styled from 'styled-components';
import { StyledButton } from './Button';

const StyledListPanelList = styled.ul`
  list-style: none;
  padding: 0;
  overflow-y: scroll;
`;

const StyledListPanelItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #444;
  padding: 0 0.5rem;

  > pre {
    margin: 0;
    flex-grow: 1;
  }

  &[data-loaded] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  details {
    width: 100%;
  }

  summary {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 2rem;

    > :first-child {
      margin-right: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const StyledListPanel = styled.section`
  display: grid;
  grid-template-rows: 1fr 10rem;
  grid-template-areas: 'events' 'editor';
  overflow: hidden;
`;

export const ListPanel: React.FunctionComponent<{
  service: Interpreter<any>;
  machines: StateNode<any>[];
  onUpdate: (machine: StateNode<any>) => void;
}> = ({ machines, service, onUpdate: update }) => {
  const machinesRef = useRef<any>(null);
  useEffect(() => {
    if (machinesRef.current) {
      machinesRef.current.scrollTop = machinesRef.current.scrollHeight;
    }
  }, [machinesRef.current, machines.length]);

  return (
    <StyledListPanel>
      <StyledListPanelList ref={machinesRef}>
        {machines.map(({ machine }, i) => {
          const isCurrent = machine === service.machine;
          const { title, description } = machine.meta ?? { title: machine.id };

          return (
            <StyledListPanelItem
              key={i}
              title="Click on 'load' to view the selected machine"
              data-loaded={isCurrent || undefined}
            >
              <details>
                <summary>
                  <>
                    <strong title={title}>{title}</strong>
                    <StyledButton
                      data-variant="link"
                      onClick={() => update(machine)}
                      disabled={isCurrent}
                    >
                      Load
                    </StyledButton>
                  </>
                </summary>
                {description}
              </details>
            </StyledListPanelItem>
          );
        })}
      </StyledListPanelList>
    </StyledListPanel>
  );
};
