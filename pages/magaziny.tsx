import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/shopcard.module.css';
import { getShops, Shop } from '../lib/api';
import ShopCard from '../components/ShopCard';
import FilterSection from '../components/FilterSection';
import { slugify } from 'transliteration';

const MagazinyPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(0);
  const [activeLetter, setActiveLetter] = useState<string | null>('все');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['все', ...Array.from(new Set(shops.map(item => item.shop_category_name)))];
  const alphabet = ['все', ...new Set(shops.map(item => item.name[0].toLowerCase()))];

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopsData = await getShops();
        const shopsArray = shopsData || [];
        setShops(shopsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchShops();
  }, []);

  const handleCategoryClick = (index: number, category: string) => {
    setActiveCategory(index);
    setActiveLetter('все');
    setCurrentPage(1);
  };

  const handleLetterClick = (letter: string | null) => {
    setActiveLetter(letter);
    setActiveCategory(0);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setActiveCategory(0);
    setActiveLetter('все');
    setCurrentPage(1);
  };

  const filteredShops = shops
    .filter((shop) =>
      (activeCategory === null || activeCategory === 0 || shop.shop_category_name === categories[activeCategory])
      && (activeLetter === 'все' || (activeLetter !== null && slugify(shop.name).startsWith(activeLetter)))
      && (searchTerm === '' || slugify(shop.name).includes(slugify(searchTerm)))
    );


  const itemsPerPage = 6;
  const shouldShowPagination = filteredShops.length > itemsPerPage;
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.borderContainer}>
          <Image src="/shop.svg" alt="shop" width={112} height={112} />
          <h1>Магазины</h1>
        </div>

        <div className={styles.filterContainer}>
          <FilterSection
            categories={categories}
            alphabet={alphabet}
            activeCategory={activeCategory}
            activeLetter={activeLetter}
            windowWidth={windowWidth}
            onCategoryClick={handleCategoryClick}
            onLetterClick={handleLetterClick}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            containerStyle={styles.categoriesContainerShop}
          />
        </div>

        <div className={styles.cardsContainer}>
          {filteredShops
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
        </div>

        {shouldShowPagination && (
          <div className={styles.paginationContainer}>
            {[...Array(Math.ceil(filteredShops.length / itemsPerPage))].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`${styles.pageNumberButton} ${
                  currentPage === index + 1 ? styles.activePageNumber : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MagazinyPage;
