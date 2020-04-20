import React from 'react';
import { Context as MessageContext } from '../context/MessagesContext';

export default () => {
    const { messages } = React.useContext(MessageContext);

    return (
        <div>
            {
                messages.map(message => (
                    <div key={Math.random()}>{message}</div>
                ))
            }
        </div>
    );
};
