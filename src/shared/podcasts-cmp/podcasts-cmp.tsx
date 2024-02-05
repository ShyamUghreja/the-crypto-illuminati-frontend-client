import moment from 'moment'
import React from 'react'
import "./podcasts-cmp.sass"
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export interface IPost {
    slug: string,
    title: string,
    tags: string,
    thumbnailUrl: string,
}

const Podcastscmp = (props: IPost) => {
    const { slug, title, tags, thumbnailUrl } = props
    const tagsArr = tags && tags.split(",") || []
    const nav = useNavigate()

    return (
        <>
            <div className='d-block d-lg-flex d-md-flex mb-3 w-100' role="button" onClick={() => nav(`/post/${slug}`)}>
                <img className='card-img' src={thumbnailUrl} alt="" />
                <div className='card-text w-100'>
                    <h4 className='heading-4 color-black mb-3 mb-lg-0 mb-md-0'>{title}</h4>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <div>
                                <p className='paragraph-smaller color-primary fw-400'>Host</p>
                                <p className='paragraph-small color-black'>Kadeem</p>
                            </div>
                            <div className='host-line'></div>
                            <div>
                                <p className='paragraph-smaller color-primary fw-400'>Guest</p>
                                <p className='paragraph-small color-black'>Ali</p>
                            </div>
                        </div>
                        <div className='time fw-500'><p className='paragraph-small'>43m</p></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Podcastscmp