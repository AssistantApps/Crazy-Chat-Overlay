import React from 'react';
import { anyObject } from '../../../helper/typescriptHacks';

interface IProps {
    id: string;
    badges?: any;
    badgeInfo?: any;
    username: string;
    colour?: string;
    badgeLookup: any;
}

export const UsernameWithBadges: React.FC<IProps> = (props: IProps) => {

    const badges = [];
    for (const [badgeKey, versionNum] of Object.entries(props.badges ?? anyObject)) {
        try {
            const badgeObj = props.badgeLookup[badgeKey]['versions'][versionNum as any];
            badges.push(
                <img key={props.id + badgeKey} src={badgeObj['image_url_1x']} alt={badgeObj.title} />
            );
        }
        catch
        {
            continue;
        }
    }

    return (
        <>
            {badges}
            <strong style={{ color: props.colour }}>{props.username}</strong>
        </>
    );
}


//