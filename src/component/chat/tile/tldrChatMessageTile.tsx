import React from 'react';
import { MessageWithEmojis } from '../base/messageWithEmojis';
import { UsernameWithBadges } from '../base/usernameWithBadges';
import { IChatMessageTilePresenterProps } from './chatMessageProps';


export const TldrChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} className="message-wrapper">
            <p className="message tldr">
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
            </p>
        </div>
    );
}
