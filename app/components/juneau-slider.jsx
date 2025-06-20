"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

const destinations = [
  {
    name: "Japan Deals",
    image:
      "https://images.unsplash.com/photo-1549517771-aa105e8da34f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Japanese torii gate with Mount Fuji",
  },
  {
    name: "Asia Deals",
    image:
      "https://plus.unsplash.com/premium_photo-1664303342182-727fe49985d3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Terraced rice fields in Asia",
  },
  {
    name: "Greece Deals",
    image:
      "https://images.unsplash.com/flagged/photo-1496517125700-5d0675f681f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "White buildings by the Mediterranean sea",
  },
  {
    name: "Peru Deals",
    image:
      "https://images.unsplash.com/photo-1517094629229-f5e0c2f88440?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "People in traditional Peruvian dress",
  },
  {
    name: "South Korea Deals",
    image:
      "https://images.unsplash.com/photo-1548181449-abc0791d2354?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Autumn scenery in South Korea",
  },
  {
    name: "Thailand Deals",
    image:
      "https://images.unsplash.com/photo-1544143779-6afcefd7ac46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Thai temples and landscapes",
  },
  {
    name: "Italy Deals",
    image:
      "https://images.unsplash.com/photo-1575363021120-2af7c0379aca?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Italian countryside and architecture",
  },
];

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Discover Amazing Destinations",
    subtitle: "Find your perfect getaway with our curated selection",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Unforgettable Travel Experiences",
    subtitle: "Create memories that will last a lifetime",
  },
  {
    title: "Thailand Deals",
    image:
      "https://images.unsplash.com/photo-1544143779-6afcefd7ac46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "Thai temples and landscapes",
  },
];

export default function Component() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef(null);
  const heroSliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-rotate slides
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [currentHeroSlide]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentHeroSlide) return;

    setIsTransitioning(true);
    setCurrentHeroSlide(index);

    // Reset interval when manually changing slides
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000);
  };

  const goToNextSlide = () => {
    goToSlide((currentHeroSlide + 1) % heroSlides.length);
  };

  const goToPrevSlide = () => {
    goToSlide((currentHeroSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  // Handle transition end
  useEffect(() => {
    if (heroSliderRef.current) {
      const handleTransitionEnd = () => {
        setIsTransitioning(false);
      };

      heroSliderRef.current.addEventListener(
        "transitionend",
        handleTransitionEnd
      );
      return () => {
        heroSliderRef.current?.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );
      };
    }
  }, []);

  const scrollCards = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 288;
      const scrollAmount = cardWidth + 24;

      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="min-h-[73vh]">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Slider Container */}
        <div
          ref={heroSliderRef}
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${heroSlides.length * 100}%`,
            transform: `translateX(-${
              currentHeroSlide * (100 / heroSlides.length)
            }%)`,
          }}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative"
              style={{
                width: `${100 / heroSlides.length}%`,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Hero Content */}
              <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-12 lg:px-20">
                <div className="max-w-2xl backdrop-blur-sm md:backdrop-filter-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Navbar />

        {/* Hero Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md disabled:opacity-50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Previous slide</span>
        </button>
        <button
          onClick={goToNextSlide}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md disabled:opacity-50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next slide</span>
        </button>

        {/* Hero Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentHeroSlide ? "bg-white" : "bg-white/50"
              } ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Destination Cards Section 
      <div className="px-6 md:px-12 lg:px-20 py-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 md:w-72 bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer rounded-lg border border-gray-200"
            >
              <div className="p-4">
                <div className="relative h-40 md:h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">{destination.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>*/}
    </div>
  );
}
