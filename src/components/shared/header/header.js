import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ENV } from "../../../config/config";
import Logo from "../../../assets/images/logo.svg"
import './header.css'
import { connect } from 'react-redux'
import { setUser, signOut } from '../../../redux/user/user.action'

function Header(props) {
    const user = ENV.getUserKeys()


    const naviagte = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        let token = localStorage.getItem("accessToken")
        if (token) {
            props.setUser(user)
        }
    }, [])

    return (
        <div className="header">
            <Navbar expand="xl">
                <Container>

                    <Link className="navbar-brand m-0" to="/">
                        <img src={Logo} alt="" />
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="">

                        <Nav className="">
                            <ul className="m-0 p-0  list-unstyled">
                                <li>
                                    <NavLink className="effects nav-link" activeClassName="active" to={user._id ? "/wallet" : "/sign-in"}>Wallet</NavLink>
                                </li>
                                <li>
                                    <NavLink className="effects nav-link" activeClassName="active" to="/smart-levels">Earn Interest</NavLink>
                                </li>
                                <li>
                                    <NavLink className="effects nav-link" activeClassName="active" to="/exchange-triage">Exchange</NavLink>
                                </li>
                                <li>
                                    <NavLink className="effects nav-link" activeClassName="active" to="/staking">Staking</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink className="effects nav-link" activeClassName="active" to="/NFT">NFT</NavLink>
                                </li> */}
                                <li>



                                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">  <Link className="drowpdown-item nav-link" to="/about">
                                            Company
                                        </Link></NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                        <Link className="drowpdown-item nav-link" to="/arbitrage">
                                            Arbitrage
                                        </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">
                                        <Link className="drowpdown-item nav-link" to="/arbitrage">
                                            Arbitrage
                                        </Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item href="#action/3.4">
                                        <Link className="drowpdown-item nav-link" to="/faqs">
                                            FAQ
                                        </Link>
                                        </NavDropdown.Item>
                                    </NavDropdown> */}





                                    <NavDropdown className="effects about-link" title="About us" id="basic-nav-dropdown">
                                        {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
                                        {/* <Link className="drowpdown-item nav-link" to="/staking">
                                            Metaverse
                                        </Link>
                                        <Link className="drowpdown-item nav-link" to="/staking">
                                            DAO
                                        </Link> */}
                                        <NavDropdown.Item className="p-0">
                                            <span className="drowpdown-item nav-link" activeClassName="active" onClick={() => naviagte("/about")}>
                                                Company
                                            </span>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item className="p-0">
                                            <span className="drowpdown-item nav-link" activeClassName="active" onClick={() => naviagte("/arbitrage")}>
                                                Arbitrage
                                            </span>
                                        </NavDropdown.Item>
                                        {/* <Link className="drowpdown-item nav-link" to="/staking">
                                            Partnership
                                        </Link>
                                        <Link className="drowpdown-item nav-link" to="/staking">
                                            Careers
                                        </Link>
                                        <Link className="drowpdown-item nav-link" to="/staking">
                                            Authorizations
                                        </Link>
                                        <Link className="drowpdown-item nav-link" to="/staking">
                                            Triage in Press
                                        </Link>
                                        <Link className="drowpdown-item nav-link" to="/staking">
                                            Blog
                                        </Link> */}
                                        <NavDropdown.Item className="p-0">
                                            <span className="drowpdown-item nav-link" activeClassName="active" onClick={() => naviagte("/faqs")}>
                                                FAQ
                                            </span>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item className="p-0">
                                            <span className="drowpdown-item nav-link" activeClassName="active" onClick={() => naviagte("/contact")}>
                                                Support
                                            </span>
                                        </NavDropdown.Item>
                                    </NavDropdown>


                                </li>

                            </ul>
                            {/* <NavLink className="effects nav-link" activeClassName="active" to="/wallet">Wallet</NavLink> */}
                            {/* <NavLink className="effects nav-link" activeClassName="active" to="/smart-levels">Earn Interest</NavLink> */}
                            {/* <NavLink className="effects nav-link" activeClassName="active" to="/exchange-triage">Exchange</NavLink> */}
                            {/* <NavLink className="effects nav-link" activeClassName="active" to="/staking">Staking</NavLink> */}
                            {/* <NavLink className="effects nav-link" activeClassName="active" to="/NFT">NFT</NavLink> */}
                            {/* <NavDropdown className="effects about-link" title="About us" id="basic-nav-dropdown">
                                <Link className="drowpdown-item nav-link" to="/staking">
                                    Metaverse
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/staking">
                                    DAO
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/about">
                                    Company
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/arbitrage">
                                    Arbitrage
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/staking">
                                    Partnership
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/staking">
                                    Careers
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/staking">
                                    Authorizations
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/staking">
                                    Triage in Press
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/staking">
                                    Blog
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/faqs">
                                    FAQ
                                </Link>
                                <Link className="drowpdown-item nav-link" to="/contact">
                                    Support
                                </Link>
                            </NavDropdown> */}

                            {/* <Link className="effects nav-link" to="/about-us">About us</Link> */}
                        </Nav>
                        <div className=" align-items-center about-login">
                            {
                                !props.user?.user?.accessToken ?
                                    <>
                                        {
                                            pathname !== '/sign-in' ?
                                                <Link to="/sign-in" className="sign-in">Sign in</Link>
                                                : ''
                                        }
                                        {
                                            pathname !== '/sign-up' ?
                                                <Link to={'/sign-up'} className="btn-triage-div btn-triage d-flex justify-content-center align-items-center lets-get-started" onClick={() => naviagte('/sign-up')}><span>Get Started</span></Link>
                                                // <button className=" btn-triage-div btn-triage d-flex justify-content-center align-items-center" onClick={() => naviagte('/sign-up')} ><span> Get Started </span></button>
                                                : ''
                                        }
                                    </>
                                    :
                                    <button className=" btn-triage-div btn-triage d-flex justify-content-center align-items-center" onClick={() => { props.signOut() }} ><span>Sign out</span></button>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { setUser, signOut })(Header)