import React from 'react';
import { Context as SocketContext } from './SocketContext';

const messageTypes = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
};

const addMessage = (sendHandler) => (message) => {

};

const editMessage = (sendHandler) => (message) => {

};

const deleteMessage = (sendHandler) => (message) => {

};

const contextInitialState = {
    messages: [],
    addMessage: () => {},
    editMessage: () => {},
    deleteMessage: () => {},
};

export const Context = React.createContext(contextInitialState);

export default (props) => {
    const { children } = props;
    const { socket } = React.useContext(SocketContext);
    const [contextState, setContextState] = React.useState(contextInitialState);

    React.useEffect(() => {
        setContextState({
            ...contextState,
            addMessage: addMessage(socket.send),
            editMessage: editMessage(socket.send),
            deleteMessage: deleteMessage(socket.send),
        });
    }, []);

    return (
        <Context.Provider value={contextState}>
            { children }
        </Context.Provider>
    );
};
