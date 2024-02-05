import React, { useEffect, useRef, useState } from 'react'
import "./trending-cmp.sass"
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategories, getNewsData, getPosts } from '../../api/posts';
import Post, { IPost } from '../post-card/Post';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';
import Allhero from '../all-hero/all-hero';
import ContentLoader from 'react-content-loader';
import Tag from '../../assets/tag-1.svg';


const totalLimit = 20

const TrendingCmp = () => {
  const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;
  const splitLocation = pathname.split("/");
  const [trendingPosts, setTrendingPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [catLoader, setCatLoader] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [categories, setCategories] = useState([])

  const isNews = pathname.includes("/news")
  const isTrending = pathname.includes("/trending")
  const element = document.getElementById("trending-cmp-id");
  console.log("trendingPoststrendingPosts", trendingPosts)
  const startingCounter = useRef(0);
  let apiRequestDataSetLimit = 4


  // const fetchPosts = (catSlug: string, currentPage: number) => {
  //   setLoader(true)
  //   if (showAll) element?.scrollIntoView({ behavior: "smooth" });
  //   getPosts({
  //     type: "research",
  //     tag: catSlug,
  //     trending: true
  //   }, showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 4).then(posts => {
  //     setLoader(false)
  //     console.log("posts.dataposts.data", posts)
  //     setTrendingPosts(posts.data || [])
  //     setTotal(posts.total || 0)
  //   }).catch(err => {
  //     console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrr")
  //     setLoader(false)
  //   })
  // }
  const getLatestNewsData = async (skipDataValue: any) => {
    try {
      setLoader(true)
      await getNewsData(skipDataValue, apiRequestDataSetLimit, "research")
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || []
            setTrendingPosts(allArticle)
            setTotal(res?.data?.meta?.pagination?.total || 0)
            setLoader(false)
          }
        }).catch((err: any) => {
          console.log("catcherrrrrrrrrrrrr")
          setLoader(false)
        })
    }
    catch (err: any) {
      console.log("errrrrrrrrrrrrrrrrr")
      setLoader(false)
      return { error: err?.res?.data };
    }
  };

  useEffect(() => {
    setTrendingPosts([])
    startingCounter.current = 0
    // getAllCategorysData()
  }, [])

  useEffect(() => {
    setTrendingPosts([])
    startingCounter.current = 0
    console.log("A");
    getLatestNewsData(startingCounter.current,)
  }, [])

  const fetchdata = () => {
    setTimeout(() => {
      getLatestNewsData(startingCounter.current + apiRequestDataSetLimit)
      console.log("B");
      startingCounter.current = startingCounter.current + apiRequestDataSetLimit
    }, 1000);
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
      {isTrending && <Allhero />}
      <div className='other-main-div'>
        <section id="trending-cmp-id" className='all-research-sec research-card-sec pt-lg-5 pt-3'>
          <Container>
            <div className='d-flex justify-content-between mb-lg-5 mb-3 align-items-center'>
              {pathname === "/news" &&
                <h2 className='heading-2 font-color-black'>Trending News</h2>
              }
              {pathname === "/research" &&
                <h2 className='heading-2 fw-600'>Trending Research</h2>
              }
              {pathname === "/podcasts" &&
                <h2 className='heading-2 fw-600'>Trending podcasts</h2>
              }
              <div className='text-center'>
                <button className='primary-btn' onClick={() => nav(`/${splitLocation[1]}/trending/${selectedTag}`)}>View All</button>
              </div>
            </div>

            {/* <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)}>
              {catLoader ? contentLoader() : <Col lg={12}>
                <Nav variant="pills" className="curated-buttons justify-content-lg-center my-lg-5 my-3 gap-lg-3 gap-md-2 gap-1">
                  {categories?.map((item: any, i: any) => (
                    <Nav.Item key={i}>
                      <Nav.Link eventKey={item.slug}><img src={Tag} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.name}</span></Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>}
            </Tab.Container>
             */}
            <Row>
              {loader && <PostContentLoader />}
              {!loader && trendingPosts.length ? trendingPosts.map((item: any, index: number) => (
                <>
                <Post
                  key={index}
                  slug={item?.attributes?.slug}
                  title={item?.attributes?.title}
                  subTitle={item?.attributes?.subtitle}
                  author={item?.attributes?.author}
                  tags={item?.attributes?.tags}
                  thumbnailUrl={item?.attributes?.thumbnailUrl}
                  publishDate={item?.attributes?.publishDate}
                />
                {console.log(item?.attributes?.tags, "item?.attributes?.tags")}
                </>
              )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
            </Row>

            {/* <Tab.Container id="left-tabs-example1" activeKey={selectedTag} >
              {showAll && <>
                {catLoader ? contentLoader() :
                  <Col lg={12}>
                    <Nav variant="pills" className="curated-buttons justify-content-lg-center my-lg-5 my-3 gap-lg-3 gap-md-2 gap-1">
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
                      {loader && <PostContentLoader showAll />}
                      {!loader && trendingPosts.length ? trendingPosts.map((post: any, index: number) => (
                        <Post
                          key={index}
                          slug={post?.attributes?.slug}
                          title={post?.attributes?.title}
                          subTitle={post?.attributes?.subTitle}
                          author={post?.attributes?.author}
                          tags={post?.attributes?.tags}
                          thumbnailUrl={post?.attributes?.thumbnailUrl}
                          publishDate={post?.attributes?.publishDate}
                        />
                      )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
                    </Row>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container > */}
            {/* {(catLoader || loader || trendingPosts.length === 0) ? null : showAll ? <>
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              // onPageChange={onPageChange}
            />
          </>
            : ""} */}
          </Container>
        </section>
      </div>
    </>
  )
}

export default TrendingCmp