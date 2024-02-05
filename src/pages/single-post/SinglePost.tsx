import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '../../api/posts'
import Arrow from '../../assets/Arrow.svg';
import ContentLoader from 'react-content-loader';
import { Col } from 'react-bootstrap';

function SinglePost() {

  const params = useParams()
  const nav = useNavigate()
  const [loader, setLoader] = useState(false)
  const slug = params.slug as string

  useEffect(() => {
    if (slug) {
      setLoader(true)
      getPostById(slug).then(data => {
        setLoader(false)
        const elm = document.getElementById("single-post-id")
        if (elm) {
          elm.innerHTML = data.content || ''
        }
      }).catch(err => setLoader(false))
    }
  }, [slug])

  if ((window as any)?.twttr!) {
    (window as any).twttr?.widgets?.load()
  }

  const contentLoader = () => {
    return <>
      <Col xs={12}>
        <ContentLoader height={630} width="100%">
          <rect x="0" y="30" rx="5" ry="5" width="100%" height="30px" />
          <rect x="0" y="80" rx="5" ry="5" width="100%" height="30px" />
          <rect x="0" y="150" rx="5" ry="5" width="60%" height="20px" />
          <circle cx="30" cy="250" r="24" />
          <rect x="60" y="235" rx="5" ry="5" width="80px" height="10px" />
          <rect x="60" y="255" rx="5" ry="5" width="80px" height="10px" />
          <circle cx="80%" cy="255" r="16" />
          <circle cx="88%" cy="255" r="16" />
          <circle cx="96%" cy="255" r="16" />
          <rect x="0" y="400" rx="5" ry="5" width="60%" height="14px" />
          <rect x="0" y="420" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="440" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="460" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="480" rx="5" ry="5" width="20%" height="14px" />
          <rect x="0" y="540" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="560" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="580" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="600" rx="5" ry="5" width="60%" height="14px" />
        </ContentLoader>
      </Col>
    </>
  }

  return (
    <>
      <div role='button' className='max-w-2xl mt-6 mb-2 mx-auto'>
        <img
          style={{ background: "#d4d4d4", padding: "10px" }}
          src={Arrow}
          alt=""
          onClick={() => nav(-1)}
        />
      </div>
      {loader && <div className='max-w-2xl mx-auto'>
        {contentLoader()}
      </div>}
      <div id="single-post-id"></div>
    </>
  )
}

export default SinglePost