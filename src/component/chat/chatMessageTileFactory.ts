import React from "react";
import { MessageTileType } from "../../constant/messageTileType";
import { IChatMessageTilePresenterProps } from "./tile/chatMessageProps";
import { ChatMessageTile } from "./tile/chatMessageTile";

export const chatMessageTileFactory = (messageTileType: MessageTileType): React.FC<IChatMessageTilePresenterProps> => {
    switch (messageTileType) {
        default:
            return (ChatMessageTile);
    }
}