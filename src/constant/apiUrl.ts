export const ApiUrl = {
    AssistantAppGetTwitchData: (channelName: string) => `https://api.assistantapps.com/Twitch/UserData/${channelName}`,

    GlobalBadges: 'https://badges.twitch.tv/v1/badges/global/display',
    ChannelBadges: (uid: string) => `https://badges.twitch.tv/v1/badges/channels/${uid}/display`,
    BetterTtvBadges: (uid: string) => `https://api.betterttv.net/3/cached/users/twitch/${uid}`,

    BetterTtvEmoteUrlTemplate: 'https://cdn.betterttv.net/emote/{0}/1x',
}