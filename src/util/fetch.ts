import { MbzApiUrl, mbzLookupReleaseUrl } from "./URLs"
import { MbzReleaseDTO } from "./lookup"

export type MbzFetchResult<DTO> = {
    count: number
    offset: number
    results: DTO[]
}



export const mbzFetch = async <DTO>(url: MbzApiUrl, userAgentString: string, resultsKey: string, DTOFn: (data: any) => DTO): Promise<(
    | MbzFetchResult<DTO>
    | string
)> => {
    
    // try to fetch
    let res: Response
    try {
        res = await fetch(url, { headers: { "User-Agent": userAgentString }})
    } catch (error) {
        console.error("Failed to mbzFetch")
        console.error(error)
        return "Failed to mbzFetch"
    }

    // try to get json
    let data: any
    try {
        data = await res.json()
    } catch (error) {
        console.error("Failed to parse json during mbzFetch")
        console.error(error)
        return "Failed to parse json during mbzFetch"
    }

    // console.log("DATA")
    // console.log(data)
    // console.log()

    // success
    return {
        offset: data.offset || data[`${resultsKey.slice(0, -1)}-offset`] || 0,
        count: data.count || data[`${resultsKey.slice(0, -1)}-count`] || 0,
        results: (data[resultsKey] || []).map(DTOFn)
    }
}

export const mbzFetchRelease = async (releaseId: string, userAgentString: string) => {

        // try to fetch
        let res: Response
        try {
            res = await fetch(mbzLookupReleaseUrl(releaseId), { headers: { "User-Agent": userAgentString }})
        } catch (error) {
            console.error("Failed to mbzFetch")
            console.error(error)
            return "Failed to mbzFetch"
        }
    
        // try to get json
        let data: any
        try {
            data = await res.json()
        } catch (error) {
            console.error("Failed to parse json during mbzFetch")
            console.error(error)
            return "Failed to parse json during mbzFetch"
        }


}