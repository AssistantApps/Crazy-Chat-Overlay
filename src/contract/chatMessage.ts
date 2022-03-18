export interface ChatMessage {
    id: string;
    userId: string;
    username: string;
    colour?: string;
    message: string;
    emotes: Array<string>;
    mod: boolean;
    subscriber: boolean;
}