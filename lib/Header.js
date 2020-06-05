import React from 'react';
import { notificationsMachine } from './Notifications';
import { StyledHeader, StyledLogo, StyledLinks, StyledLink } from './App';
import { interpret } from 'xstate';
var notificationsService = interpret(notificationsMachine).start();
export var notificationsActor = {
    toJSON: function () { return ({ id: 'notifications' }); },
    id: 'notifications',
    send: notificationsService.send.bind(notificationsService),
    subscribe: notificationsService.subscribe.bind(notificationsService),
    notify: function (message) {
        return notificationsService.send({
            type: 'NOTIFICATIONS.QUEUE',
            data: typeof message === 'string' ? { message: message, severity: 'info' } : message
        });
    }
};
export function Header() {
    return (React.createElement(StyledHeader, null,
        React.createElement(StyledLogo, null),
        React.createElement(StyledLinks, null,
            React.createElement(StyledLink, { href: "https://github.com/davidkpiano/xstate", target: "_xstate-github" }, "GitHub"),
            React.createElement(StyledLink, { href: "https://xstate.js.org/docs", target: "_xstate-docs" }, "Docs"),
            React.createElement(StyledLink, { href: "https://spectrum.chat/statecharts", target: "_statecharts-community" }, "Community"),
            React.createElement(StyledLink, { href: "https://opencollective.com/xstate", target: "_sponsor" }, "Sponsor \uD83D\uDC99"))));
}
