import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../contract/chatMessage';
import { ChatSetting } from '../../contract/chatSettings';
import { IEmoteLookup } from '../../contract/emoteLookup';
import { chatMessageTileFactory } from './chatMessageTileFactory';
import { IChatMessageTilePresenterProps } from './tile/chatMessageProps';

interface IProps {
    badgeLookup: any;
    messageList: Array<ChatMessage>;
    betterEmotes: Array<IEmoteLookup>;
    settings: ChatSetting;
}


export const ChatListView: React.FC<IProps> = (props: IProps) => {
    const messagesEnd: any = useRef(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.messageList]);

    const ChatMessageTilePresenter: React.FC<IChatMessageTilePresenterProps> = chatMessageTileFactory(props.settings.messageTileType);

    return (
        <div className="message-list">
            {
                props.messageList.map((chatM, i) => (
                    <ChatMessageTilePresenter
                        badgeLookup={props.badgeLookup}
                        betterEmotes={props.betterEmotes}
                        settings={props.settings}
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
