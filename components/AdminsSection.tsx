import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/homeSections.module.css';
import { Administrator } from '../lib/api';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AdminCard from './AdminCard';

const MOBILE_WIDTH = 472;
const TABLET_WIDTH = 960;
const EMAIL_COPY_NOTIFICATION_TIMEOUT = 2000;

const AdminsSection: React.FC<{ admins: Administrator[] }> = ({ admins }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const calculateSlidesToShow = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= TABLET_WIDTH) {
        setSlidesToShow(3);
      } else if (windowWidth >= MOBILE_WIDTH) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    const handleResize = () => {
      calculateSlidesToShow();
    };

    calculateSlidesToShow();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [admins.length]);

  const sliderSettings: Settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const handleEmailClick = useCallback((email: string) => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, EMAIL_COPY_NOTIFICATION_TIMEOUT);
  }, []);

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className={styles.newsContainer}>
      {admins.length > 0 && (
        <Slider {...sliderSettings} ref={sliderRef} className={styles.adminContainer}>
          {admins.map((admin) => (
            <AdminCard key={admin.id} admin={admin} onEmailClick={handleEmailClick} />
          ))}
        </Slider>
      )}
      <div className={styles.bottomContainer}>
        <p className={styles.slideCount}>{`${currentSlide + 1} — ${admins.length}`}</p>

        <div className={styles.navigationButtons}>
          <button
            className={styles.prevButton}
            onClick={handlePrevClick}
            disabled={currentSlide === 0}
          >
            <FaArrowLeft />
          </button>
          <button
            className={styles.nextButton}
            onClick={handleNextClick}
            disabled={currentSlide === admins.length - slidesToShow}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className={`${styles.notification} ${isCopied && styles.show}`}>E-mail скопирован</div>
    </div>
  );
};

export default AdminsSection;
