import { ChatSetting } from "../../../contract/chatSettings";
import { getAnimationValue, hasAnimationDropdown } from "../../../helper/chatMessageSettingHelper";
import { anyObject } from "../../../helper/typescriptHacks";

export const getMessageStyle = (settings: ChatSetting): any => {
    let result = anyObject;

    if (hasAnimationDropdown(settings.messageTileType)) {
        result = { ...result, animationName: getAnimationValue(settings), };
    }
    console.log(hasAnimationDropdown(settings.messageTileType));

    return result;
}