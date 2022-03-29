import React, { useEffect, useState } from 'react';
import { ChatListView } from '../component/chat/listView';
import { NetworkState } from '../constant/networkState';
import { ChatMessage } from '../contract/chatMessage';
import { ChatSetting } from '../contract/chatSettings';
import { IEmoteLookup } from '../contract/emoteLookup';
import { chatMessageFromTwitchTags } from '../helper/chatMessageHelper';
import { getTwitchClient } from '../helper/twitchHelper';
import { IDependencyInjection, withServices } from '../integration/dependencyInjection';
import { queryParamsToSettings } from '../mapper/chatSettingHelper';
import { TwitchDataService } from '../services/twitchLookupService';


const maxNumMessages = 25;

interface IWithDepInj {
    twitchDataService: TwitchDataService;
}
interface IWithoutDepInj {
}
interface IProps extends IWithDepInj, IWithoutDepInj { }

export const DisplayPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<NetworkState>(NetworkState.Loading);
    const [lookupState, setLookupState] = useState<NetworkState>(NetworkState.Success);
    const [emoteLookup, setEmoteLookup] = useState<Array<IEmoteLookup>>([]);
    const [badgeLookup, setBadgeLookup] = useState<any>();
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);
    const [settings] = useState<ChatSetting>(
        queryParamsToSettings(window.location?.hash)
    );

    useEffect(() => {
        document.getElementById('header')?.remove?.();

        let twitchClientDisconnect = () => { };
        let youtubeClientDisconnect = () => { };

        const hasTwitch = settings.twitchChannel != null && settings.twitchChannel.length > 2;
        // const hasYoutube = settings.youtubeChannel != null && settings.youtubeChannel.length > 2;

        if (hasTwitch) {
            loadLookups(settings.twitchChannel);
            const twitchClient = getTwitchClient(settings.twitchChannel,
                () => setState(NetworkState.Success),
                () => setState(NetworkState.Error),
                (channel: any, tags: any, message: any, self: any) => {
                    const newMessage = chatMessageFromTwitchTags(channel, tags, message, self);
                    addToMessageArray(newMessage);
                }
            );

            twitchClientDisconnect = () => twitchClient.disconnect();
        }

        // if (hasYoutube) {
        //     const youtubeClient = getYoutubeClient(settings.youtubeChannel,
        //         () => setState(NetworkState.Success),
        //         () => setState(NetworkState.Error),
        //         (chatItem: any) => {
        //             const newMessage = chatMessageFromYoutube(chatItem);
        //             addToMessageArray(newMessage);
        //         }
        //     );

        //     youtubeClient.start().then(resp => {
        //         setState(NetworkState.Success);
        //     }).catch((e: any) => {
        //         console.error(e);
        //         setState(NetworkState.Error);
        //     });

        //     youtubeClientDisconnect = () => youtubeClient.stop();
        // }

        return () => {
            twitchClientDisconnect();
            youtubeClientDisconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadLookups = async (channelName: string) => {
        try {
            const lookups = await props.twitchDataService.load(channelName);
            setBadgeLookup(lookups.badgeLookup);
            setEmoteLookup(lookups.emojiLookup);
        }
        catch (e: any) { }

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
                betterEmotes={emoteLookup}
                settings={settings}
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