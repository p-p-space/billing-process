'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
//Interal app
import screen1 from '%/images/screen1.svg';
import screen2 from '%/images/screen2.svg';

export default function Slider() {
  const t = useTranslations('carousel');

  const timer = useRef<NodeJS.Timeout>();

  const slideContainer = useRef<HTMLDivElement>();

  const paginationContainer = useRef<HTMLDivElement>();

  const componentLoaded = useRef<boolean>(false);

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slideInfo = [
    {
      title: t('adapt-title'),
      description: t('adapt-content'),
      image: screen1,
    },
    {
      title: t('scale-title'),
      description: t('scale-content'),
      image: screen2,
    },
  ];

  const changeSlide = useCallback(
    (page: number) => {
      clearTimeout(timer.current);
      if (currentSlide + page > 1) {
        setCurrentSlide(0);
        return;
      }
      if (currentSlide + page < 0) {
        setCurrentSlide(1);
        return;
      }
      setCurrentSlide((state) => state + page);
    },
    [currentSlide]
  );

  useEffect(() => {
    if (!componentLoaded.current) {
      componentLoaded.current = true;
      return;
    }
    timer.current = setTimeout(() => {
      changeSlide(+1);
    }, 10000);
  }, [currentSlide, changeSlide]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box ref={slideContainer}>
        {slideInfo.map((slide, index) => (
          <Box
            key={slide.title}
            sx={{
              display: currentSlide === index ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 750,
            }}
            className="fade-in"
          >
            <Image src={slide.image} alt={`Picture of the autor`} style={{ width: 'auto', height: 'auto' }} />
            <Typography variant="h2" sx={{ py: 4, fontWeight: 500 }}>
              {slide.title}
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: '36px', letterSpacing: '0.48px', minHeight: 140, textAlign: 'center' }}
            >
              {slide.description}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '64px' }}>
        <IconButton
          onClick={() => changeSlide(-1)}
          sx={{ background: 'white', border: '1px solid #D9D9D9' }}
          color="primary"
        >
          <i className="ri-arrow-left-line"></i>
        </IconButton>
        <Box ref={paginationContainer} sx={{ display: 'flex', flexDirection: 'row', gap: 3 / 2, alignItems: 'center' }}>
          {slideInfo.map((slide, index) => (
            <Divider
              key={slide.title}
              sx={{
                height: 8,
                width: 64,
                borderRadius: '4px',
                background: '#D9D9D9',
                border: 'none',
              }}
              className={currentSlide == index ? 'color-change-2x' : ''}
            />
          ))}
        </Box>
        <IconButton
          onClick={() => changeSlide(+1)}
          sx={{ background: 'white', border: '1px solid #D9D9D9' }}
          color="primary"
        >
          <i className="ri-arrow-right-line"></i>
        </IconButton>
      </Box>
    </Box>
  );
}
