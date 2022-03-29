import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../contract/chatMessage';
import { ChatSetting } from '../../contract/chatSettings';
import { IEmoteLookup } from '../../contract/emoteLookup';
import { getAnimationValue, hasAnimationDropdown } from '../../helper/chatMessageSettingHelper';
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


    const getMessageClasses = (settings: ChatSetting): Array<string> => {
        const result: Array<any> = [];

        if (hasAnimationDropdown(settings.messageTileType)) {
            result.push('animation-name-' + getAnimationValue(settings));
        }

        return result;
    }

    return (
        <div className={classNames('message-list', getMessageClasses(props.settings))}>
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
