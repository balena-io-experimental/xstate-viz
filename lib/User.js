var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from 'react';
import { AppContext } from './App';
import styled from 'styled-components';
import { StyledButton } from './Button';
var StyledUserName = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-weight: bold;\n  font-size: 0.8rem;\n"], ["\n  font-weight: bold;\n  font-size: 0.8rem;\n"])));
var StyledUserDetails = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: right;\n  animation: fade-in-left 0.6s var(--easing);\n\n  @keyframes fade-in-left {\n    from {\n      transform: translateX(50%);\n      opacity: 0;\n    }\n    to: {\n      transform: none;\n      opacity: 1;\n    }\n  }\n"], ["\n  text-align: right;\n  animation: fade-in-left 0.6s var(--easing);\n\n  @keyframes fade-in-left {\n    from {\n      transform: translateX(50%);\n      opacity: 0;\n    }\n    to: {\n      transform: none;\n      opacity: 1;\n    }\n  }\n"])));
var StyledUser = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 100%;\n  display: grid;\n  grid-template-columns: 1fr 3rem;\n  grid-column-gap: 1rem;\n  grid-template-rows: 50% 50%;\n  grid-template-areas:\n    'details avatar'\n    'details avatar';\n  padding: 0.5rem;\n\n  &:not([data-state~='auth.authorized']) {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n  }\n\n  > ", " {\n    grid-area: details;\n    justify-self: end;\n  }\n\n  > figure {\n    margin: 0;\n    grid-area: avatar;\n  }\n"], ["\n  height: 100%;\n  display: grid;\n  grid-template-columns: 1fr 3rem;\n  grid-column-gap: 1rem;\n  grid-template-rows: 50% 50%;\n  grid-template-areas:\n    'details avatar'\n    'details avatar';\n  padding: 0.5rem;\n\n  &:not([data-state~='auth.authorized']) {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n  }\n\n  > ", " {\n    grid-area: details;\n    justify-self: end;\n  }\n\n  > figure {\n    margin: 0;\n    grid-area: avatar;\n  }\n"])), StyledUserDetails);
var StyledImg = styled.img(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 100%;\n  border-radius: 0.5rem;\n  background: gray;\n"], ["\n  height: 100%;\n  border-radius: 0.5rem;\n  background: gray;\n"])));
export var User = function () {
    var _a = useContext(AppContext), state = _a.state, send = _a.send;
    var user = state.context.user;
    return (React.createElement("div", null,
        React.createElement(StyledUser, { "data-state": state.toStrings().join(' ') }, state.matches({ auth: 'unauthorized' }) ? (React.createElement(StyledButton, { "data-variant": "link", onClick: function () { return send('LOGIN'); } }, "Login")) : !state.matches({ auth: 'authorized' }) ? (React.createElement("div", null,
            "Authorizing...",
            ' ',
            React.createElement(StyledButton, { "data-variant": "link", onClick: function () { return send('AUTH.CANCEL'); } }, "Cancel"))) : (React.createElement(React.Fragment, null,
            React.createElement(StyledUserDetails, null,
                React.createElement(StyledUserName, null, user ? user.login : React.createElement("em", null, "Anonymous")),
                React.createElement(StyledButton, { "data-variant": "link", onClick: function () { return send('LOGOUT'); } }, "Log out")),
            React.createElement("figure", null, user ? (React.createElement(StyledImg, { src: user.avatar_url })) : (React.createElement(StyledImg, { as: "div" }))))))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
