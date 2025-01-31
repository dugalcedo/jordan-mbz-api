export type MbzReleaseDTO = {
    id: string
    title: string
    releaseDate: string
    cover?: string
}

export const mbzCreateReleaseResultDTO = async (data: any): Promise<MbzReleaseDTO> => {
    if (!data.id) {
        throw new Error("Data is missing an id")
    }

    const id = data.id
    const title = data.title || "Unknown title"
    const releaseDate = data.date || data['release-events']?.[0]?.date || "Unknown release date";
    const hasArtwork = data['cover-art-archive']?.artwork || false
    let cover = undefined

    if (hasArtwork) {
        // fetch artwork
    }

    return { id, title, releaseDate, cover }
}