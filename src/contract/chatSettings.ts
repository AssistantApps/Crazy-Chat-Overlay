import { MessageTileType } from "../constant/messageTileType";

export interface ChatSetting {
    twitchChannel: string;
    messageTileType: MessageTileType;
    additional: Record<string, string>
}


export const ChatSettingAdditionalKey = {
    animation: 'animation'
}