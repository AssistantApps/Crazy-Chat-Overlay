import React from 'react';
import { IChatMessageTilePresenterProps } from './chatMessageProps';


export const ChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div className="message-wrapper">
            <p key={props.msg.id} className="message">
                <strong style={{ color: props.msg.colour }}>{props.msg.username}</strong>
                <span>: {props.msg.message}</span>
            </p>
        </div>
    );
}
