import React from 'react'
import './subscribe-modal.sass'
import { Button, Form, Modal } from 'react-bootstrap';
import SubModal from '../../../assets/sub-modal.svg';
interface createModalProps {
    isOpen: boolean,
    toggle: () => void,
    setRefreshData: any,
    removeCross?: Boolean
}

const SubscribeModal = ({ isOpen, toggle, removeCross }: createModalProps) => {
    return (
        <>
            <Modal
                size="lg"
                show={isOpen}
                onHide={toggle}
                className="p-lg-5 p-3 subscribe-modal">
                {removeCross ? null : <Modal.Header closeButton={isOpen}>
                </Modal.Header>}
                <Modal.Body className='p-0'>
                    <div>
                        <div className='d-flex justify-content-between'>
                            <h3 className='heading-3 fw-700'> <span className='fw-400'>Get </span><br /> smarter <br /> about crypto</h3>
                            <img className='img-fluid modelImg' src={SubModal} alt="" />
                        </div>
                        <p className='medium-p my-lg-5 my-3'>Join 250,000+ subscribers and get our 5 min daily newsletter on what matters in crypto</p>
                        <Form.Group className="position-relative d-flex subscribe mt-lg-5 mt-md-4 mt-3 me-lg-5" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="Enter email address" />
                            <Button className='news-sign-button primary-btn'>Subscribe</Button>
                        </Form.Group>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SubscribeModal