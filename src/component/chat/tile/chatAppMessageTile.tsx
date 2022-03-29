import React from 'react';
import { formatDate } from '../../../helper/dateHelper';
import { ChatMessage } from '../base/chatMessage';
import { IChatMessageTilePresenterProps } from './chatMessageProps';

export const ChatAppMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} data-id="ChatAppMessageTile" className="message-wrapper">
            <ChatMessage settings={props.settings}>
                <div className="msg-info">
                    <div className="name">
                        <span style={{ color: props.msg.colour }}>{props.msg.username}</span>
                    </div>
                    <div className="time">{formatDate(props.msg.date, 'HH:mm')}</div>
                </div>

                <p key={props.msg.id}>
                    {props.msg.message}
                </p>
            </ChatMessage>
        </div>
    );
}
