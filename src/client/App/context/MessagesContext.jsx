import React from 'react';
import { Context as SocketContext } from './SocketContext';

export default (props) => {
    const { children } = props;
    const { connected } = React.useContext(SocketContext);
    return (
        <div>
            <div>{ connected ? 'Connected' : 'Disconnected'}</div>
            <div>{ children }</div>
        </div>
    );
};
