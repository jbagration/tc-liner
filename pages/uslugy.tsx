import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/shopcard.module.css';
import { getServices, Service } from '../lib/api';
import ShopCard from '../components/ShopCard';
import FilterSection from '../components/FilterSection';

const UslugiPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(0);
  const [activeLetter, setActiveLetter] = useState<string>('все');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['все', ...Array.from(new Set(services.map(item => item.service_category_name)))];
  const alphabet = ['все', ...new Set(services.map(item => item.name[0].toLowerCase()))];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        const servicesArray = servicesData || [];
        setServices(servicesArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchServices();
  }, []);

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const handleCategoryClick = (index: number, category: string) => {
    setActiveCategory(index);
    setActiveLetter('все');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
    setActiveCategory(0);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setActiveCategory(0);
    setActiveLetter('все');
    setCurrentPage(1);
  };

  const filteredServices = services
    .filter((service) =>
      (activeCategory === null || activeCategory === 0 || service.service_category_name === categories[activeCategory])
      && (activeLetter === 'все' || service.name.toLowerCase().startsWith(activeLetter))
      && (searchTerm === '' || service.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const shouldShowPagination = filteredServices.length > itemsPerPage;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.borderContainer}>
          <Image src="/services.svg" alt="Services" width={112} height={112} />
          <h1>Услуги</h1>
        </div>

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
          containerStyle={styles.categoriesContainerServices}
        />

        <div className={styles.cardsContainer}>
          {filteredServices
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((service) => (
              <ShopCard key={service.id} shop={service} />
            ))}
        </div>

        {shouldShowPagination && (
          <div className={styles.paginationContainer}>
            {[...Array(Math.ceil(filteredServices.length / itemsPerPage))].map((_, index) => (
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

export default UslugiPage;
