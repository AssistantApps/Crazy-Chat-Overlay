import { Box, Center, Container, Flex, Square, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatListView } from '../component/chat/listView';
import { SettingsPanel } from '../component/settingsPanel';
import { MessageTileType } from '../constant/messageTileType';
import { ChatMessage } from '../contract/chatMessage';

const Jabber = require('jabber');

export const SettingPage: React.FC = () => {
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);

    const colours = [
        undefined,
        undefined,
        undefined,
        undefined,
        '#ff0000',
        '#00ff00',
        'purple',
    ];

    useEffect(() => {
        addMessage();
        const intervalId = setInterval(addMessage, 2500);

        return () => {
            clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addMessage = () => {
        const jabber = new Jabber();

        const msgMessage = jabber.createParagraph(Math.floor(Math.random() * 20));
        const newMessage: ChatMessage = {
            id: msgMessage,
            userId: jabber.createParagraph(30),
            username: jabber.createWord(Math.floor(Math.random() * 10) + 3),
            colour: colours[Math.floor(Math.random() * colours.length)],
            message: msgMessage,
            mod: (Math.floor(Math.random() * colours.length) > 9),
            subscriber: (Math.floor(Math.random() * colours.length) > 6),
            emotes: [],
        };
        setMessages(msgs => [...msgs, newMessage])
    }

    return (
        <Flex style={{ height: '100vh' }}>
            <Box flexGrow={3}>
                <Container pt={2}>
                    <SettingsPanel />
                </Container>
            </Box>
            <Box flexGrow={1} style={{ maxHeight: '100vh', maxWidth: '400px' }}>
                <ChatListView
                    messageList={messages}
                    messageTileType={MessageTileType.Default}
                />
            </Box>
        </Flex>
    );
}
