import React from "react";
import { MessageTileType } from "../../constant/messageTileType";
import { ChatAppMessageTile } from "./tile/chatAppMessageTile";
import { IChatMessageTilePresenterProps } from "./tile/chatMessageProps";
import { ChatMessageTile } from "./tile/chatMessageTile";
import { DoubleBubbleChatMessageTile } from "./tile/doubleBubbleChatMessageTile";
import { MinimalistChatMessageTile } from "./tile/minimalistChatMessageTile";
import { RestreamChatMessageTile } from "./tile/restreamChatMessageTile";

export const chatMessageTileFactory = (messageTileType: MessageTileType): React.FC<IChatMessageTilePresenterProps> => {
    switch (messageTileType) {
        case MessageTileType.ChatApp: return (ChatAppMessageTile);
        case MessageTileType.DoubleBubble: return (DoubleBubbleChatMessageTile);
        case MessageTileType.Restream: return (RestreamChatMessageTile);
        case MessageTileType.Minimalist: return (MinimalistChatMessageTile);
        default:
            return (ChatMessageTile);
    }
}