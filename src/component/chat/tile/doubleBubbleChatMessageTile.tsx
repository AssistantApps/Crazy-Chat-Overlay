import React from 'react';
import { IChatMessageTilePresenterProps } from './chatMessageProps';
import { MessageWithEmojis } from '../base/messageWithEmojis';
import { UsernameWithBadges } from '../base/usernameWithBadges';


export const DoubleBubbleChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} className="message-wrapper">
            <p className="message double-bubble">
                <div className="user">
                    <UsernameWithBadges
                        {...props.msg}
                        badgeLookup={props.badgeLookup}
                    />
                    <span>:&nbsp;</span>
                </div>
                <div className="message-wrapper">
                    <div className="message">
                        <MessageWithEmojis
                            key={props.msg.message}
                            msg={props.msg.message}
                            emotes={props.msg.emotes}
                            betterEmotes={props.betterEmotes}
                        />
                    </div>
                </div>
            </p>
        </div>
    );
}
