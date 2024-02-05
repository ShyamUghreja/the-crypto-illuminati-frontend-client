import React from 'react'
import Allhero from '../../shared/all-hero/all-hero'
import TrendingCmp from '../../shared/trending-cmp/trending-cmp'
import Latestproject from '../../shared/latest-project/latest-project'
import Ecosystem from '../../shared/ecosystem/ecosystem'
import Allresearch from '../../shared/all-research/all-research'
import { useParams } from 'react-router-dom'
import EcosystemPosts from '../../shared/ecosystem/ecosystem-posts'

const News = () => {
    const params = useParams()
    const type = params.type || ''
    const subtype = params.subtype || ''

    if (type === "all" && !!subtype) {
        return <>
            {/* <Allhero /> */}
            <Allresearch showAll tagSlug={subtype} />
        </>
    } 
    // else if (type === "trending") {
    //     return <>
    //         {/* <Allhero /> */}
    //         <TrendingCmp showAll />
    //     </>
    // } 
    else if (type === "latest") {
        return <>
            {/* <Allhero /> */}
            <Latestproject showAll />
        </>

    } else if (type === "ecosystem") {
        return <>
            {/* <Allhero /> */}
            <Ecosystem />
            <EcosystemPosts ecosystem={subtype} />
        </>
    } else {
        return (
            <>
                <div className="other-main-div">
                    <Allhero />
                    <TrendingCmp />
                    <Latestproject />
                    <Ecosystem />
                    <Allresearch />
                </div>
            </>
        )
    }
}

export default News