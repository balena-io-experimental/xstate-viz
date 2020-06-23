import React, { useState, useMemo } from 'react';
import { Interpreter, Machine } from 'xstate';
import { StateChartVisualization } from './StateChartVisualization';
import styled from 'styled-components';

interface StateChartContainerProps {
  service: Interpreter<any, any>;
  onReset: () => void;
}

export const StyledStateChartContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  padding: 0 1rem;
  overflow-y: auto;
`;

const ActorContainer: React.SFC<StateChartContainerProps> = ({
  service,
  onReset
}) => (
  <>
    <StateChartVisualization
      service={service}
      visible={true}
      onSelectService={() => void 0}
      onReset={onReset}
    />
    {Array.from(service.children.values()).map((child: any) => {
      if (!child.state) {
        return null;
      }

      return (
        <ActorContainer
          key={JSON.stringify(child)}
          service={child}
          onReset={onReset}
        />
      );
    })}
  </>
);

export const StateChartContainer: React.SFC<StateChartContainerProps> = ({
  service,
  onReset
}) => {
  return (
    <StyledStateChartContainer>
      <ActorContainer service={service} onReset={onReset} />
    </StyledStateChartContainer>
  );
};
