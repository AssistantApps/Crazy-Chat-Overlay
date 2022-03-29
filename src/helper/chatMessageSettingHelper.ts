import { defaultChatAnimation } from "../constant/chatAnimations";
import { chatThemeOptions, defaultTheme } from "../constant/chatThemes";
import { MessageTileType } from "../constant/messageTileType";
import { ChatSetting, ChatSettingAdditionalKey } from "../contract/chatSettings";

export const hasAnimationDropdown = (messageTileType: MessageTileType): any => {
    if ([
        MessageTileType.Default,
        MessageTileType.ChatApp,
        MessageTileType.DoubleBubble,
        MessageTileType.Restream,
    ].includes(messageTileType)) return true;

    return false;
}

export const getAnimationValue = (settings: ChatSetting) => {
    const existingValue = settings.additional[ChatSettingAdditionalKey.animation];
    if (existingValue != null) return existingValue;

    const currentTheme = chatThemeOptions.find(c => c.type === settings.messageTileType) ?? defaultTheme;
    if (currentTheme.defaultAnimation != null) return currentTheme.defaultAnimation;

    return defaultChatAnimation.value;
}