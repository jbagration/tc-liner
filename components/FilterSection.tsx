import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/shopcard.module.css';

interface FilterSectionProps {
  categories: string[];
  alphabet: string[];
  activeCategory: number | null;
  activeLetter: string | null | undefined;
  windowWidth: number;
  onCategoryClick: (index: number, category: string) => void;
  onLetterClick: (letter: string) => void;
  onSearch: (term: string) => void;
  searchTerm: string;
  containerStyle: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  alphabet,
  activeCategory,
  activeLetter,
  windowWidth,
  onCategoryClick,
  onLetterClick,
  onSearch,
  searchTerm,
  containerStyle,
}) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showCategories, setShowCategories] = useState<boolean>(true);
    const [showAlphabet, setShowAlphabet] = useState<boolean>(false);
  
    const toggleInput = () => {
      setShowInput(!showInput);
      setShowCategories(false);
      setShowAlphabet(false);
    };
  
    const toggleCategories = () => {
      setShowCategories(!showCategories);
      setShowInput(false);
      setShowAlphabet(false);
    };
  
    const toggleAlphabet = () => {
      setShowAlphabet(!showAlphabet);
      setShowInput(false);
      setShowCategories(false);
    };
  

    return (
        <div className={styles.filterContainer}>
          <div className={`${styles.buttonsContainer} ${containerStyle}`}>
            <button onClick={toggleCategories} className={showCategories ? styles.active : ''}>
              <div className={styles.roundImageContainer}>
                <Image src="/category.svg" alt="Search" width={30} height={30} />
              </div>
              По категориям
            </button>
            <button onClick={toggleAlphabet} className={showAlphabet ? styles.active : ''}>
              <div className={styles.roundImageContainer}>
                <Image src="/abc.svg" alt="Search" width={30} height={30} />
              </div>
              По алфавиту
            </button>
            <button onClick={toggleInput} className={showInput ? styles.active : ''}>
              <div className={styles.roundImageContainer}>
                <Image src="/loop.svg" alt="Search" width={30} height={30} />
              </div>
              Поиск
            </button>
          </div>
    
      {showCategories && (
        <div className={`${styles.categoriesContainer} ${containerStyle}`}>
          {windowWidth >= 820 ? (
            categories.map((category, index) => (
              <button
                key={category}
                onClick={() => onCategoryClick(index, category)}
                className={index === activeCategory ? styles.active : ''}
              >
                {category}
              </button>
            ))
          ) : (
            <select
              onChange={(e) => {
                onCategoryClick(Number(e.target.value), categories[Number(e.target.value)]);
              }}
              value={activeCategory || ''}
            >
              {categories.map((category, index) => (
                <option key={category} value={index}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {showAlphabet && (
        <div className={`${styles.alphabetContainer} ${containerStyle}`}>
          {windowWidth >= 820 ? (
            alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => onLetterClick(letter)}
                className={letter === activeLetter ? styles.active : ''}
              >
                {letter}
              </button>
            ))
          ) : (
            <select
              onChange={(e) => {
                onLetterClick(e.target.value);
              }}
              value={activeLetter || ''}
            >
              {alphabet.map((letter) => (
                <option key={letter} value={letter} selected={letter === activeLetter}>
                  {letter}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {showInput && (
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Поиск"
            className={`${styles.filterInput} ${containerStyle}`}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default FilterSection;
