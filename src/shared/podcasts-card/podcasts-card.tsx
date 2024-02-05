import React, { useEffect, useState } from 'react'
import "./podcasts-card.sass"
import { Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import categoriesIcon from '../../assets/icons/categories-tag.svg';
import PodcastsHero from '../../assets/all-img.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategories, getPosts } from '../../api/posts';
import ContentLoader from 'react-content-loader';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';
import Podcastscmp from '../podcasts-cmp/podcasts-cmp';
import Tag from '../../assets/tag-1.svg';
import Allhero from '../all-hero/all-hero';


const totalLimit = 18


const Podcastscard = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {

    const location = useLocation();
    const nav = useNavigate()
    const pathname = location.pathname;
    const [trendingPosts, setTrendingPosts] = useState([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [loader, setLoader] = useState(false)
    const [catLoader, setCatLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedTag, setSelectedTag] = useState<string>("")
    const [posts, setPosts] = useState([])
    const element = document.getElementById("trending-cmp-id");
    const isAllPodcasts = pathname.includes("/all-podcasts")

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        setCurrentPage(0)
    }, [tagSlug])

    useEffect(() => {
        if (selectedTag) {
            setPosts([])
            fetchPosts(selectedTag, currentPage)
        }
    }, [selectedTag, currentPage, showAll])

    const fetchCategories = () => {
        setCatLoader(true)
        getCategories().then(cats => {
            setCatLoader(false)
            setCategories(cats?.data || [])
      setSelectedTag(tagSlug || cats?.data[0] && cats?.data[0].slug || '')
        }).catch(err => {
            setCatLoader(false)
        })
    }
    const fetchPosts = (catSlug: string, currentPage: number) => {
        setLoader(true)
        if (showAll) element?.scrollIntoView({ behavior: "smooth" });
        getPosts({
            type: "research",
            tag: catSlug,
        }, showAll ? (totalLimit * currentPage) : 0, showAll ? totalLimit : 8).then(posts => {
            setLoader(false)
            setPosts(posts.data || [])
            setTotal(posts.total || 0)
        }).catch(err => {
            setLoader(false)
        })
    }
    const onChangeSelectedTag = (tag: string) => {
        // if (showAll) {
        //     nav(`/podcasts/all/${tag}`)
        // }
        setSelectedTag(tag)
    }

    const onPageChange = (e: any) => {
        setCurrentPage(e.selected || 0)
    }
    const contentLoader = () => {
        return <>
            {[1, 2, 3, 4, 5, 6].map((item, i) => <Col key={i} xs={6} md={4} lg={9}>
                <ContentLoader
                    speed={2}
                    width="100%"
                    height={160}
                    viewBox="0 0 400 160"
                    backgroundColor="#d1d1d1"
                    foregroundColor="#e3e3e3"
                >
                    <rect x="42.84" y="9.93" rx="5" ry="5" width="143.55" height="86.59" />
                    <rect x="192.84" y="9.67" rx="0" ry="0" width="148.72" height="12.12" />
                    <rect x="192.84" y="25.67" rx="0" ry="0" width="89" height="9" />
                    <rect x="42.84" y="107" rx="5" ry="5" width="143.55" height="86.59" />
                    <rect x="192.84" y="107" rx="0" ry="0" width="148.72" height="12.12" />
                    <rect x="192.84" y="123" rx="0" ry="0" width="89" height="9" />
                </ContentLoader>
            </Col>)}
        </>
    }

    const totalPages = Math.ceil(Number(total) / totalLimit)
    return (
        <>
            <div>
                <section className= {isAllPodcasts ? 'Podcastscard-sec all-Podcastscard-sec all-research-sec pt-lg-5 pt-3' : "Podcastscard-sec all-research-sec pt-lg-5 pt-3"}>
                    <Container>
                        <div className='podcast-bg'>
                        {showAll ? <Allhero/> :
                            <h2 className='heading-2 color-black text-center'>Browse All Podcasts</h2>
                        }
                            <div className='mt-lg-5'>
                                <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)}>
                                    <Row>
                                        {catLoader ? contentLoader() : <Col lg={3}>
                                            <Nav variant="pills" className="podcasts-buttons curated-buttons justify-content-lg-center gap-lg-3 gap-md-2 gap-1 my-lg-0 my-3">
                                                {categories && categories?.map((item: any, i: any) => (
                                                    <Nav.Item key={i}>
                                                        <Nav.Link eventKey={item?.attributes?.slug}><img src={Tag} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.attributes?.name}</span></Nav.Link>
                                                    </Nav.Item>
                                                ))}
                                            </Nav>
                                        </Col>}
                                        <Col lg={9}>
                                            <Tab.Content id="tabs-content">
                                                {categories && categories?.map((item: any, i: any) => (
                                                    <Tab.Pane key={i} eventKey={item?.attributes?.slug}>
                                                        {/* <Row> */}
                                                            {loader && <PostContentLoader showAll />}
                                                            {!loader && posts.length ? posts.map((post: any, index: number) => (
                                                                <Podcastscmp
                                                                    key={index}
                                                                    slug={post.slug}
                                                                    title={post.title}
                                                                    tags={post.tags}
                                                                    thumbnailUrl={post.thumbnailUrl}
                                                                />
                                                            )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No podcasts found.</p></Col>}
                                                        {/* </Row> */}
                                                    </Tab.Pane>
                                                ))}
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container >
                                {(catLoader || loader || posts.length === 0) ? null : showAll ? <>
                                    <Pagination
                                        page={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                    />
                                </>
                                    : <div className='text-center'>
                                        <button className='primary-btn' onClick={() => nav(`/podcasts/all-podcasts/${selectedTag}`)}>View All</button>
                                    </div>}
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Podcastscard