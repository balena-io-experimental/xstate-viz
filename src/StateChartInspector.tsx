import React, { useReducer } from 'react';
import { StateChart, Notifications } from './index';
import styled from 'styled-components';
import queryString from 'query-string';
import { notificationsActor } from './Notifications';

import { LayoutButton, StyledLayoutButton } from './LayoutButton';

import { StateNode } from 'xstate';

const StyledApp = styled.main`
  --color-app-background: #fff;
  --color-border: #c9c9c9;
  --color-primary: rgba(87, 176, 234, 1);
  --color-primary-faded: rgba(87, 176, 234, 0.5);
  --color-primary-shadow: rgba(87, 176, 234, 0.1);
  --color-link: rgba(87, 176, 234, 1);
  --color-disabled: #b3b3b3;
  --color-edge: #c9c9c9;
  --color-edge-active: var(--color-primary);
  --color-secondary: rgba(255, 152, 0, 1);
  --color-secondary-light: rgba(255, 152, 0, 0.5);
  --color-sidebar: #272722;
  --color-gray: #555;
  --color-failure: #ee7170;
  --color-success: #31ae00;
  --radius: 0.2rem;
  --border-width: 2px;
  --sidebar-width: 25rem;
  --shadow: 0 0.5rem 1rem var(--shadow-color, rgba(0, 0, 0, 0.2));
  --duration: 0.2s;
  --easing: cubic-bezier(0.5, 0, 0.5, 1);

  height: 100%;
  display: grid;
  grid-template-areas:
    'header sidebar'
    'content content';
  grid-template-rows: 3rem auto;
  grid-template-columns: auto var(--sidebar-width);
  overflow: hidden;

  > ${StyledLayoutButton} {
    display: inline-block;
    grid-row: 2;
    grid-column: -1;
  }

  @media (max-width: 900px) {
    grid-template-columns: 50% 50%;
  }

  &[data-embed] {
    grid-template-rows: 0 auto;
  }
`;

function updateQuery(query: Record<string, string | undefined>): void {
  if (!window.history) return;

  const fullQuery = {
    ...queryString.parse(window.location.search),
    ...query
  };

  window.history.replaceState(null, '', `?${queryString.stringify(fullQuery)}`);
}

(window as any).updateQuery = updateQuery;

const query = queryString.parse(window.location.search);

function layoutReducer(state: string, event: string) {
  switch (state) {
    case 'full':
      switch (event) {
        case 'TOGGLE':
          return 'viz';
        default:
          return state;
      }
    case 'viz':
      switch (event) {
        case 'TOGGLE':
          return 'full';
        default:
          return state;
      }
    default:
      return state;
  }
}

export const StateChartInspector: React.FC<{
  machine: StateNode<any, any, any>;
}> = ({ machine }) => {
  const [layout, dispatchLayout] = useReducer(
    layoutReducer,
    (query.layout as string) || (!!query.embed ? 'viz' : 'full')
  );

  return (
    <StyledApp data-layout={layout} data-embed={query.embed}>
      <Notifications notifier={notificationsActor} />
      <>
        <StateChart machine={machine} onSave={() => void 0} />
        <LayoutButton onClick={() => dispatchLayout('TOGGLE')}>
          {({ full: 'Hide', viz: 'Context' } as Record<string, string>)[
            layout
          ] || 'Show'}
        </LayoutButton>
      </>
    </StyledApp>
  );
};
