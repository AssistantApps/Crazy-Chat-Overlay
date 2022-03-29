import { Client } from 'tmi.js';

export const getTwitchClient = (
    channelName: string,
    onSuccess: () => void,
    onError: () => void,
    onMessage: (channel: any, tags: any, message: any, self: any) => void,
): Client => {

    const client: Client = new Client({
        options: { debug: true, messagesLogLevel: "info" },
        connection: {
            reconnect: true,
            secure: true
        },
        channels: [channelName]
    });

    client.connect().then(() => {
        onSuccess();
    }).catch((e: any) => {
        console.error(e);
        onError();
    });

    client.on('message', (channel: any, tags: any, message: any, self: any) => {
        onMessage(channel, tags, message, self);
    });

    return client;
}