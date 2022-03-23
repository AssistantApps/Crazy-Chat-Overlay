import React, { useEffect, useRef } from 'react';
import { MessageTileType } from '../../constant/messageTileType';
import { ChatMessage } from '../../contract/chatMessage';
import { IEmoteLookup } from '../../contract/emoteLookup';
import { chatMessageTileFactory } from './chatMessageTileFactory';
import { IChatMessageTilePresenterProps } from './tile/chatMessageProps';

interface IProps {
    badgeLookup: any;
    messageList: Array<ChatMessage>;
    messageTileType: MessageTileType;
    betterEmotes: Array<IEmoteLookup>;
}


export const ChatListView: React.FC<IProps> = (props: IProps) => {
    const messagesEnd: any = useRef(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.messageList]);

    const ChatMessageTilePresenter: React.FC<IChatMessageTilePresenterProps> = chatMessageTileFactory(props.messageTileType);

    return (
        <div className="message-list">
            {
                props.messageList.map((chatM, i) => (
                    <ChatMessageTilePresenter
                        badgeLookup={props.badgeLookup}
                        betterEmotes={props.betterEmotes}
                        key={chatM.id}
                        msg={chatM}
                    />
                ))
            }
            <br />
            <div ref={messagesEnd}></div>
        </div>
    );
}
