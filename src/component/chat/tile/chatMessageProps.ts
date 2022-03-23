import { ChatMessage } from "../../../contract/chatMessage";
import { IEmoteLookup } from "../../../contract/emoteLookup";

export interface IChatMessageTilePresenterProps {
    badgeLookup: any;
    msg: ChatMessage;
    betterEmotes: Array<IEmoteLookup>;
}