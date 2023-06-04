import React, { useState, useEffect } from 'react'

const CarouselBackground = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => {
      clearInterval(timer)
    }
  }, [images, interval])

  return (
    <div className='carousel-background'>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Carousel Image ${index + 1}`}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  )
}

export default CarouselBackground
