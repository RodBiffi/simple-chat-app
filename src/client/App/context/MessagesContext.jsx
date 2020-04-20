import React from 'react';
import { Context as SocketContext } from './SocketContext';

const messageTypes = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
};

const addMessage = (send) => (message) => {
    send({
        type: messageTypes.ADD,
        message,
    });
};

const editMessage = (sendHandler) => (message) => {
    sendHandler({
        type: messageTypes.EDIT,
        id: message.id,
        message,
    });
};

const deleteMessage = (sendHandler) => (message) => {
    sendHandler({
        type: messageTypes.DELETE,
        id: message.id,
    });
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
    const { send, subscribe } = React.useContext(SocketContext);
    const [contextState, setContextState] = React.useState(contextInitialState);

    React.useEffect(() => {
        setContextState(prevState => ({
            ...prevState,
            addMessage,
            editMessage: editMessage(send),
            deleteMessage: deleteMessage(send),
        }));
    }, [send, setContextState]);

    React.useEffect(() => {
        subscribe((data) => {
            setContextState(prevState => ({
                ...prevState,
                messages: prevState.messages.concat(data.message),
            }));
        });
    }, [subscribe,  setContextState])

    const addMessage = (message) => {
        send({
            type: messageTypes.ADD,
            message,
        });
    };

    return (
        <Context.Provider value={contextState}>
            { children }
        </Context.Provider>
    );
};
