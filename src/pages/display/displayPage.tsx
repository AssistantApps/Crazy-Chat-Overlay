import React, { useEffect, useState } from 'react';
import { ChatListView } from '../../component/chat/listView';
import { NetworkState } from '../../constant/networkState';
import { ChatMessage } from '../../contract/chatMessage';
import { ChatSetting } from '../../contract/chatSettings';
import { chatMessageFromTags } from '../../helper/chatMessageHelper';
import { queryParamsToSettings } from '../../mapper/chatSettingHelper';

const tmi = require('tmi.js');

const maxNumMessages = 10;

export const DisplayPage: React.FC = () => {
    const [state, setState] = useState<NetworkState>(NetworkState.Loading);
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);
    const [settings] = useState<ChatSetting>(
        queryParamsToSettings(window.location.search)
    );

    useEffect(() => {
        document.getElementById('header')?.remove?.();
        const client = new tmi.Client({
            options: { debug: true, messagesLogLevel: "info" },
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [settings.twitchChannel]
        });

        client.connect().then(() => {
            setState(NetworkState.Success)
        }).catch((e: any) => {
            console.error(e);
            setState(NetworkState.Success)
        });

        client.on('message', (channel: any, tags: any, message: any, self: any) => {
            const newMessage = chatMessageFromTags(tags, message);
            addToMessageArray(newMessage);
        });

        return () => {
            client.disconnect('bye bye');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToMessageArray = (newMessage: ChatMessage) => {
        setMessages(msgs => {
            const oldMsgs = msgs.slice(0, maxNumMessages - 1)
            return [...oldMsgs, newMessage];
        });
    }

    return (
        <div className="message-list">
            {
                (state === NetworkState.Loading) &&
                <p>Connecting...</p>
            }
            <ChatListView
                messageList={messages}
                messageTileType={settings.messageTileType}
            />
        </div>
    );
}
