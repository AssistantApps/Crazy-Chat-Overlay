import React from 'react';
import { ChatMessage } from '../contract/chatMessage';

interface IProps {
    msg: ChatMessage;
}

export const ChatMessageTile: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="message-wrapper">
            <p key={props.msg.id} className="message">
                <strong style={{ color: props.msg.colour }}>{props.msg.username}</strong>
                <span>: {props.msg.message}</span>
            </p>
        </div>
    );
}
