import React from 'react'
import "./offer.sass"
import { Button, Col, Container, Row } from 'react-bootstrap';
import Daily from '../../assets/daily.svg';
import Weekly from '../../assets/weekly.svg';
import M6logo from '../../assets/M6logo.svg'
import Clock from '../../assets/icons/clockicon.svg'
import Idea from '../../assets/icons/ideaicon.svg'
import { useLocation } from 'react-router-dom';
const cardData = [
    {
        id: 1,
        title: "Daily Bullets",
        description: "Daily in-depth news coverage and analysis on everything you need to know happening in the crypto space.",
        image: Daily,
        link: "https://www.m6labs.co/subscribe",
    },
    {
        id: 2,
        title: "Weekly Alpha Leak",
        description: "Weekly overview and analysis of all the pertinent information & narratives to keep up to date with everything crypto.",
        image: Weekly,
        link: "https://www.renoded.com/subscribe"
    },
    {
        id: 3,
        title: "M6 Labs Research",
        description: "Brilliant minds coming together to further our understanding of our developing sector.",
        image: M6logo,
        link: "https://www.0xilluminati.com/subscribe"
    },
]
const missionData = [
    {
        id: 1,
        title: "Reliable",
        description: "The crypto industry is full of scammers and fake news. We guarantee that all of our news is accurate.",
        image: Daily,
        link: "https://www.m6labs.co/subscribe",
    },
    {
        id: 2,
        title: "Timely",
        description: "Weekly overview and analysis of all the pertinent information & narratives to keep up to date with everything crypto.",
        image: Clock,
        link: "https://www.renoded.com/subscribe"
    },
    {
        id: 3,
        title: "Intuitive",
        description: "Brilliant minds coming together to further our understanding of our developing sector.",
        image: Idea,
        link: "https://www.0xilluminati.com/subscribe"
    },
]

const Offer = () => {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <>
            {pathname === "/" &&
                <div className='offer-sec py-3 py-lg-5 py-md-4'>
                    <Container>
                        <Row className='mb-lg-5 mb-md-4 mb-3'>
                            <Col lg={6}>
                                <h2 className='heading-2'>What we offer</h2>
                            </Col>
                            <Col lg={6}>
                                <p className='paragraph sub-head mb-0'>Our content is designed to provide actionable insights, cutting through the noise so that you can focus on what's truly important!</p>
                            </Col>
                        </Row>
                        <Row className='justify-content-lg-around justify-content-left'>
                            {cardData && cardData.map((item, i) => (
                                <Col lg={4} md={6} xs={12} key={i}>
                                    <div className="subscribe-card">
                                        <img className='img-fluid' src={item.image} alt="" />
                                        <h4 className='my-lg-4 my-2 heading-4 '>{item.title}</h4>
                                        <p className=' paragraph-small mb-3 '>{item.description}</p>
                                        <button className='view-button-black' onClick={() => window.open(item.link)}>Subscribe</button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            }
            {pathname === "/about-us" &&
                <div className='offer-sec py-5'>
                    <Container>
                        <Row className='mb-lg-5 mt-md-b mb-3 '>
                            <Col lg={6}>
                                <h2 className='heading-2'>Our Mission</h2>
                            </Col>
                            <Col lg={6}>
                                <p className='paragraph sub-head mb-0'>The Crypto Illuminati  is dedicated to making crypto news and research more accessible and easier to understand. </p>
                            </Col>
                        </Row>
                        <Row className='justify-content-lg-around justify-content-left'>
                            {missionData && missionData.map((item, i) => (
                                <Col lg={4} md={6} xs={12} key={i}>
                                    <div className="subscribe-card">
                                        <img className='img-fluid' src={item.image} alt="" />
                                        <h4 className='my-lg-4 my-2 heading-4 '>{item.title}</h4>
                                        <p className=' paragraph-small '>{item.description}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            }
        </>
    )
}

export default Offer