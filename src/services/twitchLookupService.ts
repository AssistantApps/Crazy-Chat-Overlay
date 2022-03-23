import { IEmoteLookup } from "../contract/emoteLookup";
import { anyObject } from "../helper/typescriptHacks";

export class TwitchDataService {

    private _badgeLookup: any;
    private _badgeForChannelLookup: any;
    private _emoteBbtvLookup: Array<any>;

    constructor() {
        this._badgeLookup = anyObject;
        this._badgeForChannelLookup = anyObject;
        this._emoteBbtvLookup = anyObject;
    }

    async load(channelName: string) {
        const channelResponse = await fetch(`https://dadoschyt.de/api/tmt/user/${channelName}`);
        const channel = await channelResponse.json();
        const uid = channel.data[0].id;

        const badgeLookupResponse = await fetch('https://badges.twitch.tv/v1/badges/global/display');
        const badgeLookupResp = await badgeLookupResponse.json();
        this._badgeLookup = badgeLookupResp['badge_sets'];

        const badgeForChannelLookupResponse = await fetch(`https://badges.twitch.tv/v1/badges/channels/${uid}/display`);
        const badgeForChannelLookupResp = await badgeForChannelLookupResponse.json();
        this._badgeForChannelLookup = badgeForChannelLookupResp['badge_sets'];

        const emoteBbtvLookupResponse = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${uid}`);
        const emoteBbtvLookupResp = await emoteBbtvLookupResponse.json();
        console.log({ emoteBbtvLookupResp });
        this._emoteBbtvLookup = [
            ...this.mapEmotes(emoteBbtvLookupResp.channelEmotes, 'https://cdn.betterttv.net/emote/{0}/3x'),
            ...this.mapEmotes(emoteBbtvLookupResp.sharedEmotes, 'https://cdn.betterttv.net/emote/{0}/3x'),
        ];

        return this.getLookup();
    }

    async getLookup() {
        return {
            badgeLookup: {
                ...this._badgeLookup,
                ...this._badgeForChannelLookup
            },
            emojiLookup: {
                ...this._emoteBbtvLookup,
            }
        };
    }

    mapEmotes = (emoteList: Array<any>, urlTemplate: string): Array<IEmoteLookup> => {
        return emoteList.map((em: any) => {
            return {
                text: em.code,
                url: urlTemplate.replaceAll('{0}', em.id),
            }
        }).filter(el => el != null && el.text != null);
    }
}
