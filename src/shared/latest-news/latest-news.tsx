/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import "./latest-news.sass"
import { Col, Container, Row, Button, Tab, Nav } from 'react-bootstrap';
import { getCategories, getPosts } from '../../api/posts';
import moment from "moment"
import { useLocation, useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import HeroImg from '../../assets/latest-img.svg';
import Pagination from '../Pagination';
import Tag from '../../assets/tag-1.svg';
import Allhero from '../all-hero/all-hero';


const totalLimit = 18

const Latestnews = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const location = useLocation()
    const pathname = location.pathname || ''
    const element = document.getElementById("all-news-id");
    const [catLoader, setCatLoader] = useState(false)
    const [selectedTag, setSelectedTag] = useState<string>("")
    const [categories, setCategories] = useState([])

    const fetchPosts = (catSlug: string, currentPage: number) => {
        setLoader(true)
        if (showAll) element?.scrollIntoView({ behavior: "smooth" });
        getPosts({
            type: "news",
            tag: catSlug
        }, showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 4).then(posts => {
            setLoader(false)
            console.log("dadata", posts);
            
            setPosts(posts.data || [])
            setTotal(posts.total || 0)
        }).catch(err => {
            setLoader(false)
        })
    }

    useEffect(() => {
        console.log("Waiting", selectedTag);
        // if (selectedTag) {
            setPosts([])
            fetchPosts("", currentPage)
        // }
    }, [selectedTag, currentPage, showAll])

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        setCurrentPage(0)
    }, [tagSlug])

    const fetchCategories = () => {
        setCatLoader(true)
        getCategories().then(cats => {
            setCatLoader(false)
            setCategories(cats?.data || [])
            setSelectedTag(tagSlug || cats?.data[0] && cats?.data[0]?.attributes?.slug || '')
        }).catch(err => {
            setCatLoader(false)
        })
    }

    const onPageChange = (e: any) => {
        setCurrentPage(e.selected || 0)
    }

    const onChangeSelectedTag = (tag: string) => {
        setSelectedTag(tag)
    }

    const totalPages = Math.ceil(Number(total) / totalLimit)

    const contentLoader = () => {
        return <>
            {[...new Array(4)].map((z, index) => {
                return <div key={index}>
                    <ContentLoader
                        width={"100%"}
                        backgroundColor={'#333'}
                        foregroundColor={'#999'}
                        height={175}
                    >
                        <rect x="0" y="40" rx="0" ry="0" height="15px" width="80%" />
                        <rect x="0" y="70" rx="0" ry="0" height="15px" width="50%" />
                        <rect x="0" y="100" rx="0" ry="0" height="15px" width="100px" />
                        <circle cx="96%" cy="65" r="24" />
                    </ContentLoader>
                </div>
            })}
        </>
    }

    return (
        <div className='other-main-div'>
            {showAll && <Allhero />}
            <section className='latest-news-sec mt-5' id='all-news-id'>
                <Container>
                    <div className='latest-news'>
                        {showAll ? null :
                            <>
                                <div className='mb-lg-4 mb-md-3 mb-2 d-lg-flex d-md-flex d-block justify-content-between align-items-center'>
                                    <h2 className='heading-2 color-black mb-3 mb-lg-0 mb-md-0'>Latest <span className='fw-800'>Crypto</span> News</h2>
                                    <div>
                                        <button className='view-button-white' onClick={() => nav(`/all-crypto-news/${selectedTag}`)}>See All news <i className="ri-arrow-right-line"></i></button>
                                    </div>
                                </div>
                                <hr className='color-black mb-4' />
                            </>
                        }
                        <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)}>
                            {showAll && <>
                                {catLoader ? contentLoader() :
                                    <Col lg={12} className='all-research-sec'>
                                        <Nav variant="pills" className="curated-buttons white-bg justify-content-lg-center my-lg-5 my-3 gap-lg-3 gap-md-2 gap-1">
                                            {categories && categories?.map((item: any, i: any) => (
                                                <Nav.Item key={i}>
                                                    <Nav.Link eventKey={item?.attributes?.slug}><img src={Tag} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.attributes?.name}</span></Nav.Link>
                                                </Nav.Item>
                                            ))}
                                        </Nav>
                                    </Col>
                                }
                            </>
                            }
                            <Tab.Content id="tabs-content">
                                {categories && categories?.map((item: any, i: any) => (
                                    <Tab.Pane key={i} eventKey={item?.attributes?.slug}>
                                        {!loader && posts.length ? posts.map((item: any, i) => {
                                            return <React.Fragment key={i}>
                                                <div className="d-block d-lg-flex d-md-flex align-items-end mb-4">
                                                    <div className="news-image">
                                                        <img src={HeroImg} className='img-fluid' alt="" />
                                                    </div>
                                                    <hr className='my-2 color-black d-block d-lg-none d-md-none' />
                                                    <div className="w-100">
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='news-content'>
                                                                <h4 className="heading-4 mb-0 color-black" >{item?.attributes?.title}</h4>
                                                                <p className='medium-p mt-2 color-light-black'>{item?.attributes?.publishDate && moment(item?.attributes?.publishDate).format("MMM DD, yyyy") || "-"}</p>
                                                            </div>
                                                            <div className='news-btn'>
                                                                <i className="ri-arrow-right-line" onClick={() => nav(`/post/${item?.attributes?.slug}`)}></i>
                                                            </div>
                                                        </div>
                                                        <hr className='mt-3 mb-0 color-black d-none d-lg-flex d-md-flex' />
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        }) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center color-black'>No crypro news found.</p></Col>}
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Tab.Container >
                        {/* {loader && contentLoader()}
                        <div>
                            {!loader && posts.length ? posts.map((item: any, i) => {
                                return <React.Fragment key={i}>
                                    <div className="d-block d-lg-flex d-md-flex align-items-end mb-4">
                                        <div className="news-image">
                                            <img src={HeroImg} className='img-fluid' alt="" />
                                        </div>
                                        <hr className='my-2 color-black d-block d-lg-none d-md-none' />
                                        <div className="w-100">
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='news-content'>
                                                    <h4 className="heading-4 mb-0 color-black" >{item.title}</h4>
                                                    <p className='medium-p mt-2 color-light-black'>{item.publishDate && moment(item.publishDate).format("MMM DD, yyyy") || "-"}</p>
                                                </div>
                                                <div className='news-btn'>
                                                    <i className="ri-arrow-right-line" onClick={() => nav(`/post/${item.slug}`)}></i>
                                                </div>
                                            </div>
                                            <hr className='mt-3 mb-0 color-black d-none d-lg-flex d-md-flex' />
                                        </div>
                                    </div>
                                </React.Fragment>
                            }) : null}
                        </div> */}
                        {showAll && <Pagination
                            theme="light"
                            page={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />}
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Latestnews