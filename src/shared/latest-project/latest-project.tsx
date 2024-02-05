import React, { useEffect, useState } from 'react'
import "./latest-project.sass"
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategories, getPosts } from '../../api/posts';
import moment from "moment"
import LatestContentLoader from './LatestContentLoader';
import Pagination from '../Pagination';
import ContentLoader from 'react-content-loader';
import Tag from '../../assets/tag-1.svg';
import Allhero from '../all-hero/all-hero';

const totalLimit = 18

const Latestproject = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
  const location = useLocation();
  const nav = useNavigate()

  const pathname = location.pathname;
  const [lastestPosts, setLastestPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [catLoader, setCatLoader] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedTag, setSelectedTag] = useState<string>("")
  const isLatest = pathname.includes("/latest")

  const isNews = pathname.includes("/news")
  const element = document.getElementById("latest-project-id");
  console.log("lastestPostslastestPosts", lastestPosts)


  useEffect(() => {
    console.log("Waiting", selectedTag);
    // if (selectedTag) {
      setLastestPosts([])
      fetchPosts("", currentPage)
    // }
}, [selectedTag, currentPage, showAll])

  const fetchPosts = (catSlug: string, currentPage: number) => {
    setLoader(true)
    if (showAll) element?.scrollIntoView({ behavior: "smooth" });
    getPosts({
      type: isNews ? "news" : "research",
      // tag: catSlug
    }, showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 9).then(posts => {
      setLoader(false)
      console.log("ddjnduwd", posts.data)
      setLastestPosts(posts.data || [])
      setTotal(posts.total || 0)
    }).catch(err => {
      console.log("errrrrrrrrrrrrr")
      setLoader(false)
    })
  }

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

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [tagSlug])

  const onChangeSelectedTag = (tag: string) => {
    setSelectedTag(tag)
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)

  const contentLoader = () => {
    return <>
      {[1, 2, 3, 4, 5, 6].map((item, i) => <Col key={i} xs={6} md={4} lg={2}>
        <ContentLoader viewBox="0 0 600 200" height={130} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100px" />
        </ContentLoader>
      </Col>)}
    </>
  }

  return (
    <>
      <div className='other-main-div'>
        {isLatest && <Allhero />}
        <section id="latest-project-id" className='latest-project-sec mt-5'>
          <Container>
            <div className='latest-project-bg'>
              <div className='d-block d-lg-flex d-md-flex justify-content-between mb-lg-5 mb-3 align-items-center'>
                {showAll ? null :
                  <>
                    {isNews ?
                      <h2 className='heading-2 color-black'>Latest Daily Bullets</h2> :
                      <h2 className='heading-2 color-black fw-600'>Latest Project Overviews</h2>
                    }
                  </>
                }
                {showAll ? null : <div className={'text-end'}>
                  <button className='primary-btn mt-lg-0 mt-md-0 mt-3' onClick={() => nav(`/${isNews ? "news" : "research"}/latest`)}>View All</button>
                </div>}
              </div>
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
                    </Col>}
                </>
                }
                <Tab.Content id="tabs-content">
                  {categories && categories?.map((item: any, i: any) => (
                    <Tab.Pane key={i} eventKey={item?.attributes?.slug}>
                      <Row>
                        {loader && <LatestContentLoader />}
                        {!loader && lastestPosts.length ? lastestPosts?.map((item: any, i: any) => {
                          const tagsArr = item.tags && item.tags.split(",") || []
                          return (
                            <Col lg={4} md={6} xs={12} className='mb-4' key={i} onClick={() => nav(`/post/${item?.attributes?.slug}`)}>
                              <div className="latest-card latest-card-bg" role="button">
                                <div>
                                  <div className="d-flex justify-content-between">
                                    <div className='d-flex hide-scrollbar'>
                                      {
                                        tagsArr.map((tag: string, i: number) => <button key={i} className='button-small mx-1'>{tag}</button>)
                                      }
                                    </div>
                                  </div>
                                  <h6 className='heading-6 color-black'>{item?.attributes?.title}</h6>
                                </div>
                                <div className="d-flex by-date align-items-center mt-3">
                                  <p className='by-them paragraph-smaller color-black'>by <span className='color-black fw-500'>{item?.attributes?.author || "Unknown"}</span></p>
                                  <p className='article-date paragraph-smaller color-black'>{item?.attributes?.publishDate && moment(item?.attributes?.publishDate).format("MMM DD, yyyy") || "-"}</p>
                                </div>
                              </div>
                            </Col>
                          )
                        }): loader ? null : <Col xs={12} className="mt-5"><p className='font-semibold text-lg text-center color-black'>No {isNews ? "news" : "research"} project found.</p></Col>}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container >


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
    </>
  )
}

export default Latestproject