import React, { useEffect, useState } from 'react';
import { ChatListView } from '../../component/chat/listView';
import { NetworkState } from '../../constant/networkState';
import { ChatMessage } from '../../contract/chatMessage';
import { ChatSetting } from '../../contract/chatSettings';
import { chatMessageFromTags } from '../../helper/chatMessageHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { queryParamsToSettings } from '../../mapper/chatSettingHelper';
import { TwitchDataService } from '../../services/twitchLookupService';

const tmi = require('tmi.js');

const maxNumMessages = 25;

interface IWithDepInj {
    twitchDataService: TwitchDataService;
}
interface IWithoutDepInj {
}
interface IProps extends IWithDepInj, IWithoutDepInj { }

export const DisplayPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<NetworkState>(NetworkState.Loading);
    const [lookupState, setLookupState] = useState<NetworkState>(NetworkState.Loading);
    const [badgeLookup, setBadgeLookup] = useState<any>();
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);
    const [settings] = useState<ChatSetting>(
        queryParamsToSettings(window.location.hash)
    );

    useEffect(() => {
        document.getElementById('header')?.remove?.();
        const channelName = settings.twitchChannel ?? 'khaoztopsy';
        loadLookups(channelName);
        const client = new tmi.Client({
            options: { debug: true, messagesLogLevel: "info" },
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [channelName]
        });

        client.connect().then(() => {
            setState(NetworkState.Success)
        }).catch((e: any) => {
            console.error(e);
            setState(NetworkState.Success)
        });

        client.on('message', (channel: any, tags: any, message: any, self: any) => {
            const newMessage = chatMessageFromTags(channel, tags, message, self);
            addToMessageArray(newMessage);
        });

        return () => {
            client.disconnect('bye bye');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadLookups = async (channelName: string) => {
        const lookups = await props.twitchDataService.load(channelName);
        console.log(lookups);

        setBadgeLookup(lookups.badgeLookup);
        setLookupState(NetworkState.Success);
    }

    const addToMessageArray = (newMessage: ChatMessage) => {
        setMessages(msgs => {
            let startIndex = (msgs.length - maxNumMessages) + 1
            if (startIndex < 0) startIndex = 0;

            const oldMsgs = msgs.slice(startIndex, maxNumMessages)
            return [...oldMsgs, newMessage];
        });
    }

    if (state === NetworkState.Loading || lookupState === NetworkState.Loading) {
        return (<p>Connecting...</p>);
    }

    return (
        <div className="message-list">
            <ChatListView
                messageList={messages}
                badgeLookup={badgeLookup}
                messageTileType={settings.messageTileType}
            />
        </div>
    );
}


export const DisplayPage = withServices<IWithoutDepInj, IWithDepInj>(
    DisplayPageUnconnected,
    (services: IDependencyInjection) => ({
        twitchDataService: services.twitchDataService,
    })
);