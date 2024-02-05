import React, { useEffect, useState } from 'react'
import "./all-research.sass"
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import HeroImg from '../../assets/HeroImg.svg';
import Tag from '../../assets/tag-1.svg';
import Tag2 from '../../assets/tag-2.svg';
import Tag3 from '../../assets/tag-3.svg';
import Tag4 from '../../assets/tag-4.svg';
import Tag5 from '../../assets/tag-5.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Post from '../post-card/Post';
import { getCategories, getPosts } from '../../api/posts';
import PostContentLoader from '../post-card/PostContentLoader';
import ContentLoader from 'react-content-loader';
import Pagination from '../Pagination';
import Allhero from '../all-hero/all-hero';

const totalLimit = 20

const Allresearch = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
  const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;

  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)

  const [categories, setCategories] = useState([])
  const [catLoader, setCatLoader] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("")
  console.log(categories, 222222222222222222)
  const element = document.getElementById("research-section");

  const isNews = pathname.includes("/news")

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
      setSelectedTag(tagSlug || cats?.data[0] && cats?.data[0]?.attributes?.slug || '')
    }).catch(err => {
      setCatLoader(false)
    })
  }

  const fetchPosts = (catSlug: string, currentPage: number) => {
    setLoader(true)
    if (showAll) element?.scrollIntoView({ behavior: "smooth" });
    getPosts({
      type: isNews ? "news" : "research",
      tag: catSlug
    }, showAll ? (totalLimit * currentPage) : 0, showAll ? totalLimit : 8).then(posts => {
      setLoader(false)
      setPosts(posts.data || [])
      setTotal(posts.total || 0)
    }).catch(err => {
      setLoader(false)
    })
  }

  const onChangeSelectedTag = (tag: string) => {
    if (showAll) {
      nav(`/${isNews ? "news" : "research"}/all/${tag}`)
    }
    setSelectedTag(tag)
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const contentLoader = () => {
    return <>
      {[1, 2, 3, 4, 5, 6].map((item, i) => <Col key={i} xs={6} md={4} lg={2}>
        <ContentLoader viewBox="0 0 600 200" height={130} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100px" />
        </ContentLoader>
      </Col>)}
    </>
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)

  return (
    <>{showAll && <Allhero />}
      <div id="research-section" className='other-main-div pb-5'>
        <section className='all-research-sec pt-lg-5'>
          <Container>
            <Row>
              {showAll ? null :
                <Col lg={12}>
                  <div className='text-center'>
                    {isNews ?
                      <h2 className='heading-2 font-color-black'>Browse All News</h2> :
                      <h2 className='heading-2 font-color-black'>Browse All Research</h2>
                    }
                  </div>
                </Col>
              }
              <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)}>
                {catLoader ? contentLoader() : <Col lg={12}>
                  <Nav variant="pills" className="curated-buttons justify-content-lg-center my-lg-5 my-3 gap-lg-3 gap-md-2 gap-1">
                    {categories && categories?.map((item: any, i: any) => (
                      <Nav.Item key={i}>
                        <Nav.Link eventKey={item?.attributes?.slug}><img src={Tag} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.attributes?.name}</span></Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>}
                <Tab.Content id="tabs-content">
                  {categories && categories?.map((item: any, i: any) => (
                    <Tab.Pane key={i} eventKey={item?.attributes?.slug}>
                      <Row>
                        {loader && <PostContentLoader showAll />}
                        {!loader && posts.length ? posts.map((post: any, index: number) => (
                          <Post
                            key={index}
                            slug={post.slug}
                            title={post.title}
                            subTitle={post.subTitle}
                            author={post.author}
                            tags={post.tags}
                            thumbnailUrl={post.thumbnailUrl}
                            publishDate={post.publishDate}
                          />
                        )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} {selectedTag} found.</p></Col>}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container >
              {(catLoader || loader || posts.length === 0) ? null : showAll ? <>
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </>
                : <div className='text-center'>
                  <button className='primary-btn' onClick={() => nav(`/${isNews ? "news" : "research"}/all/${selectedTag}`)}>View All</button>
                </div>}
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Allresearch