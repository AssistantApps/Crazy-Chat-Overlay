import React, { useEffect, useRef, useState } from 'react';
import { ChatMessageTile } from './component/chatMessageTile';
import { ChatMessage } from './contract/chatMessage';
import './App.css';
const tmi = require('tmi.js');

const maxNumMessages = 50;

export const App: React.FC = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const messagesEnd: any = useRef(null);

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
      // "Alca: Hello, World!"
      // console.log(`${tags['display-name']}: ${message}`);
      // console.log('tags', tags);
      // console.log('message', message);

      const newMessage: ChatMessage = {
        id: tags.id,
        userId: tags['user-id'],
        username: tags['display-name'] ?? tags.username,
        colour: tags.color,
        mod: tags.mod,
        subscriber: tags.subscriber,
        emotes: tags.emotes,
        message,
      };
      addToMessageArray(newMessage);
      messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      client.disconnect('Goodbye.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToMessageArray = (newMessage: ChatMessage) => {
    setMessages(msgs => {
      let startIndex = msgs.length - maxNumMessages;
      if (startIndex < 0) startIndex = 0;

      const oldMsgs = msgs.slice(startIndex, maxNumMessages - 1)
      return [...oldMsgs, newMessage];
    });
  }

  return (
    <div className="message-list">
      {
        messages.map((chatM, i) => (
          <ChatMessageTile
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
