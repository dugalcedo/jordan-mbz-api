import { mbzBrowseReleasesByReleaseGroupUrl, mbzSearchArtistUrl } from "./util/URLs";

import MBZClient from "./util/client";

const mbz = new MBZClient({
    appName: "Jordan_Music_Journal__Tests",
    version: "0.0.1",
    contactEmail: "dougalcedo@gmail.com"
})

const test = async () => {
    const result = await mbz.browseReleaseGroupsByArtists("11eabe0c-2638-4808-92f9-1dbd9c453429", 75)
    if (typeof result !== "string") {
        console.log(result.count, result.offset, result.results.slice(0, 3))
    }
}

// test()
