import { Box, Container, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatListView } from '../component/chat/listView';
import { SettingsPanel } from '../component/settingsPanel';
import { MessageTileType } from '../constant/messageTileType';
import { ChatMessage } from '../contract/chatMessage';
import { ChatSetting } from '../contract/chatSettings';
import { anyObject } from '../helper/typescriptHacks';

const Jabber = require('jabber');

const maxNumMessages = 20;

export const SettingPage: React.FC = () => {
    const [jabber] = useState<any>(new Jabber());
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);
    const [settings, setSettings] = useState<ChatSetting>({
        twitchChannel: 'khaoztopsy',
        messageTileType: MessageTileType.Default,
        additional: anyObject,
    });

    const colours = [
        undefined,
        undefined,
        undefined,
        undefined,
        '#ff0000',
        '#00ff00',
        '#000000',
        'purple',
        'orange',
    ];

    useEffect(() => {
        Array(3).fill(0).map((_, indx) => setTimeout(addMessage, indx * 10));
        const intervalId = setInterval(addMessage, 2500);

        return () => {
            clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setChatSetting = (newSetting: ChatSetting) => {
        setSettings(setting => {
            if (setting.messageTileType !== newSetting.messageTileType) {
                setMessages([]);
                Array(3).fill(0).map((_, indx) => setTimeout(addMessage, indx * 10));
            }

            return newSetting;
        });
    }

    const addMessage = () => {
        const newMessage = generateMessage();

        setMessages(msgs => {
            let startIndex = (msgs.length - maxNumMessages) + 1
            if (startIndex < 0) startIndex = 0;

            const oldMsgs = msgs.slice(startIndex, maxNumMessages)
            return [...oldMsgs, newMessage];
        });
    }

    const generateMessage = (): ChatMessage => {
        const msgMessage = jabber.createParagraph(Math.floor(Math.random() * 20) + 3);
        const newMessage: ChatMessage = {
            id: msgMessage,
            userId: 'khaoztopsy',
            username: jabber.createWord(Math.floor(Math.random() * 10) + 3),
            colour: colours[Math.floor(Math.random() * colours.length)],
            message: msgMessage,
            mod: (Math.floor(Math.random() * colours.length) > 9),
            subscriber: (Math.floor(Math.random() * colours.length) > 6),
            emotes: [],
            date: new Date(),
        };
        return newMessage;
    }

    return (
        <Flex className="full-height-without-nav">
            <Box flexGrow={3}>
                <Container pt={3}>
                    <SettingsPanel
                        settings={settings}
                        setSettings={setChatSetting}
                    />
                </Container>
            </Box>
            <Box flexGrow={1} style={{ height: '100%', maxWidth: '400px' }}>
                <ChatListView
                    badgeLookup={anyObject}
                    messageList={messages}
                    messageTileType={settings.messageTileType}
                />
            </Box>
        </Flex>
    );
}
