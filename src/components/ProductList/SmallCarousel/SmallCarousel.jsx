import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
const SmallCarousel = ({ items }) => {
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += 5) {
    chunkedItems.push(items.slice(i, i + 5));
  }

  return (
    <Carousel>
      {chunkedItems.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex custom-carousel-container">
            {chunk.map((item, i) => (
              <Card className='custom-carousel-card' key={i} style={{ width: '18rem' }}>
                  <Link to={`/product/${chunk.id}`} style={{ display: 'block', textAlign: 'center' }}>
                <Card.Img variant="top" src={item.imageUrl[0]} className="custom-card-img" />
                </Link>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SmallCarousel;
