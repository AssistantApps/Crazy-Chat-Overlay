import React from 'react';
import { formatDate } from '../../../helper/dateHelper';
import { IChatMessageTilePresenterProps } from './chatMessageProps';


export const RestreamChatMessageTile: React.FC<IChatMessageTilePresenterProps> = (props: IChatMessageTilePresenterProps) => {
    return (
        <div key={props.msg.id} className="message-wrapper">
            <div className="restream-tile">
                <div className="avatar">
                    <img src={`https://ui-avatars.com/api/?name=${props.msg.username}`} alt={props.msg.username} />
                </div>
                <div className="content">
                    <div className="msg-info">
                        <div className="name">
                            <span style={{ color: props.msg.colour }}>{props.msg.username}</span>
                        </div>
                        <div className="time">{formatDate(props.msg.date, 'HH:mm')}</div>
                    </div>

                    <p key={props.msg.id} className="">
                        {props.msg.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
