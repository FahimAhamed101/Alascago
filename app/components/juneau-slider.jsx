"use client"

import { useState, useRef } from "react"
import Navbar from "../components/Navbar/Navbar"

const destinations = [
  {
    name: "Japan Deals",
    image: "https://images.unsplash.com/photo-1549517771-aa105e8da34f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Japanese torii gate with Mount Fuji",
  },
  {
    name: "Asia Deals",
    image: "https://plus.unsplash.com/premium_photo-1664303342182-727fe49985d3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Terraced rice fields in Asia",
  },
  {
    name: "Greece Deals",
    image: "https://images.unsplash.com/flagged/photo-1496517125700-5d0675f681f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "White buildings by the Mediterranean sea",
  },
  {
    name: "Peru Deals",
    image: "https://images.unsplash.com/photo-1517094629229-f5e0c2f88440?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "People in traditional Peruvian dress",
  },
  {
    name: "South Korea Deals",
    image: "https://images.unsplash.com/photo-1548181449-abc0791d2354?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Autumn scenery in South Korea",
  },
  {
    name: "Thailand Deals",
    image: "https://images.unsplash.com/photo-1544143779-6afcefd7ac46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Thai temples and landscapes",
  },
  {
    name: "Italy Deals",
    image: "https://images.unsplash.com/photo-1575363021120-2af7c0379aca?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Italian countryside and architecture",
  },
]

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef(null)
  const totalSlides = 3

  const scrollCards = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 288 // 72 * 4 (w-72 = 18rem = 288px) + gap
      const scrollAmount = cardWidth + 24 // card width + gap

      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        })
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <div className="min-h-screen ">
       
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549517771-aa105e8da34f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        > <Navbar/>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative  z-10 flex flex-col justify-center items-start h-full px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl backdrop-blur-sm md:backdrop-filter-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Book the Best Tours & River Cruises
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">Choose from thousands of Organized Adventures</p>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex space-x-2 z-10">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Now control destination cards */}
        <div className="absolute right-6 md:right-12 backdrop-blur-sm bg-white/30 w-30 h-40 lg:right-30 top-[100%] pt-5 rounded-md -translate-y-1/2 flex flex-cols-12 gap-5 justify-center align-middle space-y-2 z-10">
          <button
            onClick={() => scrollCards("left")}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Scroll cards left</span>
          </button>
          <button
            onClick={() => scrollCards("right")}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="sr-only">Scroll cards right</span>
          </button>
        </div>
      </div>

      {/* Destination Cards */}
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

        {/* Hide scrollbar with CSS */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  )
}
