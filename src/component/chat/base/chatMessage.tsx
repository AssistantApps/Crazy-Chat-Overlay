import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { MessageTileType } from '../../../constant/messageTileType';
import { ChatSetting } from '../../../contract/chatSettings';
import { getMessageStyle } from '../tile/commonChatTile';

interface IProps {
    children: ReactNode;
    settings: ChatSetting;
}

export const ChatMessage: React.FC<IProps> = (props: IProps) => {
    const messageTileType = MessageTileType[props.settings.messageTileType];
    return (
        <div
            className={classNames('message', messageTileType)}
            style={getMessageStyle(props.settings)}
        >
            {props.children}
        </div>
    );
}
