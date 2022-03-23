import { Routes } from "../constant/routes";
import { ChatSetting } from "../contract/chatSettings";
import { anyObject } from "../helper/typescriptHacks";

const settingsParamKey = 'settings';

export const settingsToQueryParams = (setting: ChatSetting): string => {
    return '?' + settingsParamKey + '=' + btoa(JSON.stringify(setting));
}

export const queryParamsToSettings = (paramString: string): ChatSetting => {
    const params: Array<string> = paramString
        .replaceAll(`#${Routes.display}`, '')
        .replaceAll('?', '')
        .split('&');

    let setting = anyObject;
    for (const param of params) {
        const parts = param.split('=');
        const paramKey = parts[0];
        const paramValue: any = parts[1];
        if (paramKey !== settingsParamKey) continue;
        setting = JSON.parse(atob(paramValue));
    }

    // for (const param of params) {
    //     const parts = param.split('=');
    //     const paramKey = parts[0];
    //     const paramValue: any = parts[1];
    //     if (paramKey === 'messageTileType') {
    //         setting[paramKey] = MessageTileType[paramValue];
    //         continue;
    //     }
    //     setting[paramKey] = paramValue;
    // }

    return setting;
}