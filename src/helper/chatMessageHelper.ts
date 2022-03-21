import { ChatMessage } from "../contract/chatMessage";

export const chatMessageFromTags = (tags: any, message: any) => {
    console.log(message, tags.emotes);
    const newMessage: ChatMessage = {
        id: tags.id,
        userId: tags['user-id'],
        username: tags['display-name'] ?? tags.username,
        colour: tags.color,
        mod: tags.mod,
        subscriber: tags.subscriber,
        emotes: tags.emotes,
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