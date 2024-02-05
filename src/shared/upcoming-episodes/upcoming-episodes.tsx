import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { getPosts } from '../../api/posts';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';
import Episodes from '../episodes-card/episodes';

const totalLimit = 20

const Upcomingepisodes = ({ showAll }: { showAll?: boolean }) => {

    const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;
  const [trendingPosts, setTrendingPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)


  const isNews = pathname.includes("/news")
  const element = document.getElementById("trending-cmp-id");

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage, showAll])

  const fetchPosts = (currentPage: number) => {
    setLoader(true)
    if (showAll) element?.scrollIntoView({ behavior: "smooth" });
    getPosts({
      type: isNews ? "news" : "research",
      trending: true
    }, showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 4).then(posts => {
      setLoader(false)
      setTrendingPosts(posts.data || [])
      setTotal(posts.total || 0)
    }).catch(err => {
      setLoader(false)
    })
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)
  return (
    <div className='other-main-div'>
        <section id="trending-cmp-id" className='research-card-sec pt-lg-5 pt-3'>
          <Container>
            <div className='d-block d-lg-flex d-md-flex justify-content-between mb-lg-5 mb-3 align-items-center'>
              {/* {pathname === "/news" &&
                <h2 className='heading-2 font-color-black'>Trending News</h2>
              }
              {pathname === "/research" &&
                <h2 className='heading-2 fw-600'>Trending Research</h2>
              } */}
              {pathname === "/podcasts" &&
                <h2 className='heading-2 fw-600'>Upcoming Episodes</h2>
              }
              {showAll ? null : <div>
                <button className='primary-btn mt-lg-0 mt-md-0 mt-3' 
                // onClick={() => {nav(pathname === "/news" ? "/news/trending" : 
                // pathname === "/research" ? "/research/trending" :
                // pathname === "/podcasts" ? "/podcasts/trending" :
                // "")}} 
                >View All</button>
              </div>}
            </div>
            <Row>
              {loader && <PostContentLoader />}
              {!loader && trendingPosts.length ? trendingPosts.map((item: any, index: number) => (
                <Episodes
                  key={index}
                  slug={item.slug}
                  title={item.title}
                  subTitle={item.subTitle}
                  author={item.author}
                  tags={item.tags}
                  thumbnailUrl={item.thumbnailUrl}
                  publishDate={item.publishDate}
                />
              )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
            </Row>
          </Container>
          {showAll && <Pagination
            theme="light"
            page={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />}
        </section>
      </div>
  )
}

export default Upcomingepisodes