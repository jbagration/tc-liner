import React, { useState, useEffect, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { useRouter } from 'next/router';
import { useWindowSize } from 'react-use';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/homeSections.module.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { getShops, Shop } from '../lib/api';
import Loading from './Loading';
import Link from 'next/link';
import { truncate } from 'lodash';
import { transliterate } from 'transliteration';

const formatNameForURL = (name: string): string => {
  const transliteratedName = transliterate(name)
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/!/g, ''); 
  return transliteratedName;
};

const StoresSection: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Shop[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<Slider>(null);
  const router = useRouter();
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newsData = await getShops();
        setAllPosts(newsData || []);
        setCurrentSlide(0);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (width >= 960) {
        setSlidesToShow(3);
      } else if (width >= 540) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  const handlePostClick = (shopName: string) => {
    const formattedShopName = formatNameForURL(shopName);
    router.push(`/magaziny/${encodeURIComponent(formattedShopName)}`);
  };
  
  const settings: Settings = {
    dots: false,
    infinite: allPosts.length > slidesToShow, 
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const navigateToAllShops = () => {
    router.push('/magaziny');
  };

  const slideCountText =
    width >= 960
      ? `${currentSlide + 1} — ${allPosts.length}`
      : width >= 540
      ? `${currentSlide + 1} — ${allPosts.length}`
      : `${currentSlide + 1} — ${allPosts.length}`;

      return (
        <div className={styles.newsContainer}>
          <div className={styles.titleContainer}>
            <h2>Магазины</h2>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={styles.sliderContainer}>
              <Slider {...settings} ref={sliderRef}>
                {allPosts.map((post, index) => (

<Link
  key={index}
  href="/magaziny/[name]"
  as={`/magaziny/${encodeURIComponent(formatNameForURL(post.name))}`} // Примените форматирование названия
>
  <div
    className={styles.circle}
    onClick={() => handlePostClick(post.name)}
  >
    <img src={`https://tclainer.backend.demowts.ru/uploads/logos/${post.logo}`} alt={`News photo`} />
    <div className={styles.postContent}>
      <span>{post.shop_category_name}</span>
      <h3>{post.name}</h3>
      <p dangerouslySetInnerHTML={{ __html: truncate(post.description, { length: 100 }) }} />
    </div>
  </div>
</Link>
                ))}
              </Slider>
        </div>
      )}
      <div className={styles.bottomContainer}>
        {slideCountText && (
          <p className={styles.slideCount}>
            {allPosts.length > slidesToShow ? slideCountText : `1-${allPosts.length}`}
          </p>
        )}
        <button className={styles.moreButton} onClick={navigateToAllShops}>
          Все бренды
        </button>
        <div className={styles.navigationButtons}>
          <button
            className={styles.prevButton}
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={currentSlide === 0 || allPosts.length <= slidesToShow}
          >
            <FaArrowLeft />
          </button>
          <button
            className={styles.nextButton}
            onClick={() => sliderRef.current?.slickNext()}
            disabled={
              currentSlide === allPosts.length - settings.slidesToShow! || allPosts.length <= slidesToShow
            }
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};


export default StoresSection;
