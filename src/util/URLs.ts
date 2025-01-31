export type MbzApiUrl = `https://musicbrainz.org/ws/2${string}&fmt=json`;
export type MbzReleaseGroupType = 'album' | 'ep' | 'single';

export const mbzApiRoot = "https://musicbrainz.org/ws/2";

export const mbzParams = (params: Record<string, string>): `?${string}&fmt=json` => {
    const paramsStr = Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&");
    return `?${paramsStr}&fmt=json`;
}

export const mbzApiUrl = (path: string, params: Record<string, string>): MbzApiUrl => {
    if (!path.startsWith('/')) path = "/" + path;
    return encodeURI(`${mbzApiRoot}${path}${mbzParams(params)}`) as MbzApiUrl
}

export const mbzSearchArtistUrl = (query: string): MbzApiUrl => {
    return mbzApiUrl("/artist", {query})
}

export const mbzSearchReleaseGroupUrl = (query: string): MbzApiUrl => {
    return mbzApiUrl("/release-group", {query})
}

export const mbzBrowseReleaseGroupsByArtistUrl = (artistId: string, offset: number = 0, types?: MbzReleaseGroupType[]): MbzApiUrl => {
    const params: Record<string, string> = { artist: artistId, offset: offset.toString() };
    if (types) params.type = types.join("|");
    return mbzApiUrl("/release-group", params)
}

export const mbzBrowseReleasesByReleaseGroupUrl = (releaseGroupId: string, offset: number = 0): MbzApiUrl => {
    return mbzApiUrl("/release", {"release-group": releaseGroupId, offset: offset.toString() })
}

export const mbzLookupReleaseUrl = (releaseId: string): MbzApiUrl => {
    return mbzApiUrl(`/release/${releaseId}`, { inc: "media" })
}