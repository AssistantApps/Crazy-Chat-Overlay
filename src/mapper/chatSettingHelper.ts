import { MessageTileType } from "../constant/messageTileType";
import { Routes } from "../constant/routes";
import { ChatSetting } from "../contract/chatSettings";
import { anyObject } from "../helper/typescriptHacks";

export const settingsToQueryParams = (setting: ChatSetting): string => {
    const params: Array<string> = []

    if (setting.twitchChannel.length > 0) {
        params.push('twitchChannel=' + setting.twitchChannel);
    }

    if (setting.messageTileType !== 0) {
        params.push('messageTileType=' + MessageTileType[setting.messageTileType].toString());
    }

    return (params.length > 0 ? '?' : '') + params.join('&');
}

export const queryParamsToSettings = (paramString: string): ChatSetting => {
    const params: Array<string> = paramString
        .replaceAll(`#${Routes.display}`, '')
        .replaceAll('?', '')
        .split('&');

    const setting = anyObject;
    for (const param of params) {
        const parts = param.split('=');
        const paramKey = parts[0];
        const paramValue: any = parts[1];
        if (paramKey === 'messageTileType') {
            setting[paramKey] = MessageTileType[paramValue];
            continue;
        }
        setting[paramKey] = paramValue;
    }

    return setting;
}