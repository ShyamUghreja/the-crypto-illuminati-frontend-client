import React, { useEffect, useState } from 'react'
import "./ecosystem.sass"
import { Col, Container, Row } from 'react-bootstrap'
import ethLogo from '../../assets/eth-logo.svg';
import solanaLogo from '../../assets/solana-logo.svg';
import polygonLogo from '../../assets/polygen-logo.svg';
import avalancheLogo from '../../assets/avalanche-logo.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getEcosystem } from '../../api/posts';
import ContentLoader from 'react-content-loader';

const logos: any = {
  ethereum: ethLogo,
  solana: solanaLogo,
  polygon: polygonLogo,
  avalanche: avalancheLogo,
}

const Ecosystem = () => {
  const location = useLocation();
  const nav = useNavigate()
  const [ecosystem, setEcosystem] = useState([])
  const [loader, setLoader] = useState(false)
  const { subtype = '' } = useParams()

  const pathname = location.pathname;
  const isNews = pathname === "/news"

  // useEffect(() => {
  //   fetchPosts()
  // }, [])

  const fetchPosts = () => {
    setLoader(true)
    getEcosystem().then(eco => {
      setLoader(false)
      setEcosystem(eco || [])
    }).catch(err => {
      setLoader(false)
    })
  }

  const contentLoader = () => {
    return <Row className='max-w-3xl pt-10'>
      {[1, 2, 3, 4].map((item, i) => <Col key={i} xs={6} md={3} >
        <ContentLoader height={180} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100%" />
        </ContentLoader>
      </Col>)}
    </Row>
  }

  return (
    <>
      <div>
        <section className='ecosystem-sec mt-5'>
          <Container>
            <Row>
              <Col lg={12}>
                <div className='text-center'>
                  {!isNews ?
                    <h2 className='heading-2 font-color-black'>Research by Ecosystem</h2> :
                    <h2 className='heading-2 font-color-black'>News by Ecosystem</h2>
                  }

                </div>
              </Col>
              {loader && contentLoader()}
              <div className="Resources-all-card mt-lg-5 mt-3">
                {!loader && ecosystem.length ? ecosystem.map((item: any, i: any) => (
                  <div style={{ border: subtype === item.slug ? "2px solid #43b6b2" : "" }} className="crypto-card" role="button" key={i} onClick={() => nav(`/${isNews ? "news" : "research"}/ecosystem/${item.slug}`)}>
                    <div className="card-image">
                      <img src={logos[item.slug]} alt="" className='img-fluid mx-auto' />
                    </div>
                    {/* <div className='mt-2'>
                      <p className='color-black fw-600'>{item.name}</p>
                    </div> */}
                  </div>

                )): loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
              </div>
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Ecosystem