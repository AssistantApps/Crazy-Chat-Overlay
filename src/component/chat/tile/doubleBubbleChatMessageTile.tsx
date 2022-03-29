import React from 'react';
import { IChatMessageTilePresenterProps } from './chatMessageProps';
import { MessageWithEmojis } from '../base/messageWithEmojis';
import { UsernameWithBadges } from '../base/usernameWithBadges';
import { ChatMessage } from '../base/chatMessage';


export const DoubleBubbleChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} data-id="DoubleBubbleChatMessageTile" className="message-wrapper">
            <ChatMessage settings={props.settings}>
                <div className="user-wrapper">
                    <div className="user">
                        <UsernameWithBadges
                            {...props.msg}
                            badgeLookup={props.badgeLookup}
                        />
                        <span>:&nbsp;</span>
                    </div>
                </div>
                <div className="message-content">
                    <MessageWithEmojis
                        key={props.msg.message}
                        msg={props.msg.message}
                        emotes={props.msg.emotes}
                        betterEmotes={props.betterEmotes}
                    />
                </div>
            </ChatMessage>
        </div>
    );
}
