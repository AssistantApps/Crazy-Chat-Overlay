import React from 'react';
import { formatDate } from '../../../helper/dateHelper';
import { LazyLoadImage } from '../../lazyLoadImage/lazyLoadImage';
import { ChatMessage } from '../base/chatMessage';
import { MessageWithEmojis } from '../base/messageWithEmojis';
import { UsernameWithBadges } from '../base/usernameWithBadges';
import { IChatMessageTilePresenterProps } from './chatMessageProps';


export const RestreamChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} data-id="RestreamChatMessageTile" className="message-wrapper">
            <ChatMessage settings={props.settings}>
                <div className="avatar">
                    <LazyLoadImage
                        src={`https://api.assistantapps.com/Twitch/UserImage/${props.msg.userId}`}
                        notFoundImageSrc={`https://ui-avatars.com/api/?name=${props.msg.username}`}
                        alt={props.msg.username}
                    />
                </div>
                <div className="content">
                    <div className="msg-info">
                        <div className="name">
                            <UsernameWithBadges
                                {...props.msg}
                                badgeLookup={props.badgeLookup}
                            />
                        </div>
                        <div className="time">{formatDate(props.msg.date, 'HH:mm')}</div>
                    </div>
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
