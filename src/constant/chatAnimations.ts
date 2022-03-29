import { IDropDownOptionProps } from "../contract/props/IDropDownOptionProps";

export const defaultChatAnimation: IDropDownOptionProps = {
    name: 'Slide in from left',
    value: 'message-slide-from-left',
};

export const chatAnimationOptions: Array<IDropDownOptionProps> = [
    defaultChatAnimation,
    {
        name: 'Slide in from right',
        value: 'message-slide-from-right',
    },
    {
        name: 'Fade in',
        value: 'message-fade-in',
    },
    {
        name: 'None',
        value: 'none',
    },
];