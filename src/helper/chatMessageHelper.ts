import { ChatMessage } from "../contract/chatMessage";

export const chatMessageFromTags = (tags: any, message: any) => {
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

    return newMessage;
}