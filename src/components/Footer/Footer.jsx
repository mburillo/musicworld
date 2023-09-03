import React from 'react';
import facebook from '../../assets/images/facebook.svg'
import twitter from '../../assets/images/twitter.svg'
import github from '../../assets/images/github.svg'
import linkedin from '../../assets/images/linkedin.svg'
import './Footer.css';
const Footer = () => {
    const socials = [
        { src: facebook, alt: 'facebook', color: '#3b5998' },
        { src: twitter, alt: 'twitter', color: '#55acee' },
        { src: twitter, alt: 'google', color: '#dd4b39' },  // NOTA: Asegúrate de usar el ícono correcto aquí.
        { src: twitter, alt: 'instagram', color: '#ac2bac' }, // NOTA: Asegúrate de usar el ícono correcto aquí.
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
                                    Here you can use rows and columns to organize your footer content.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                <p><a className="text-white">MDBootstrap</a></p>
                                <p><a className="text-white">MDWordPress</a></p>
                                <p><a className="text-white">BrandFlow</a></p>
                                <p><a className="text-white">Bootstrap Angular</a></p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                                <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
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
                    © 2023 Copyright: <a className="text-white" href="https://musicworld.com/">MusicWorld</a>
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
