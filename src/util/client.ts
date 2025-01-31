import * as URLs from './URLs'
import { mbzFetch } from './fetch'
import { mbzCreateArtistsResultDTO, mbzCreateReleaseGroupResultDTO } from './search'
import { mbzCreateReleaseResultDTO } from './browse'

export type MBZClientInit = {
    appName: string
    version: string
    contactEmail: string
}

class MBZClient {
    userAgent: string

    constructor(init: MBZClientInit) {
        this.userAgent = `${init.appName}/${init.version} ( ${init.contactEmail} )`
    }

    async searchArtists(artist: string) {
        return await mbzFetch(URLs.mbzSearchArtistUrl(artist), this.userAgent, 'artists', mbzCreateArtistsResultDTO) 
    }

    async searchReleaseGroups(releaseGroup: string) {
        return await mbzFetch(URLs.mbzSearchReleaseGroupUrl(releaseGroup), this.userAgent, 'release-groups', mbzCreateReleaseGroupResultDTO)
    }

    async browseReleaseGroupsByArtists(artistId: string, offset?: number, types?: URLs.MbzReleaseGroupType[]) {
        return await mbzFetch(URLs.mbzBrowseReleaseGroupsByArtistUrl(artistId, offset, types), this.userAgent, 'release-groups', mbzCreateReleaseGroupResultDTO)
    }

    async browseReleasesByReleaseGroup(releaseGroupId: string, offset?: number) {
        return await mbzFetch(URLs.mbzBrowseReleasesByReleaseGroupUrl(releaseGroupId, offset), this.userAgent, 'releases', mbzCreateReleaseResultDTO)
    }
}

export default MBZClient