import React from 'react';
import { TwitchIcon } from '../../../constant/twitchIcon';

interface IProps {
    id: string;
    badges?: any;
    badgeInfo?: any;
    username: string;
    colour?: string;
    mod: boolean;
}

export const UsernameWithBadges: React.FC<IProps> = (props: IProps) => {

    const badges = [];
    if (props.mod == true) {
        badges.push(<img key={props.id + 'mod'} src={TwitchIcon.Mod} alt="moderator" />);
    }
    if (props.badges?.vip != null) {
        badges.push(<img key={props.id + 'vip'} src={TwitchIcon.VIP} alt="vip" />);
    }
    if (props.badges?.premium != null) {
        badges.push(<img key={props.id + 'premium'} src={TwitchIcon.PrimeGaming} alt="premium" />);
    }
    if (props.badges?.HypeTrain != null) {
        badges.push(<img key={props.id + 'HypeTrain'} src={TwitchIcon.HypeTrain} alt="HypeTrain" />);
    }
    if (props.badges?.['sub-gifter'] != null) {
        badges.push(<img key={props.id + 'sub-gifter'} src={TwitchIcon.SubGifter} alt="sub-gifter" />);
    }
    if (props.badges?.glitchcon2020 != null) {
        badges.push(<img key={props.id + 'glitchcon2020'} src={TwitchIcon.GlitchCon2020} alt="glitchcon2020" />);
    }
    // if (props.badgeInfo?.) {
    //     //https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1
    // }
    return (
        <>
            {badges}
            <strong style={{ color: props.colour }}>{props.username}</strong>
        </>
    );
}


//