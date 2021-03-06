import React from 'react';
import { IChatMessageTilePresenterProps } from './chatMessageProps';
import { MessageWithEmojis } from '../base/messageWithEmojis';
import { UsernameWithBadges } from '../base/usernameWithBadges';
import { ChatMessage } from '../base/chatMessage';


export const ChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} data-id="ChatMessageTile" className="message-wrapper">
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
