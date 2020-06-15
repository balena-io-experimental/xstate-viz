import React, { useEffect, useState } from 'react';
import { Machine, assign, State, interpret } from 'xstate';
import { Actor } from 'xstate/lib/Actor';
import { produce } from 'immer';
import { log } from 'xstate/lib/actions';
import styled from 'styled-components';

export interface Notification {
  message: string;
  description?: string;
  severity: 'success' | 'warning' | 'error';
}

interface NotificationsContext {
  notifications: Array<Notification>;
}

export const notificationsMachine = Machine<NotificationsContext>({
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
          actions: assign<NotificationsContext>({
            notifications: (ctx, e) =>
              produce(ctx.notifications, (draft) => {
                // TODO
                console.log(e);
                //draft.splice(e.index, 1);
              })
          })
        }
      }
    }
  },
  on: {
    'NOTIFICATIONS.QUEUE': {
      target: '.active',
      actions: assign<NotificationsContext>({
        notifications: (ctx, e) =>
          produce(ctx.notifications, (draft) => {
            console.log(e);
            //draft.unshift(e.data);
          })
      })
    }
  }
});

// TODO: move this somewhere else
const notificationsService = interpret(notificationsMachine).start();

export const notificationsActor: Actor & {
  notify: (message: string | Notification) => void;
} = {
  toJSON: () => ({ id: 'notifications' }),
  id: 'notifications',
  send: notificationsService.send.bind(notificationsService),
  subscribe: notificationsService.subscribe.bind(notificationsService),
  notify: (message: string | Notification) =>
    notificationsService.send({
      type: 'NOTIFICATIONS.QUEUE',
      data:
        typeof message === 'string' ? { message, severity: 'info' } : message
    })
};

interface NotificationsProps {
  notifier: Actor<State<NotificationsContext>>;
}

const StyledNotificationDismissButton = styled.button`
  appearance: none;
  background: transparent;
  color: white;
`;

const StyledNotification = styled.div`
  padding: 1rem;
  margin: 1rem;
  border-radius: var(--radius);
  border-top: 2px solid currentColor;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: white;
  box-shadow: var(--shadow);
  animation: notification-slideDown calc(var(--timeout, 4000) * 1ms) ease both;
  will-change: transform;
  transition: transform var(--duration);
  cursor: default;

  &[data-severity='success'] {
    color: #40d38d;
  }

  &[data-severity='info'] {
    color: #2f86eb;
  }

  &[data-severity='error'] {
    color: #f16462;
  }

  > ${StyledNotificationDismissButton} {
    position: absolute;
    right: 0;
  }

  @keyframes notification-slideDown {
    from {
      transform: translateY(-100%);
    }
    from,
    50% {
      pointer-events: auto;
      opacity: 1;
    }
    20%,
    to {
      transform: translateY(calc(var(--index) * 100% + 0.5rem));
    }
    to {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

const StyledNotifications = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;

  > ${StyledNotification} {
    position: absolute;
    pointer-events: auto;
  }
`;

const StyledNotificationDescription = styled.div`
  color: #111;
`;

export const Notifications: React.FunctionComponent<NotificationsProps> = ({
  notifier
}) => {
  const [current, setCurrent] = useState<
    State<NotificationsContext> | undefined
  >();

  useEffect(() => {
    notifier.subscribe((state) => {
      setCurrent(state);
    });
  }, []);

  if (!current) {
    return null;
  }

  const { notifications } = current.context;

  return (
    <StyledNotifications>
      {notifications.map((notification, i) => {
        return (
          <StyledNotification
            key={notifications.length - i}
            data-severity={notification.severity}
            style={{
              // @ts-ignore
              '--timeout': 5000,
              '--index': i
            }}
            onClick={() =>
              notifier.send({
                type: 'NOTIFICATION.DISMISS',
                index: i
              })
            }
          >
            <strong>{notification.message}</strong>
            {notification.description && (
              <StyledNotificationDescription>
                <small>
                  {notification.description}{' '}
                  {notification.severity === 'error'
                    ? '(See console for more details)'
                    : ''}
                </small>
              </StyledNotificationDescription>
            )}
          </StyledNotification>
        );
      })}
    </StyledNotifications>
  );
};
