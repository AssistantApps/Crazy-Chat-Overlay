import React from 'react';
import { IChatMessageTilePresenterProps } from './chatMessageProps';


export const ChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} className="message-wrapper">
            <p className="message default-tile">
                <strong style={{ color: props.msg.colour }}>{props.msg.username}</strong>
                <span>: {props.msg.message}</span>
            </p>
        </div>
    );
}
