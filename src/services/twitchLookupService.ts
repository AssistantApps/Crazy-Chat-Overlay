import { ApiUrl } from "../constant/apiUrl";
import { IEmoteLookup } from "../contract/emoteLookup";
import { anyObject } from "../helper/typescriptHacks";

export class TwitchDataService {

    private _badgeLookup: any;
    private _badgeForChannelLookup: any;
    private _emoteBbtvLookup: Array<any>;

    constructor() {
        this._badgeLookup = anyObject;
        this._badgeForChannelLookup = anyObject;
        this._emoteBbtvLookup = [];
    }

    async load(channelName: string) {
        const channelTask = fetch(ApiUrl.AssistantAppGetTwitchData(channelName));

        const channelResponse = await channelTask;
        const channel = await channelResponse.json();
        const uid = channel.id;

        const badgeLookupTask = fetch(ApiUrl.GlobalBadges);
        const badgeForChannelLookupTask = fetch(ApiUrl.ChannelBadges(uid));
        const emoteBbtvLookupTask = fetch(ApiUrl.BetterTtvBadges(uid));

        await Promise.all([
            async () => {
                const badgeLookupResponse = await badgeLookupTask;
                const badgeLookupResp = await badgeLookupResponse.json();
                this._badgeLookup = badgeLookupResp['badge_sets'];
            },
            async () => {
                const badgeForChannelLookupResponse = await badgeForChannelLookupTask;
                const badgeForChannelLookupResp = await badgeForChannelLookupResponse.json();
                this._badgeForChannelLookup = badgeForChannelLookupResp['badge_sets'];
            },
            async () => {
                const emoteBbtvLookupResponse = await emoteBbtvLookupTask;
                const emoteBbtvLookupResp = await emoteBbtvLookupResponse.json();
                this._emoteBbtvLookup = [
                    ...this.mapEmotes(emoteBbtvLookupResp.channelEmotes, ApiUrl.BetterTtvEmoteUrlTemplate),
                    ...this.mapEmotes(emoteBbtvLookupResp.sharedEmotes, ApiUrl.BetterTtvEmoteUrlTemplate),
                ];
            }
        ]);

        return this.getLookup();
    }

    async getLookup() {
        return {
            badgeLookup: {
                ...this._badgeLookup,
                ...this._badgeForChannelLookup
            },
            emojiLookup: [
                ...this._emoteBbtvLookup,
            ]
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
