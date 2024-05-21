import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/shopcard.module.css';
import { getFood, Food } from '../lib/api';
import ShopCard from '../components/ShopCard';
import FilterSection from '../components/FilterSection';

const EdaPage: React.FC = () => {
  const [food, setFood] = useState<Food[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(0);
  const [activeLetter, setActiveLetter] = useState<string | undefined>('все');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const itemsPerPage = 6;

  const categories = ['все', ...Array.from(new Set(food.map(item => item.food_category_name)))];
  const alphabet = ['все', ...new Set(food.map(item => item.name[0].toLowerCase()))];

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const foodData = await getFood();
        const foodArray = foodData || [];
        setFood(foodArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchFood();
  }, []);

  const handleCategoryClick = (index: number, category: string) => {
    setActiveCategory(index);
    setActiveLetter('все');
    setFilter(category === 'все' ? 'all' : category);
    setSearchTerm('');
    setCurrentPage(1);
  };
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilter('all');
    setCurrentPage(1);
  };
  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter === 'все' ? undefined : letter.toLowerCase());
    setActiveCategory(null);
    setCurrentPage(1);
  };
  
  const filteredFood = food
  .filter(item =>
    (filter === 'all' || item.food_category_name === filter)
    && ((activeLetter === undefined) || (activeLetter === 'все') || item.name.toLowerCase().startsWith(activeLetter.toLowerCase()))
    && (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const shouldShowPagination = filteredFood.length > itemsPerPage;
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
          <Image src="/food.svg" alt="food" width={112} height={112} />
          <h1>Еда</h1>
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
            containerStyle={styles.categoriesContainerFood}
          />
        </div>


        <div className={styles.cardsContainer}>
          {filteredFood
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map(restaurant => (
              <ShopCard key={restaurant.id} shop={restaurant} />
            ))}
        </div>

        {shouldShowPagination && (
          <div className={styles.paginationContainer}>
            {[...Array(Math.ceil(filteredFood.length / itemsPerPage))].map((_, index) => (
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

export default EdaPage;
