import { MessageTileType } from "../constant/messageTileType";

export interface ChatSetting {
    twitchChannel: string;
    youtubeChannel: string;
    messageTileType: MessageTileType;
    additional: Record<string, string>
}