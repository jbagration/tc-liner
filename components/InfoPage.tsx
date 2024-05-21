import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import Loading from './Loading';
import Slider, { Settings } from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/shopcard.module.css';

interface InfoPageProps {
  data: any;
  loading: boolean;
  categoryTitle: string;
  pageTitle: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ data, loading, categoryTitle, pageTitle }) => {
  const sliderSettings: Settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  useEffect(() => {
    setCurrentSlide(sliderRef.current?.slickGoTo(0) || 0);
  }, []);

  return (
    <Layout>
      {data ? (
        <div className={styles.container}>
          <div className={styles.headerShopPage}>
            <div className={styles.headerShopTitle}>
              <img
                src={`https://tclainer.backend.demowts.ru/uploads/logos/${data.logo}`}
                alt={data.name}
                className={styles.logoShopPage}
              />
              <div className={styles.shopNameShopPage}>
                <span>{categoryTitle}</span>
                <h1>{data.name}</h1>
              </div>
            </div>
            <div className={styles.floorShopPage}>
              <Image src="/floors.svg" alt="Floors" width={30} height={30} />
              <div className={styles.floorTextShopPage}>
                <h2>1</h2>
                <p>этаж</p>
              </div>
            </div>
          </div>
          <div className={styles.sliderContainer}>
            <Slider {...sliderSettings} className={styles.aboutUsSlider} ref={sliderRef}>
              <div>
                <Image src="/tcliner1.jpg" alt="Slider Image 1" width={1200} height={600} />
              </div>
              <div>
                <Image src="/tcliner2.jpg" alt="Slider Image 2" width={1200} height={600} />
              </div>
            </Slider>
            <div className={styles.aboutUsBottomContainer}>
              <p className={styles.aboutUsSlideCount}>{`${currentSlide + 1} — 2`}</p>
              <div className={styles.aboutUsNavigationButtons}>
                <button
                  className={styles.prevButton}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className={styles.nextButton}
                  onClick={handleNextSlide}
                  disabled={currentSlide === 2 - 1}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.infoBlockShopPage}>
            <div className={styles.infoItemShopPage}>
              <h2>Телефоны</h2>
              <p>8 800 500 13 29</p>
            </div>
            <div className={styles.infoItemShopPage}>
              <h2>График работы</h2>
              <p>{data.working_hours}</p>
            </div>
            <div className={styles.infoItemShopPage}>
              <p>{data.website}</p>
              <p>{data.social_media_link}</p>
            </div>
          </div>
          <div className={styles.descriptionShopPage}>
            <p>{data.description}</p>
          </div>
        </div>
      ) : (
        <Loading />
      ) }
    </Layout>
  );
};

export default InfoPage;
