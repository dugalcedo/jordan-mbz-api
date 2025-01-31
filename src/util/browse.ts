export type MbzReleaseResultDTO = {
    id: string
    title: string
    releaseDate: string
    hasArtwork: boolean
}

export const mbzCreateReleaseResultDTO = (data: any): MbzReleaseResultDTO => {
    if (!data.id) {
        throw new Error("Data is missing an id")
    }
    const id = data.id
    const title = data.title || "Unknown title"
    const releaseDate = data.date || data['release-events']?.[0]?.date || "Unknown release date";
    const hasArtwork = data['cover-art-archive']?.artwork || false
    return { id, title, releaseDate, hasArtwork }
}