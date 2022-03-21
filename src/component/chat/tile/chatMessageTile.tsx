import React from 'react';
import { IChatMessageTilePresenterProps } from './chatMessageProps';
import { MessageWithEmojis } from './messageWithEmojis';


export const ChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} className="message-wrapper">
            <p className="message default-tile">
                <strong style={{ color: props.msg.colour }}>{props.msg.username}</strong>
                <span>:&nbsp;
                    <MessageWithEmojis
                        key={props.msg.message}
                        msg={props.msg.message}
                        emotes={props.msg.emotes}
                    />
                </span>
            </p>
        </div>
    );
}
