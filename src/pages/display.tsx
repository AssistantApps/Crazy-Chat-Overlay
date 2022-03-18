import React, { useEffect, useState } from 'react';
import { ChatListView } from '../component/chat/listView';
import { MessageTileType } from '../constant/messageTileType';
import { ChatMessage } from '../contract/chatMessage';
import { chatMessageFromTags } from '../helper/chatMessageHelper';
const tmi = require('tmi.js');

const maxNumMessages = 50;

export const DisplayPage: React.FC = () => {
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);

    useEffect(() => {
        const client = new tmi.Client({
            options: { debug: true, messagesLogLevel: "info" },
            connection: {
                reconnect: true,
                secure: true
            },
            channels: ['zilioner']
        });

        client.connect().catch(console.error);

        client.on('message', (channel: any, tags: any, message: any, self: any) => {
            const newMessage = chatMessageFromTags(tags, message);
            addToMessageArray(newMessage);
        });

        return () => {
            client.disconnect('Goodbye.');
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
            <ChatListView
                messageList={messages}
                messageTileType={MessageTileType.Default}
            />
        </div>
    );
}
