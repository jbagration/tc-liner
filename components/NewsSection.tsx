import React, { useState, useEffect, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { useRouter } from 'next/router';
import { useWindowSize } from 'react-use';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/homeSections.module.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { getNewsAndOffers, NewsAndOffer } from '../lib/api';
import Loading from './Loading';
import { truncate } from 'lodash';
import { getNewsAndOfferById, NewsAndOfferId } from '../lib/api'; 

const NewsSection: React.FC = () => {
  const [allPosts, setAllPosts] = useState<NewsAndOffer[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filter, setFilter] = useState('новости');
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<Slider>(null);
  const router = useRouter();
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newsData = await getNewsAndOffers();
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

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handlePostClick = async (postId: string) => {
    try {
      const post: NewsAndOfferId = await getNewsAndOfferById(postId);
      router.push(`/novosti/${postId}`); 
  
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };
  
  const uniqueCategories = Array.from(new Set(allPosts.map(post => (post.news_and_offers_category_name || '').toLowerCase()))).filter(category => category === 'предложения' || category === 'новости');

  const filteredPosts = filter === 'all' ? allPosts : allPosts.filter(post => (post.news_and_offers_category_name || '').toLowerCase() === filter);

  const settings: Settings = {
    dots: false,
    infinite: filteredPosts.length > slidesToShow, 
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const navigateToAllNews = () => {
    router.push('/novosti');
  };

  const slideCountText =
    width >= 960
      ? `${currentSlide + 1} — ${filteredPosts.length}`
      : width >= 540
      ? `${currentSlide + 1} — ${filteredPosts.length}`
      : `${currentSlide + 1} — ${filteredPosts.length}`;

      return (
        <div className={styles.newsContainer}>
          <div className={styles.titleContainer}>
            <h2>Акции и новости</h2>
            <div className={styles.filterButtons}>
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  className={filter === category ? styles.activeFilter : ''}
                  onClick={() => handleFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={styles.sliderContainer}>
              <Slider {...settings} ref={sliderRef}>
{filteredPosts.map((post, index) => (
  <div
    key={index}
    className={styles.circle}
    onClick={() => handlePostClick(post.id.toString())}
  >
    <img src={`https://tclainer.backend.demowts.ru/uploads/logos/${post.photo}`} alt={`News photo`} />
    <div className={styles.postContent}>
      <span>{post.news_and_offers_category_name}</span>
      <h3>{post.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: truncate(post.description, { length: 100 }) }} />
    </div>
  </div>
))}

              </Slider>
            </div>
          )}
          <div className={styles.bottomContainer}>
            {slideCountText && (
              <p className={styles.slideCount}>
                {filteredPosts.length > slidesToShow ? slideCountText : `1-${filteredPosts.length}`}
              </p>
            )}
            <button className={styles.moreButton} onClick={navigateToAllNews}>
              Все новости
            </button>
            <div className={styles.navigationButtons}>
              <button
                className={styles.prevButton}
                onClick={() => sliderRef.current?.slickPrev()}
                disabled={currentSlide === 0 || filteredPosts.length <= slidesToShow}
              >
                <FaArrowLeft />
              </button>
              <button
                className={styles.nextButton}
                onClick={() => sliderRef.current?.slickNext()}
                disabled={
                  currentSlide === filteredPosts.length - settings.slidesToShow! || filteredPosts.length <= slidesToShow
                }
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
  );
};

export default NewsSection;
