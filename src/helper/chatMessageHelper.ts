import { ChatMessage } from "../contract/chatMessage";
import { ChatItem } from "youtube-chat/dist/types/data";

export const chatMessageFromTwitchTags = (channel: string, tags: any, message: any, self: any) => {
    // console.log(message, tags);
    const newMessage: ChatMessage = {
        id: tags.id,
        userId: tags['user-id'],
        username: tags['display-name'] ?? tags.username,
        colour: tags.color,
        mod: tags.mod,
        subscriber: tags.subscriber,
        emotes: tags.emotes,
        badgeInfo: tags['badge-info'],
        badges: tags.badges,
        message,
        date: new Date(),
    };

    return newMessage;
}

/*

reply-parent-display-name: "Jaspelino"
reply-parent-msg-body: "@rickjaahh haha ook, maar het werd ook gewoon ineens 8 uur in de ochtend als ik met die game bezig was"
reply-parent-msg-id: "17fd35c2-7bdc-4c65-a98f-cfcdd70acffa"
reply-parent-user-id: "43803087"
reply-parent-user-login: "jaspelino"

tmi-sent-ts: "1647649836976"
 */

export const chatMessageFromYoutube = (chatItem: ChatItem) => {
    // console.log(message, tags);
    const newMessage: ChatMessage = {
        id: chatItem.timestamp.toString(),
        userId: chatItem.author.channelId,
        username: chatItem.author.name,
        profilePic: chatItem.author.thumbnail?.url,
        mod: chatItem.isModerator,
        subscriber: chatItem.isMembership,
        emotes: [],
        message: chatItem.message.join(', '),
        date: chatItem.timestamp,
    };

    return newMessage;
}