import React, { useEffect, useState } from "react";
import { Button, NavLink, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/crypto-logo.svg";
import "./hader.sass";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubscribeModal from "../all-hero/modal/subscribe-modal";
import MenuOpenIcon from '../../assets/menu-open.svg';

const Header = () => {
    const [isActive, setActive] = useState(false);
    const [scroll, setScroll] = useState(false)
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const [subscribemodal, setSubscribemodal] = useState<boolean>(false)
    const subscribemodalToggle = () => {
        setSubscribemodal(!subscribemodal)
    }
    const [refreshData, setRefreshData] = useState<boolean>(false)
    const nav = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
          setScroll(window.scrollY > 100);
        });
      }, []);
    return (
        <>
            <header
                className={scroll ? "scrolled" : ""}
            >
                <Container>
                    <Navbar className="justify-content-between">
                        <Navbar.Brand className="d-lg-flex" role="button" onClick={() => { nav("/") }}>
                            <img className='img-fluid' src={Logo} alt="logo" />
                        </Navbar.Brand>
                        <Navbar
                            className={
                                isActive
                                    ? "justify-content-end menu logo active border-0"
                                    : "justify-content-end menu logo border-0"}
                        >
                            <Nav className="header-navigation">
                                <Navbar.Brand onClick={() => { nav("/") }}>
                                    <img className='img-fluid' src={Logo} alt="logo" />
                                </Navbar.Brand>
                                <hr className="d-block d-lg-none" />
                                {/* <div className="mobile-search">
                                    <div className="mobile-search-input">
                                        <input type="text" placeholder="Search..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </div> */}
                                <div className="close-menu-icon" onClick={() => setActive(false)}>
                                    <i className="ri-close-line"></i>
                                </div>
                                <Link
                                    to="/"
                                    className={splitLocation[1] === "" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/research"
                                    className={splitLocation[1] === "research" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Research
                                </Link>
                                <Link
                                    to="/news"
                                    className={splitLocation[1] === "news" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    News
                                </Link>
                                <Link
                                    to="/podcasts"
                                    className={splitLocation[1] === "podcasts" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Podcasts
                                </Link>
                                <Link
                                    to="/about-us"
                                    className={splitLocation[1] === "about-us" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    About Us
                                </Link>
                            </Nav>
                        </Navbar>
                        <button type="button" className="primary-btn btn btn-primary rounded-0 d-block my-lg-2 d-lg-block d-none" onClick={() => { nav("/subscribe") }}>
                            Subscribe
                        </button>
                        <NavLink className="open-menu-icon" onClick={() => setActive(true)}>
                            <img src={MenuOpenIcon} alt="" className="img-fluid" />
                        </NavLink>
                    </Navbar>
                </Container>
            </header>
            <SubscribeModal isOpen={subscribemodal} toggle={subscribemodalToggle} setRefreshData={setRefreshData} />
        </>
    );
};

export default Header;
