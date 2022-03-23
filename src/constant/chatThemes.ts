import { IDropDownOptionProps } from "../contract/props/IDropDownOptionProps";
import { MessageTileType } from "./messageTileType";


export const chatThemeOptions = [
    {
        type: MessageTileType.Default,
        name: 'Default',
        isPremium: false,
    },
    {
        type: MessageTileType.Minimalist,
        name: 'Minimalist',
        isPremium: false,
    },
    {
        type: MessageTileType.ChatApp,
        name: 'Chat app',
        isPremium: false,
    },
    {
        type: MessageTileType.DoubleBubble,
        name: 'Double Bubble',
        isPremium: false,
    },
    {
        type: MessageTileType.Restream,
        name: 'Restream',
        isPremium: true,
    },
    {
        type: MessageTileType.Tldr,
        name: 'TLDR',
        isPremium: false,
    }
];

export const chatAnimationOptions: Array<IDropDownOptionProps> = [
    {
        name: 'Fade in',
        value: 'message-fade-in',
    },
    {
        name: 'Slide in from left',
        value: 'message-slide-from-left',
    },
    {
        name: 'Slide in from right',
        value: 'message-slide-from-right',
    },
    {
        name: 'None',
        value: 'none',
    },
];