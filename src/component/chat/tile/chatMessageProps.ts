import { ChatMessage } from "../../../contract/chatMessage";
import { ChatSetting } from "../../../contract/chatSettings";
import { IEmoteLookup } from "../../../contract/emoteLookup";

export interface IChatMessageTilePresenterProps {
    badgeLookup: any;
    msg: ChatMessage;
    betterEmotes: Array<IEmoteLookup>;
    settings: ChatSetting;
}