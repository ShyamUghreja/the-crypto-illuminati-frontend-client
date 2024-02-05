import React from 'react'
import "./hero.sass"
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import HeroImg from '../../assets/hero-img.svg';
import SquareRed from '../../assets/icons/square-red.svg';

const Hero = () => {
    return (
        <div>
            <section className='home-hero-sec position-relative'>
                <Container>
                    <Row>
                        <Col className='align-self-end' lg={6} md={6}>
                            <div className='hero-text'>
                                <h1 className='heading-1'>Daily <span> Crypto <br /></span> News & <span>Industry</span> Analysis</h1>
                                <p className='paragraph-large mt-lg-4 mt-3 me-lg-5'>Our personal crypto intern, we provide <br /> actionable insights so that you know what's really important</p>
                                <Form.Group className="position-relative d-flex subscribe mt-lg-5 mt-md-4 mt-3 me-lg-5" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" placeholder="Enter email address" />
                                    <Button className='news-sign-button primary-btn'>Subscribe</Button>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col lg={6} md={6} className='position-relative'>
                            <div className='text-end mb-4 mb-md-0 mb-lg-0 hero-section-image'>
                                <img className='img-fluid ml-auto' src={HeroImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <img src={SquareRed} className='img-fluid square-red-1' alt="" />
                <img src={SquareRed} className='img-fluid square-red-2' alt="" />
                <img src={SquareRed} className='img-fluid square-red-3' alt="" />
                <img src={SquareRed} className='img-fluid square-red-4' alt="" />
                <img src={SquareRed} className='img-fluid square-red-5' alt="" />
                <img src={SquareRed} className='img-fluid square-red-6' alt="" />
                <img src={SquareRed} className='img-fluid square-red-7' alt="" />
            </section>
        </div>
    )
}

export default Hero