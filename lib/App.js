var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { createContext, useReducer } from 'react';
import { StateChart, Notifications } from './index';
import styled from 'styled-components';
import { Machine, assign } from 'xstate';
import queryString from 'query-string';
import { useMachine } from '@xstate/react';
import { User } from './User';
import { examples } from './examples';
import { Header, notificationsActor } from './Header';
import { Logo } from './logo';
import { Loader } from './Loader';
import { LayoutButton, StyledLayoutButton } from './LayoutButton';
import { toMachine } from './StateChart';
export var StyledHeader = styled.header(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: stretch;\n  grid-area: header;\n  padding: 0.5rem 1rem;\n  z-index: 1;\n  white-space: nowrap;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: stretch;\n  grid-area: header;\n  padding: 0.5rem 1rem;\n  z-index: 1;\n  white-space: nowrap;\n"])));
var StyledApp = styled.main(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  --color-app-background: #fff;\n  --color-border: #c9c9c9;\n  --color-primary: rgba(87, 176, 234, 1);\n  --color-primary-faded: rgba(87, 176, 234, 0.5);\n  --color-primary-shadow: rgba(87, 176, 234, 0.1);\n  --color-link: rgba(87, 176, 234, 1);\n  --color-disabled: #b3b3b3;\n  --color-edge: #c9c9c9;\n  --color-edge-active: var(--color-primary);\n  --color-secondary: rgba(255, 152, 0, 1);\n  --color-secondary-light: rgba(255, 152, 0, 0.5);\n  --color-sidebar: #272722;\n  --color-gray: #555;\n  --color-failure: #ee7170;\n  --color-success: #31ae00;\n  --radius: 0.2rem;\n  --border-width: 2px;\n  --sidebar-width: 25rem;\n  --shadow: 0 0.5rem 1rem var(--shadow-color, rgba(0, 0, 0, 0.2));\n  --duration: 0.2s;\n  --easing: cubic-bezier(0.5, 0, 0.5, 1);\n\n  height: 100%;\n  display: grid;\n  grid-template-areas:\n    'header sidebar'\n    'content content';\n  grid-template-rows: 3rem auto;\n  grid-template-columns: auto var(--sidebar-width);\n  overflow: hidden;\n\n  > ", " {\n    display: inline-block;\n    grid-row: 2;\n    grid-column: -1;\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: 50% 50%;\n  }\n\n  &[data-embed] {\n    grid-template-rows: 0 auto;\n\n    > ", " {\n      display: none;\n    }\n  }\n"], ["\n  --color-app-background: #fff;\n  --color-border: #c9c9c9;\n  --color-primary: rgba(87, 176, 234, 1);\n  --color-primary-faded: rgba(87, 176, 234, 0.5);\n  --color-primary-shadow: rgba(87, 176, 234, 0.1);\n  --color-link: rgba(87, 176, 234, 1);\n  --color-disabled: #b3b3b3;\n  --color-edge: #c9c9c9;\n  --color-edge-active: var(--color-primary);\n  --color-secondary: rgba(255, 152, 0, 1);\n  --color-secondary-light: rgba(255, 152, 0, 0.5);\n  --color-sidebar: #272722;\n  --color-gray: #555;\n  --color-failure: #ee7170;\n  --color-success: #31ae00;\n  --radius: 0.2rem;\n  --border-width: 2px;\n  --sidebar-width: 25rem;\n  --shadow: 0 0.5rem 1rem var(--shadow-color, rgba(0, 0, 0, 0.2));\n  --duration: 0.2s;\n  --easing: cubic-bezier(0.5, 0, 0.5, 1);\n\n  height: 100%;\n  display: grid;\n  grid-template-areas:\n    'header sidebar'\n    'content content';\n  grid-template-rows: 3rem auto;\n  grid-template-columns: auto var(--sidebar-width);\n  overflow: hidden;\n\n  > ", " {\n    display: inline-block;\n    grid-row: 2;\n    grid-column: -1;\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: 50% 50%;\n  }\n\n  &[data-embed] {\n    grid-template-rows: 0 auto;\n\n    > ", " {\n      display: none;\n    }\n  }\n"])), StyledLayoutButton, StyledHeader);
export var StyledLogo = styled(Logo)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 2rem;\n"], ["\n  height: 2rem;\n"])));
export var StyledLink = styled.a(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-decoration: none;\n  color: #57b0ea;\n  text-transform: uppercase;\n  display: block;\n  font-size: 75%;\n  font-weight: bold;\n  margin: 0 0.25rem;\n"], ["\n  text-decoration: none;\n  color: #57b0ea;\n  text-transform: uppercase;\n  display: block;\n  font-size: 75%;\n  font-weight: bold;\n  margin: 0 0.25rem;\n"])));
export var StyledLinks = styled.nav(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n\n  > ", " {\n    line-height: 2rem;\n    margin-left: 1rem;\n  }\n\n  &,\n  &:visited {\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n\n  > ", " {\n    line-height: 2rem;\n    margin-left: 1rem;\n  }\n\n  &,\n  &:visited {\n  }\n"])), StyledLink);
var invokeSaveGist = function (ctx, e) {
    return fetch("https://api.github.com/gists/" + ctx.gist.id, {
        method: 'post',
        body: JSON.stringify({
            description: 'Generated by XState Viz: https://xstate.js.org/viz',
            public: true,
            files: {
                'machine.js': { content: e.code }
            }
        }),
        headers: {
            Authorization: "token " + ctx.token
        }
    }).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!response.ok) return [3 /*break*/, 2];
                    _a = Error.bind;
                    return [4 /*yield*/, response.json()];
                case 1: throw new (_a.apply(Error, [void 0, (_b.sent()).message]))();
                case 2: return [2 /*return*/, response.json()];
            }
        });
    }); });
};
var invokePostGist = function (ctx, e) {
    return fetch("https://api.github.com/gists", {
        method: 'post',
        body: JSON.stringify({
            description: 'Generated by XState Viz: https://xstate.js.org/viz',
            public: true,
            files: {
                'machine.js': { content: e.code }
            }
        }),
        headers: {
            Authorization: "token " + ctx.token
        }
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to post gist');
        }
        return response.json();
    });
};
function parseGist(gistQuery) {
    var gistMatch = gistQuery.match(/([a-zA-Z0-9]{32})/);
    return !gistMatch ? null : gistMatch[0];
}
var invokeFetchGist = function (ctx) {
    var gist = parseGist(ctx.query.gist);
    if (!gist) {
        return Promise.reject('Invalid gist ID.');
    }
    return fetch("https://api.github.com/gists/" + gist, {
        headers: {
            Accept: 'application/json'
        }
    }).then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!data.ok) return [3 /*break*/, 2];
                    _a = Error.bind;
                    return [4 /*yield*/, data.json()];
                case 1: throw new (_a.apply(Error, [void 0, (_b.sent()).message]))();
                case 2: return [2 /*return*/, data.json()];
            }
        });
    }); });
};
var getUser = function (ctx) {
    return fetch("https://api.github.com/user", {
        headers: {
            Authorization: "token " + ctx.token
        }
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to get user');
        }
        return response.json();
    });
};
function createAuthActor() {
    var listener = null;
    var code = null;
    return {
        send: function (_code) {
            code = _code;
            if (listener) {
                listener(_code);
            }
        },
        listen: function (l) {
            listener = l;
            if (code) {
                listener(code);
            }
        }
    };
}
function updateQuery(query) {
    if (!window.history)
        return;
    var fullQuery = __assign(__assign({}, queryString.parse(window.location.search)), query);
    window.history.replaceState(null, '', "?" + queryString.stringify(fullQuery));
}
window.updateQuery = updateQuery;
var authActor = createAuthActor();
window.authCallback = function (code) {
    authActor.send(code);
};
var query = queryString.parse(window.location.search);
var appMachine = Machine({
    id: 'app',
    context: {
        query: query,
        token: undefined,
        // token: process.env.REACT_APP_TEST_TOKEN,
        gist: undefined,
        machine: examples.basic,
        user: undefined
    },
    invoke: [
        {
            id: 'test',
            src: function () { return function (cb) {
                authActor.listen(function (code) {
                    cb({ type: 'CODE', code: code });
                });
            }; }
        }
    ],
    type: 'parallel',
    states: {
        auth: {
            initial: 'checkingCode',
            states: {
                checkingCode: {
                    on: {
                        '': [
                            {
                                target: 'authorizing',
                                cond: function (ctx) {
                                    return !!ctx.query.code;
                                }
                            },
                            {
                                target: 'gettingUser',
                                cond: function (ctx) {
                                    return !!ctx.token;
                                }
                            },
                            {
                                target: 'unauthorized',
                                actions: assign({
                                    machine: examples.basic
                                })
                            }
                        ]
                    }
                },
                authorizing: {
                    invoke: {
                        src: function (ctx, e) {
                            return fetch("https://xstate-gist.azurewebsites.net/api/GistPost?code=" + e.code + "&redirect_uri=" + encodeURI(window.location.href))
                                .then(function (response) {
                                if (!response.ok) {
                                    throw new Error('unauthorized');
                                }
                                return response.json();
                            })
                                .then(function (data) {
                                if (data.error) {
                                    throw new Error('expired code');
                                }
                                return data;
                            });
                        },
                        onDone: {
                            target: 'gettingUser',
                            actions: assign({
                                token: function (ctx, e) { return e.data.access_token; }
                            })
                        },
                        onError: {
                            target: 'unauthorized',
                            actions: function (_, e) { return alert(e.data); }
                        }
                    }
                },
                gettingUser: {
                    invoke: {
                        src: getUser,
                        onDone: {
                            target: 'authorized',
                            actions: assign({
                                // @ts-ignore
                                user: function (_, e) { return e.data; }
                            })
                        },
                        onError: {
                            target: 'unauthorized',
                            actions: function (_, e) {
                                console.error(e);
                                notificationsActor.notify({
                                    message: 'Authorization failed',
                                    description: e.data.message,
                                    severity: 'error'
                                });
                            }
                        }
                    }
                },
                authorized: {
                    type: 'parallel',
                    states: {
                        user: {},
                        gist: {
                            initial: 'idle',
                            states: {
                                idle: {
                                    initial: 'default',
                                    states: {
                                        default: {},
                                        patched: {
                                            after: {
                                                1000: 'default'
                                            }
                                        },
                                        posted: {
                                            after: {
                                                1000: 'default'
                                            }
                                        }
                                    }
                                },
                                patching: {
                                    invoke: {
                                        src: invokeSaveGist,
                                        onDone: {
                                            target: 'idle.patched',
                                            actions: [
                                                function (ctx) {
                                                    return notificationsActor.notify({
                                                        message: 'Saved!',
                                                        description: 'Copy and paste the URL to share the visualization.',
                                                        severity: 'success'
                                                    });
                                                }
                                            ]
                                        },
                                        onError: {
                                            target: 'idle',
                                            actions: function (ctx, e) {
                                                console.error(e);
                                                notificationsActor.notify({
                                                    message: 'Failed to save machine',
                                                    severity: 'error',
                                                    description: e.data.message
                                                });
                                            }
                                        }
                                    }
                                },
                                posting: {
                                    invoke: {
                                        src: invokePostGist,
                                        onDone: {
                                            target: 'idle.posted',
                                            actions: [
                                                assign({
                                                    gist: function (_, e) { return e.data; }
                                                }),
                                                function () {
                                                    return notificationsActor.notify({
                                                        message: 'Visualization uploaded!',
                                                        description: 'Copy and paste the URL to share the visualization.',
                                                        severity: 'success'
                                                    });
                                                },
                                                function (_a) {
                                                    var gist = _a.gist;
                                                    return updateQuery({ gist: gist.id });
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            on: {
                                'GIST.SAVE': [
                                    {
                                        target: '.idle',
                                        cond: function (ctx, e) {
                                            try {
                                                toMachine(e.code);
                                            }
                                            catch (e) {
                                                console.error(e);
                                                notificationsActor.notify({
                                                    message: 'Failed to upload machine',
                                                    severity: 'error',
                                                    description: e.message
                                                });
                                                return true;
                                            }
                                            return false;
                                        }
                                    },
                                    {
                                        target: '.patching',
                                        cond: function (ctx) {
                                            return (!!ctx.gist && ctx.gist.owner.login === ctx.user.login);
                                        }
                                    },
                                    { target: '.posting' }
                                ]
                            }
                        }
                    },
                    on: {
                        LOGOUT: {
                            target: 'unauthorized',
                            actions: assign({
                                token: undefined,
                                user: undefined
                            })
                        }
                    }
                },
                unauthorized: {
                    on: {
                        LOGIN: 'pendingAuthorization',
                        'GIST.SAVE': 'pendingAuthorization'
                    }
                },
                pendingAuthorization: {
                    entry: function () {
                        window.open('https://github.com/login/oauth/authorize?client_id=39c1ec91c4ed507f6e4c&scope=gist', 'Login with GitHub', 'width=800,height=600');
                    },
                    on: {
                        CODE: 'authorizing',
                        'AUTH.CANCEL': 'unauthorized'
                    },
                    after: {
                        AUTH_TIMEOUT: {
                            target: 'unauthorized',
                            actions: function () {
                                notificationsActor.notify({
                                    message: 'Authorization timed out',
                                    severity: 'error'
                                });
                            }
                        }
                    }
                }
            },
            on: {
                LOGIN: '.pendingAuthorization'
            }
        },
        gist: {
            initial: 'checking',
            states: {
                checking: {
                    on: {
                        '': [
                            { target: 'fetching', cond: function (ctx) { return !!ctx.query.gist; } },
                            { target: 'idle' }
                        ]
                    }
                },
                idle: {},
                fetching: {
                    invoke: {
                        src: invokeFetchGist,
                        onDone: {
                            target: 'loaded',
                            actions: assign({
                                gist: function (_, e) { return e.data; },
                                // @ts-ignore
                                machine: function (_, e) {
                                    return e.data.files['machine.js'].content;
                                }
                            })
                        },
                        onError: {
                            target: 'idle',
                            actions: [
                                assign({
                                    gist: undefined
                                }),
                                function (ctx, e) {
                                    notificationsActor.notify({
                                        message: "Gist not found",
                                        description: "" + e.data,
                                        severity: 'error'
                                    });
                                }
                            ]
                        }
                    }
                },
                loaded: {
                    entry: function (ctx, e) { return notificationsActor.notify('Gist loaded!'); }
                }
            }
        }
    }
}, {
    delays: {
        AUTH_TIMEOUT: 15000
    }
});
export var AppContext = createContext({ state: appMachine.initialState, send: function () { }, service: {} });
function layoutReducer(state, event) {
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
export function App() {
    var _a = useMachine(appMachine), current = _a[0], send = _a[1], service = _a[2];
    var _b = useReducer(layoutReducer, query.layout || (!!query.embed ? 'viz' : 'full')), layout = _b[0], dispatchLayout = _b[1];
    return (React.createElement(StyledApp, { "data-layout": layout, "data-embed": query.embed },
        React.createElement(Notifications, { notifier: notificationsActor }),
        React.createElement(AppContext.Provider, { value: { state: current, send: send, service: service } },
            React.createElement(User, null),
            React.createElement(Header, null),
            current.matches({ gist: 'fetching' }) ? (React.createElement(Loader, null)) : (React.createElement(React.Fragment, null,
                React.createElement(StateChart, { machine: current.context.machine, onSave: function (code) {
                        send('GIST.SAVE', { code: code });
                    } }),
                React.createElement(LayoutButton, { onClick: function () { return dispatchLayout('TOGGLE'); } }, { full: 'Hide', viz: 'Code' }[layout] || 'Show'))))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
