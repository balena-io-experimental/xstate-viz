/// <reference types="react" />
import { Actor } from 'xstate/lib/Actor';
import { Notification } from './Notifications';
export declare const notificationsActor: Actor & {
    notify: (message: string | Notification) => void;
};
export declare function Header(): JSX.Element;
