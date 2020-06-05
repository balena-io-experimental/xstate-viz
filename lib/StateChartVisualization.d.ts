import React from 'react';
import { Interpreter } from 'xstate';
export declare const StateChartVisualization: React.SFC<{
    service: Interpreter<any, any>;
    visible: boolean;
    onSelectService: (service: Interpreter<any>) => void;
    onReset: () => void;
}>;
