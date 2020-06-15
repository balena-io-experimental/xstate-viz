var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useState } from 'react';
import { Machine, assign, interpret } from 'xstate';
import { produce } from 'immer';
import { log } from 'xstate/lib/actions';
import styled from 'styled-components';
export var notificationsMachine = Machine({
    id: 'notifications',
    context: {
        notifications: []
    },
    initial: 'inactive',
    states: {
        inactive: {},
        active: {
            entry: log(),
            on: {
                'NOTIFICATION.DISMISS': {
                    actions: assign({
                        notifications: function (ctx, e) {
                            return produce(ctx.notifications, function (draft) {
                                // TODO
                                console.log(e);
                                //draft.splice(e.index, 1);
                            });
                        }
                    })
                }
            }
        }
    },
    on: {
        'NOTIFICATIONS.QUEUE': {
            target: '.active',
            actions: assign({
                notifications: function (ctx, e) {
                    return produce(ctx.notifications, function (draft) {
                        console.log(e);
                        //draft.unshift(e.data);
                    });
                }
            })
        }
    }
});
// TODO: move this somewhere else
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
var StyledNotificationDismissButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  appearance: none;\n  background: transparent;\n  color: white;\n"], ["\n  appearance: none;\n  background: transparent;\n  color: white;\n"])));
var StyledNotification = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 1rem;\n  margin: 1rem;\n  border-radius: var(--radius);\n  border-top: 2px solid currentColor;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  background: white;\n  box-shadow: var(--shadow);\n  animation: notification-slideDown calc(var(--timeout, 4000) * 1ms) ease both;\n  will-change: transform;\n  transition: transform var(--duration);\n  cursor: default;\n\n  &[data-severity='success'] {\n    color: #40d38d;\n  }\n\n  &[data-severity='info'] {\n    color: #2f86eb;\n  }\n\n  &[data-severity='error'] {\n    color: #f16462;\n  }\n\n  > ", " {\n    position: absolute;\n    right: 0;\n  }\n\n  @keyframes notification-slideDown {\n    from {\n      transform: translateY(-100%);\n    }\n    from,\n    50% {\n      pointer-events: auto;\n      opacity: 1;\n    }\n    20%,\n    to {\n      transform: translateY(calc(var(--index) * 100% + 0.5rem));\n    }\n    to {\n      opacity: 0;\n      pointer-events: none;\n    }\n  }\n"], ["\n  padding: 1rem;\n  margin: 1rem;\n  border-radius: var(--radius);\n  border-top: 2px solid currentColor;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  background: white;\n  box-shadow: var(--shadow);\n  animation: notification-slideDown calc(var(--timeout, 4000) * 1ms) ease both;\n  will-change: transform;\n  transition: transform var(--duration);\n  cursor: default;\n\n  &[data-severity='success'] {\n    color: #40d38d;\n  }\n\n  &[data-severity='info'] {\n    color: #2f86eb;\n  }\n\n  &[data-severity='error'] {\n    color: #f16462;\n  }\n\n  > ", " {\n    position: absolute;\n    right: 0;\n  }\n\n  @keyframes notification-slideDown {\n    from {\n      transform: translateY(-100%);\n    }\n    from,\n    50% {\n      pointer-events: auto;\n      opacity: 1;\n    }\n    20%,\n    to {\n      transform: translateY(calc(var(--index) * 100% + 0.5rem));\n    }\n    to {\n      opacity: 0;\n      pointer-events: none;\n    }\n  }\n"])), StyledNotificationDismissButton);
var StyledNotifications = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  z-index: 10;\n\n  > ", " {\n    position: absolute;\n    pointer-events: auto;\n  }\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  z-index: 10;\n\n  > ", " {\n    position: absolute;\n    pointer-events: auto;\n  }\n"])), StyledNotification);
var StyledNotificationDescription = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: #111;\n"], ["\n  color: #111;\n"])));
export var Notifications = function (_a) {
    var notifier = _a.notifier;
    var _b = useState(), current = _b[0], setCurrent = _b[1];
    useEffect(function () {
        notifier.subscribe(function (state) {
            setCurrent(state);
        });
    }, []);
    if (!current) {
        return null;
    }
    var notifications = current.context.notifications;
    return (React.createElement(StyledNotifications, null, notifications.map(function (notification, i) {
        return (React.createElement(StyledNotification, { key: notifications.length - i, "data-severity": notification.severity, style: {
                // @ts-ignore
                '--timeout': 5000,
                '--index': i
            }, onClick: function () {
                return notifier.send({
                    type: 'NOTIFICATION.DISMISS',
                    index: i
                });
            } },
            React.createElement("strong", null, notification.message),
            notification.description && (React.createElement(StyledNotificationDescription, null,
                React.createElement("small", null,
                    notification.description,
                    ' ',
                    notification.severity === 'error'
                        ? '(See console for more details)'
                        : '')))));
    })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
