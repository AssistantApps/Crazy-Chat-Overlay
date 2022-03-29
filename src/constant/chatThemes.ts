import { MessageTileType } from "./messageTileType";

interface IThemeOptions {
    type: MessageTileType;
    name: string;
    isPremium: boolean;
    defaultAnimation?: string;
}

export const defaultTheme: IThemeOptions = {
    type: MessageTileType.Default,
    name: 'Default',
    isPremium: false,
};

export const chatThemeOptions: Array<IThemeOptions> = [
    defaultTheme,
    {
        type: MessageTileType.Minimalist,
        name: 'Minimalist',
        isPremium: false,
    },
    {
        type: MessageTileType.Tldr,
        name: 'TLDR',
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
    }
];
