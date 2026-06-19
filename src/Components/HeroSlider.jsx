'use client'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const slides = [
  {
    id: 1,
    image:
      '/assets/img-3.jpg',
    badge: 'Learn From Real Experiences',
    title: 'Every Life Lesson Matters',
    highlight: 'Matters',
    description:
      'Discover valuable lessons shared by people around the world. Learn from successes, failures, and real-life experiences.',
    primaryBtn: {
      text: 'Explore Lessons',
      href: '/public-lessons',
    },
    secondaryBtn: {
      text: 'Join Now',
      href: '/register',
    },
  },
  {
    id: 2,
    image:
      '/assets/img-1.avif',
    badge: 'Share Your Wisdom',
    title: 'Turn Experience Into Knowledge',
    highlight: 'Knowledge',
    description:
      'Share lessons you have learned through life and help others avoid mistakes and discover better paths.',
    primaryBtn: {
      text: 'All Lessons',
      href: '/alllesson',
    },
  },
  {
    id: 3,
    image:
      '/assets/img-2.jpg',
    badge: 'Grow Together',
    title: 'Build Your Personal Atlas',
    highlight: 'Atlas',
    description:
      'Save important lessons, revisit them anytime, and create your own collection of life-changing insights.',
    primaryBtn: {
      text: 'Upgrade Plan',
      href: '/pricing',
    },
  },
]

const HeroSlider = () => {
  return (
    <section className=" mx-auto px-4 py-8">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="rounded-3xl overflow-hidden border border-[#223753] border-t-0"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero min-h-[550px] md:min-h-[650px]"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              {/* Overlay */}
              <div className="hero-overlay bg-[#081221]/75"></div>

              {/* Content */}
              <div className="hero-content text-left justify-start w-full">

                <div className="max-w-3xl">

                  <div className="badge bg-[#2563EB] border-none text-white mb-5">
                    {slide.badge}
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F8FAFC] leading-tight">
                    {slide.title.split(slide.highlight)[0]}
                    <span className="text-[#3B82F6]">
                      {slide.highlight}
                    </span>
                  </h1>

                  <p className="mt-6 text-lg md:text-xl text-[#B8C4D6] max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-8">

                    <Link
                      href={slide.primaryBtn.href}
                      className="btn bg-[#2563EB] hover:bg-[#3B82F6] border-none text-white rounded-xl"
                    >
                      {slide.primaryBtn.text}
                    </Link>

                    {slide.secondaryBtn && (
                      <Link
                        href={slide.secondaryBtn.href}
                        className="btn btn-outline border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white rounded-xl"
                      >
                        {slide.secondaryBtn.text}
                      </Link>
                    )}

                  </div>

                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  )
}

export default HeroSlider