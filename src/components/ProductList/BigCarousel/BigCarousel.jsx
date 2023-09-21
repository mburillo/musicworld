import Carousel from 'react-bootstrap/Carousel';
function BigCarousel({carouselData}) {

    return (
        <Carousel >
            {carouselData.map((item, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 carousel-image"
                        src={item.imageUrl}
                        alt={item.description}
                    />
                    <Carousel.Caption>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
export default BigCarousel;