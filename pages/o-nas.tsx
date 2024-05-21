import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/shopcard.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const AboutUsPage: React.FC = () => {
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
      <div className={styles.container}>
      <div className={styles.borderContainer}>
          <Image src="/about-us.svg" alt="Directions" width={112} height={112} />
          <h1>О нас</h1>
        </div>
        <div className={styles.sliderContainer}>
        <Slider {...sliderSettings} className={styles.aboutUsSlider}>
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
      <div className={styles.aboutTextContainer}>
        <p>
          Комплекс ТРЦ Лайнер – единственный объект коммерческой недвижимости межрайонного формата в Солнцево.
          Это многофункциональный торгово-развлекательный, общественно-деловой центр, который сформировал новое пространство в Солнцево и изменил инфраструктуру района. ТРЦ представлено основным зданием комплекса и корпусом ОДЦ (общественно-деловой центр).
        </p>
        <p>
          Торговый центр имеет подземную и наземную парковку, где расположены 750 машиномест.
          В главном корпусе Лайнер находится продуктовый супермаркет, кинотеатр, детский развлекательный центр, различные кафе, рестораны и фуд-корт с большим выбором различных гастрономических концепций. В ТРЦ представлены магазины fashion сегмента, все необходимые группы повседневных товаров, а также различные виды услуг.
        </p>
        <p>
          При входе через главный вход посетителям открывается атриумное пространство с колоннами, отделанными нержавеющим металлом со световыми рефлексами. Светодиодное оформление лифтовой группы создает единую композицию, пронизывающую все 3 этажа Неба.
        </p>
        <p>
          К главному корпусу ТРЦ примыкает здание ОДЦ (общественно-деловой центр).
          Здесь расположились МФЦ, фитнес-центр, ресторан и различные помещения общественно-делового назначения.
        </p>
        <p>
          ТРЦ Лайнер возведен Управляющей компанией «Столица Менеджмент» в портфеле которой более 10-ти успешных реализованных проектов коммерческой недвижимости.
        </p>

      </div>
      <a href="/public/PRАВИЛА_ПОЛЬЗОВАНИЯ_ПАРКОВКОЙ_ТЦ_ЛАЙНЕР.pdf" target="_blank" className={styles.aboutUsPdfButton}>
          ПРАВИЛА ДЛЯ ПОСЕТИТЕЛЕЙ ТРЦ «Лайнер»
        </a>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
