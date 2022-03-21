import React, { ReactNode } from 'react';

interface IProps {
    msg: string;
    emotes: any;
}

interface IEmoteIndex {
    start: number;
    end: number;
}

interface IEmoteArr {
    indexes: IEmoteIndex,
    imgUrl: string;
    icon: string;
}

export const MessageWithEmojis: React.FC<IProps> = (props: IProps) => {
    const emoteArr: Array<IEmoteArr> = [];
    for (const [key, valueArr] of Object.entries(props.emotes ?? {})) {
        for (const value of (valueArr as any)) {
            const indexStrArr = ((value as any) ?? '').split('-');
            if (indexStrArr.length != 2) continue;

            const indxObj: IEmoteIndex = {
                start: parseInt(indexStrArr[0]),
                end: parseInt(indexStrArr[1]),
            }
            emoteArr.push({
                indexes: indxObj,
                imgUrl: `https://static-cdn.jtvnw.net/emoticons/v2/${key}/default/dark/1.0`,
                icon: key,
            });
        }
    }

    if (emoteArr.length < 1) {
        return (<>{props.msg}</>);
    }

    emoteArr.sort((a: IEmoteArr, b: IEmoteArr) => {
        return (a.indexes.start > b.indexes.start) ? 1 : -1;
    });

    let currentPosition = 0;
    const mesgArray: Array<ReactNode> = [];
    for (const emObj of emoteArr) {
        let startIndx = emObj.indexes.start;
        let endIndx = emObj.indexes.end;
        const baseKey = mesgArray.length.toString() + startIndx.toString() + startIndx.toString();

        if (emObj.indexes.start != 0) {
            mesgArray.push(
                <span key={baseKey + 'message'}>
                    {props.msg.substring(currentPosition, startIndx)}
                </span>
            );
        }

        mesgArray.push(
            <img
                key={baseKey + 'image'}
                style={{ display: 'inline' }}
                src={emObj.imgUrl}
                alt={props.msg.substring(startIndx, endIndx)}
            />
        );
        currentPosition = emObj.indexes.end + 1;
    }

    if (currentPosition >= (props.msg.length - 1)) {
        const baseKey = mesgArray.length.toString() + 'final message';
        mesgArray.push(
            <span key={baseKey}>
                {props.msg.substring(currentPosition)}
            </span>
        );
    }

    return (
        <>{mesgArray}</>
    );
}


//