import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image'; 
import NewsSection from '@/components/NewsSection';
import StoresSection from '@/components/StoresSection';
import Layout from '../components/Layout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/home.module.css';
import { getShops, Shop } from '../lib/api';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const [shops, setShops] = useState<Shop[]>([]);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (index: number) => setCurrentSlide(index),
  };

  const handleCircleClick = (index: number) => {
    setCurrentSlide(index);

    if (index === 0) {
      sliderRef.current?.slickPrev();
    } else if (index === 1) {
      sliderRef.current?.slickNext();
    }
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopData = await getShops();
        const shopsArray = shopData || [];
        setShops(shopsArray);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchShops();
  }, []);

  return (
    <Layout>
      <div className={styles.sliderContainer}>
        <Slider ref={sliderRef} {...sliderSettings}>
          <div className={`${styles.textContainer} ${styles.imageContainer}`}>
            <div className={styles.slideFade}></div>
            <h2 className={styles.title}>Летний ресторан</h2>
            <p className={styles.paragraph}>
              Летний ресторан на балконе ТЦ Лайнер, приглашает всех желающих провести отличное время на открытом воздухе.
            </p>
            <button className={styles.sliderButton}>Забронировать ⇨</button>
          </div>
          <div className={`${styles.textContainer2} ${styles.imageContainer}`}>
            <div className={styles.slideFade}></div>
            <h2 className={styles.title}>Открытие ТЦ Лайнер</h2>
            <p className={styles.paragraph}>
              1 Июня состоялось торжественное открытие полноформатного торгового центра Лайнер
            </p>
            <button className={styles.sliderButton}>Забронировать ⇨</button>
          </div>
        </Slider>

        <div className={styles.slideIndicators}>
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className={`${styles.slideIndicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => handleCircleClick(index)}
            />
          ))}
        </div>

        <div className={styles.circleContainer}>
          {[...Array(2)].map((_, index) => (
            <div key={index} className={styles.circle} onClick={() => handleCircleClick(index)}>
              <div className={`${styles.arrow} ${index === currentSlide ? styles.active : ''}`}>
                {index === 0 ? <Image src="/arrow-left.svg" alt="arrow" width={20} height={20} /> : <Image src="/arrow-right.svg" alt="arrow" width={20} height={20} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewsSection />
      <StoresSection />
    </Layout>
  );
};

export default HomePage;
