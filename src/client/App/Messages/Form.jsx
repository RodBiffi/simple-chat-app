import React from 'react';
import { Context as MessageContext } from '../context/MessagesContext';

export default () => {
    const { addMessage } = React.useContext(MessageContext);
    const inputRef = React.useRef(null);

    const handleAddMessageClick = () => {
        addMessage(inputRef.current.value);
    }

    return (
        <div>
            <input ref={inputRef} name="message" type="text" />
            <input type="button" value="Send" onClick={handleAddMessageClick} />
        </div>
    )
}
