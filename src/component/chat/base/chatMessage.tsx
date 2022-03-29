import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { MessageTileType } from '../../../constant/messageTileType';
import { ChatSetting } from '../../../contract/chatSettings';

interface IProps {
    children: ReactNode;
    settings: ChatSetting;
}

export const ChatMessage: React.FC<IProps> = (props: IProps) => {
    const messageTileType = MessageTileType[props.settings.messageTileType];
    return (
        <div
            className={classNames('message', messageTileType)}
        >
            {props.children}
        </div>
    );
}
