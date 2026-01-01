'use client';

import { Box, IconButton } from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const swiperStyles = `
  /* VISIBILITY: Allow slides to be seen on the left/right */
  .swiper {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 40px;
    overflow: visible !important;
  }

  .swiper-wrapper {
    align-items: center;
  }

  /* BASE CARD STYLE */
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 340px;
    height: auto;
    transition: all 0.5s ease-out;
    opacity: 0;
    visibility: hidden;
  }

  /* VISIBLE SLIDES (Active, Previous, Next) */
  .swiper-slide-active,
  .swiper-slide-prev,
  .swiper-slide-next {
    opacity: 1;
    visibility: visible;
  }

  /* CENTER CARD (Active) - Fully Opaque & Popped */
  .swiper-slide-active {
    transform: scale(1.05) !important;
    z-index: 20;
    filter: brightness(1);
    opacity: 1;
  }

  /* SIDE CARDS - Transparent & Darker */
  .swiper-slide-prev,
  .swiper-slide-next {
    transform: scale(0.9) translateY(10px) !important;
    z-index: 10;
    opacity: 0.8;
    filter: none;
  }

  /* HIDE DISABLED BUTTONS (Start/End of list) */
  .swiper-button-disabled {
    opacity: 0.3 !important;
    cursor: not-allowed;
  }
`;

interface AutoCarouselProps {
  children: ReactNode[];
}

export function AutoCarousel({ children }: AutoCarouselProps) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // If only 1 item, just show it statically
  if (!children || children.length === 0) return null;
  if (children.length === 1) {
    return (
      <Box display="flex" justifyContent="center" py="40px">
        <Box maxW={{ base: '92vw', md: '520px', xl: '640px' }} w="100%">
          {children[0]}
        </Box>
      </Box>
    );
  }

  return (
    <Box position="relative" w="full" maxW="100%" mx="auto">
      <style>{swiperStyles}</style>

      {/* --- NAVIGATION BUTTONS --- */}
      <IconButton
        aria-label="Previous"
        ref={prevRef}
        icon={<FaChevronLeft />}
        position="absolute"
        left={{ base: '0px', md: '8%' }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={40}
        colorScheme="purple"
        variant="solid"
        isRound
        size="lg"
        boxShadow="xl"
        opacity={0.9}
        className="custom-swiper-button-prev"
      />

      <IconButton
        aria-label="Next"
        ref={nextRef}
        icon={<FaChevronRight />}
        position="absolute"
        right={{ base: '0px', md: '8%' }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={40}
        colorScheme="purple"
        variant="solid"
        isRound
        size="lg"
        boxShadow="xl"
        opacity={0.9}
        className="custom-swiper-button-next"
      />

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={false} // Disable Infinite Scroll
        autoplay={false} // Disable Auto Scroll
        speed={500}
        initialSlide={0} // Start at the first item
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        modules={[EffectCoverflow, Navigation]} // Removed Autoplay module
        className="mySwiper"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
