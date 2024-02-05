import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { getPosts } from '../../api/posts';
import Post from '../post-card/Post';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';

const totalLimit = 20

function EcosystemPosts({ ecosystem }: { ecosystem: string }) {
  const location = useLocation();

  const pathname = location.pathname;
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)

  const isNews = pathname.includes("/news")
  const element = document.getElementById("trending-cmp-id");

  useEffect(() => {
    if (ecosystem) {
      fetchPosts(currentPage, ecosystem)
    }
  }, [currentPage, ecosystem])

  const fetchPosts = (currentPage: number, ecosystem: string) => {
    setLoader(true)
    element?.scrollIntoView({ behavior: "smooth" });
    getPosts({
      type: isNews ? "news" : "research",
      ecosystem: ecosystem
    }, currentPage * totalLimit, totalLimit).then(posts => {
      setLoader(false)
      setPosts(posts.data || [])
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
    <Container className='mt-10'>
      <Row>
        {loader && <PostContentLoader />}
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
        )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
      </Row>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Container>
  )
}

export default EcosystemPosts