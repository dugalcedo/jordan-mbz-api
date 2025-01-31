
export type MbzArtistResultDTO = {
    id: string
    name: string
    location: string
    disambiguation: string
    begin: string
    end: string
    tags: string
}

export type MbzReleaseGroupResultDTO = {
    id: string
    title: string
    artist: string
    releaseDate: string
}

export const mbzCreateArtistsResultDTO = (data: Record<string, any>): MbzArtistResultDTO => {
    if (!data.id) throw new Error(`Data has no id.`);
    const id = data.id;
    const name = data.name || "Unknown name";
    const location = data.area?.name || data["begin-area"]?.name || "Unknown location";
    const disambiguation = data.disambiguation || "No description";
    const begin = data['life-span']?.begin || "?";
    const end = data['life-span']?.end || "?";
    const tags = (data.tags || []).slice(0, 4).map((t: any) => t?.name || "").join(', ') || "No tags";
    return { id, name, location, disambiguation, begin, end, tags }
}

export const mbzCreateReleaseGroupResultDTO = (data: Record<string, any>): MbzReleaseGroupResultDTO => {
    if (!data.id) throw new Error(`Data has no id.`);
    const id = data.id;
    const title = data.title || "Unknown title";
    const artist = (data["artist-credit"] || []).map((a: any) => a?.name || "").join(", ") || "Unknown artist(s)";
    const releaseDate = data["first-release-date"] || "Unknown release date";
    return { id, title, artist, releaseDate }
}

