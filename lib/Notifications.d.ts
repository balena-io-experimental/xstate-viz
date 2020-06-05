import React from 'react';
import { State } from 'xstate';
import { Actor } from 'xstate/lib/Actor';
export interface Notification {
    message: string;
    description?: string;
    severity: 'success' | 'warning' | 'error';
}
interface NotificationsContext {
    notifications: Array<Notification>;
}
export declare const notificationsMachine: import("xstate").StateMachine<NotificationsContext, any, import("xstate").EventObject>;
interface NotificationsProps {
    notifier: Actor<State<NotificationsContext>>;
}
export declare const Notifications: React.FunctionComponent<NotificationsProps>;
export {};
