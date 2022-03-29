import React from 'react';
import { ChatMessage } from '../base/chatMessage';
import { MessageWithEmojis } from '../base/messageWithEmojis';
import { UsernameWithBadges } from '../base/usernameWithBadges';
import { IChatMessageTilePresenterProps } from './chatMessageProps';


export const MinimalistChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} data-id="MinimalistChatMessageTile" className="message-wrapper">
            <ChatMessage settings={props.settings}>
                <UsernameWithBadges
                    {...props.msg}
                    badgeLookup={props.badgeLookup}
                />
                <span>:&nbsp;</span>
                <MessageWithEmojis
                    key={props.msg.message}
                    msg={props.msg.message}
                    emotes={props.msg.emotes}
                    betterEmotes={props.betterEmotes}
                />
            </ChatMessage>
        </div>
    );
}
