export interface ChatMessage {
    id: string;
    userId: string;
    username: string;
    colour?: string;
    message: string;
    emotes: Array<string>;
    badgeInfo?: any;
    badges?: any;
    mod: boolean;
    subscriber: boolean;
    date: Date;
}