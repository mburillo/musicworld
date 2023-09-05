import React from 'react';
import github from '../../assets/images/github.svg'
import linkedin from '../../assets/images/linkedin.svg'
import phone from '../../assets/images/phone.svg'
import address from '../../assets/images/address.svg'
import email from '../../assets/images/email.svg'
import './Footer.css';
const Footer = () => {
    const socials = [
        { src: linkedin, alt: 'linkedin', color: '#0082ca' },
        { src: github, alt: 'github', color: '#333333' }
    ];

    return (
        <div className="footer">
            <footer className="text-center text-lg-start text-white" style={{ backgroundColor: "#929fba" }}>
                <div className="container p-4 pb-0">
                    <section>
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">MusicWorld</h6>
                                <p>
                                    This webpage is currently in development.
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                <p><a href="https://mburillo.github.io/portfolio" className="text-white">My portfolio</a></p>
                                <p><a href="https://mburillo.github.io/coding-together" className="text-white">CodingTogether</a></p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                                <p><img src={address} alt="address" width="30" height="30" /> Madrid, Spain</p>
                                <p><img src={email} alt="email" width="30" height="30" /> mburillonavarro@gmail.com</p>
                                <p><img src={phone} alt="phone-number" width="30" height="30" /> +34 635 345 735</p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '150px' }}>
                                    {socials.map((social, index) => (
                                        <a key={index} className="btn btn-primary btn-floating m-1" style={{ ...btnCommonStyle, backgroundColor: social.color }} href="#!" role="button">
                                            <img src={social.src} alt={social.alt} style={imgStyle} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2023 Copyright: <a className="text-white" href="https://mburillo.github.io/musicworld">MusicWorld</a>
                </div>
            </footer>
        </div>
    );
}
const btnCommonStyle = {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    padding: 0,
    margin: '5px'
};

const imgStyle = {
    borderRadius: '50%',
    width: '30px',
    height: '30px'
};


export default Footer;
