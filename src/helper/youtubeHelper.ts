import { LiveChat } from "youtube-chat";
import { ChatItem } from "youtube-chat/dist/types/data";

export const getYoutubeClient = (
    channelName: string,
    onSuccess: () => void,
    onError: () => void,
    onMessage: (chatItem: ChatItem) => void,
): LiveChat => {

    const client = new LiveChat({ channelId: channelName })

    client.on("start", (liveId: any) => {
        onSuccess();
    });

    // Emit at end of observation chat.
    client.on("end", (reason) => {
        onError();
    });

    // Emit at receive chat.
    // chat: ChatItem
    client.on("chat", (chatItem: ChatItem) => {
        onMessage(chatItem);
    });

    // Emit when an error occurs
    // err: Error or any
    client.on("error", (err: any) => {
        onError();
    });

    return client;
}