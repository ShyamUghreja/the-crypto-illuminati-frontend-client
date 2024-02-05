import React, { useState } from 'react'
import "./all-hero.sass"
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import OtherHeroImg from '../../assets/other-hero-img.svg';
import Herobg from '../../assets/BG Vector.svg';
import { useLocation } from 'react-router-dom';
import SubscribeModal from './modal/subscribe-modal';

const Allhero = () => {

    const location = useLocation();
    const pathname = location.pathname;
    const splitLocation = pathname.split("/");
    const isTrending = pathname.includes("/trending")
    const isLatest = pathname.includes("/latest")
    const isNews = pathname.includes("/news")
    const isAllBrowse = pathname.includes("/all/")
    // const isAllNews = pathname.includes("/news/all")
    const isAllCryptoNews = pathname.includes("/all-crypto-news")
    const isAllPodcasts = pathname.includes("/all-podcasts")
    const [subscribemodal, setSubscribemodal] = useState<boolean>(false)
    const subscribemodalToggle = () => {
        setSubscribemodal(!subscribemodal)
    }
    const [refreshData, setRefreshData] = useState<boolean>(false)
    return (
        <div>
            <section className='all-hero-sec position-relative'>
                <Container>
                    <Row className=''>
                        <Col className='align-self-center' lg={6} md={6} sm={12}>
                            {pathname === "/about-us" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>About Us</h2>
                                    <p className='paragraph-small mt-4 me-lg-5'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. Whether you're curious about DeFi or NFTs, The Crypto Illuminati has you covered with a daily newsletter, in-depth research, and insights into current narratives.</p>
                                </div>
                            }
                            {pathname === "/advertise" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Advertise on <br /> The Crypto Illuminati</h2>
                                </div>
                            }
                            {pathname === "/cross-promotion" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Newsletter <br />Cross- Promotion on <br /> The Crypto Illuminati</h2>
                                </div>
                            }
                            {pathname === "/subscribe" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Daily crypto news <br /> and industry analysis</h2>
                                    <p className='paragraph-small my-3 my-md-4 me-lg-5'>Your personal crypto intern, we provide actionable insights so that you know what's really important</p>
                                    <div>
                                        <Form.Group className="position-relative d-flex subscribe mt-lg-5 mt-md-4 mt-3 me-lg-5" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="email" placeholder="Enter email address" />
                                            <Button className='news-sign-button primary-btn' onClick={() => { subscribemodalToggle() }}>Subscribe</Button>
                                        </Form.Group>
                                    </div>
                                    {/* <Form.Group className="position-relative d-flex subscribe me-lg-5 mb-lg-0 mb-md-0 mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" placeholder="Enter email address" />
                                        <Button className='news-sign-button'>Subscribe</Button>
                                    </Form.Group> */}
                                </div>
                            }
                            {pathname === "/research" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Crypto Research</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>M6 Labs is a community of researchers who tell the story <br /> of crypto through the lens of natives.</p>
                                </div>
                            }
                            {pathname === "/news" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>All News</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>M6 Labs is a community of researchers who tell the story of crypto through the lens of natives.</p>
                                </div>
                            }
                            {pathname === "/podcasts" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>All Podcasts</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. </p>
                                </div>
                            }
                            {isTrending &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Trending {splitLocation[1]}</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. </p>
                                </div>
                            }
                            {isAllPodcasts &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Browse All Podcasts</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. </p>
                                </div>
                            }
                            {isLatest &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>{isNews ? "Latest Daily Bullets" : "Latest Project Overviews"}</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. </p>
                                </div>
                            }
                            {isAllCryptoNews &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Latest Crypto News</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. </p>
                                </div>
                            }
                            {isAllBrowse ?
                                isNews ?
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Browse All News</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. </p>
                                </div> :
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Browse All Research</h2>
                                    <p className='paragraph-small mt-lg-4 mt-3 mb-lg-4 mb-md-3 mb-0'>The Crypto Illuminati is a community of researchers who tell the story of crypto through the lens of natives. </p>
                                </div> : ""
                            }
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <div className='text-end all-hero-img'>
                                <img className='img-fluid' src={OtherHeroImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <SubscribeModal isOpen={subscribemodal} toggle={subscribemodalToggle} setRefreshData={setRefreshData} />
        </div>
    )
}

export default Allhero