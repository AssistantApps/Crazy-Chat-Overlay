import { MessageTileType } from "../constant/messageTileType";
import { anyObject } from "./typescriptHacks";

const displayNone = { display: 'none' }

export const hasAnimationDropdown = (messageTileType: MessageTileType): any => {
    // if ([
    //     MessageTileType.Default
    // ].includes(messageTileType)) return anyObject;

    return displayNone;
}