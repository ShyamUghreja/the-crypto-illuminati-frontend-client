import React, { useEffect, useState } from 'react'
import "./research-hub.sass"
import { Col, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getCategories, getPosts } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import moment from "moment"
import LatestContentLoader from '../latest-project/LatestContentLoader';
import SquareRed from '../../assets/icons/square-red.svg';


const Research = () => {
    const nav = useNavigate()

    const [lastestPosts, setLastestPosts] = useState([])
    const [loader, setLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedTag, setSelectedTag] = useState<string>("")


    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        console.log("GOGOG", selectedTag);
        
        if (selectedTag) {
            fetchPosts(selectedTag)
        }
    }, [selectedTag])

    const fetchCategories = () => {
        getCategories().then(cats => {
            setCategories(cats?.data || [])
            console.log('(cats?.data[0] && cats?.data[0].attribute?.slug)',  cats?.data[0]);
            
            setSelectedTag((cats?.data[0] && cats?.data[0].attributes?.slug) || '')
        }).catch(err => {
        })
    }

    const fetchPosts = (tag: string) => {
        setLoader(true)
        console.log("coming", tag);
        getPosts({ type: "research", tag: tag }, 0, 9).then(posts => {
            setLoader(false)
            console.log("ASDada", posts);
            setLastestPosts(posts.data || [])
        }).catch(err => {
            console.log("errrrrrrrrrrrrrrrrrrr");
            
            setLoader(false)
        })
    }
    const onChangeSelectedTag = (tag: string) => {
        setSelectedTag(tag)
    }

    return (
        <div>
            <section className='research-sec position-relative mt-5'>
                <Container>
                    <div className='research-news'>
                        <h2 className='heading-2 color-black text-center fw-700'>Research Hub</h2>
                        <div className='research-tabview mt-lg-5 mt-3'>
                            <Tabs
                                id="fill-tab-example"
                                className="mb-4 justify-content-lg-center justify-content-start"
                                fill
                                activeKey={selectedTag}
                                onSelect={(key: any) => onChangeSelectedTag(key)}
                            >
                                {categories && categories?.map((cat: any, index) => {
                                    return <Tab key={index} eventKey={cat?.attributes?.slug} title={cat?.attributes?.name}>
                                        <Row>
                                            {loader && <LatestContentLoader />}
                                            {!loader && lastestPosts.length ? lastestPosts?.map((item: any, i: any) => {
                                                const tagsArr = (item?.attributes?.tags && item?.attributes?.tags.split(",")) || []
                                                return (
                                                    <Col lg={4} md={6} xs={12} className='mb-4' key={i} onClick={() => nav(`/post/${item?.attributes?.slug}`)}>
                                                        <div className="latest-card latest-card-bg" role="button">
                                                            <div>
                                                                <div className="d-flex justify-content-between">
                                                                    <div className='d-flex flex-wrap gap-1'>
                                                                        {tagsArr.map((tag: string, i: number) => <button key={i} className='button-small'>{tag}</button>)}
                                                                    </div>
                                                                </div>
                                                                <h6 className='heading-6 color-black'>{item?.attributes?.title}</h6>
                                                            </div>
                                                            {/* <div className="position-relative"> */}
                                                            <div className="d-flex by-date align-items-center mt-3">
                                                                <p className='by-them paragraph-smaller color-black'>by <span className='bold-subhead color-black fw-500'>{item?.attributes?.author}</span></p>
                                                                {/* <div className='mx-3'>|</div> */}
                                                                <p className='article-date paragraph-smaller bold-subhead color-black'>{(item?.attributes?.publishDate && moment(item?.attributes?.publishDate).format("MMM DD, yyyy")) || "-"}</p>
                                                            </div>
                                                            {/* </div> */}
                                                        </div>
                                                    </Col>
                                                )}) : loader ? null : <Col xs={12}><p className='font-semibold text-lg text-center mt-5 color-black'>No research data found.</p></Col>}
                                        </Row>
                                    </Tab>
                                })
                                }
                            </Tabs>
                        </div>
                    </div>
                </Container>
                <img src={SquareRed} className='img-fluid square-red-1' alt="" />
                <img src={SquareRed} className='img-fluid square-red-2' alt="" />
                <img src={SquareRed} className='img-fluid square-red-3' alt="" />
                <img src={SquareRed} className='img-fluid square-red-4' alt="" />
                <img src={SquareRed} className='img-fluid square-red-5' alt="" />
                <img src={SquareRed} className='img-fluid square-red-8' alt="" />
                <img src={SquareRed} className='img-fluid square-red-6' alt="" />
                <img src={SquareRed} className='img-fluid square-red-7' alt="" />
            </section>
        </div>
    )
}

export default Research