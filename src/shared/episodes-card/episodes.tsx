import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import moment from "moment"
import "./episodes.sass"
import { useNavigate } from 'react-router-dom'

export interface IPost {
    slug: string,
    title: string,
    subTitle: string,
    author: string,
    tags: string,
    thumbnailUrl: string,
    publishDate: string
}

function Episodes(props: IPost) {
    const { slug, title, subTitle, author, tags, thumbnailUrl, publishDate } = props
    const tagsArr = tags && tags.split(",") || []
    const nav = useNavigate()

    return (
        <Col lg={3} md={6} xs={12} role="button" onClick={() => nav(`/post/${slug}`)}>
            <div className="episodes-container">
                <div className="card-image">
                    <img src={thumbnailUrl} alt="" className='img-fluid' />
                </div>
                <div className="card-content">
                    <div className="content-heading">
                        <div className='d-flex justify-end gap-1 flex-wrap'>
                            {
                                tagsArr.map((tag, i) => <button key={i} className='button-small-secondary'>{tag}</button>)
                            }
                        </div>
                    </div>
                    <hr className='m-0' />
                    <p className='mt-2 mb-2 medium-p heading color-white'>{title}</p>
                    <div className='d-flex justify-content-between by-date'>
                        <div className='d-flex'>
                            <div>
                                <p className='paragraph-smaller color-primary fw-400'>Host</p>
                                <p className=''>Kadeem</p>
                            </div>
                            <div className='host-line'></div>
                            <div>
                                <p className='paragraph-smaller fw-400'>Guest</p>
                                <p className=''>Ali</p>
                            </div>
                        </div>
                        <div className='time fw-500'><p className='paragraph-small'>43m</p></div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default Episodes