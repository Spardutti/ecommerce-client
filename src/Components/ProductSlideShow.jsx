import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

export const ProductSlideShow = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === props.images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const prevIndex =
      activeIndex === 0 ? props.images.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const goToIndex = (index) => {
    if (animating) return;
    setActiveIndex(index);
  };

  const slides = props.images.map((image, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => {
          setAnimating(false);
        }}
        className="text-center"
        key={index}
      >
        <img style={{ maxHeight: "300px" }} src={image.url} alt={image.name} />
        <CarouselCaption captionText="" />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={props.images}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      {slides.length > 1 ? (
        <div>
          <CarouselControl
            direction="prev"
            directionText="previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="next"
            onClickHandler={next}
          />
        </div>
      ) : null}
    </Carousel>
  );
};
