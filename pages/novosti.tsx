import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/shopcard.module.css';
import { useRouter } from 'next/router';
import { getNewsAndOffers, NewsAndOffer, getNewsAndOfferById, NewsAndOfferId } from '../lib/api';

interface NewsPageProps {
  posts: NewsAndOffer[];
}

const NewsPage: React.FC<NewsPageProps> = ({ posts }) => {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  const uniqueCategories = Array.from(new Set(posts.map(post => post.news_and_offers_category_name.toLowerCase())));

  const handleFilter = (category: string) => {
    setFilter(category);
    setCurrentPage(1);
  };

  const handlePostClick = async (postId: string) => {
    try {
      const post: NewsAndOfferId = await getNewsAndOfferById(postId);
      router.push(`/novosti/${postId}`); // Переход на страницу новости с соответствующим id
  
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.news_and_offers_category_name.toLowerCase() === filter);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const removeHtmlTags = (html: string | null) => {
    if (!html) return ''; 
    return html.replace(/<[^>]*>/g, '');
  };
  
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.borderContainer}>
          <Image src="/news.svg" alt="news" width={112} height={112} />
          <h1>Новости</h1>
        </div>
        <div className={styles.categoriesContainerNews}>
          <button
            className={filter === 'all' ? styles.active : ''}
            onClick={() => handleFilter('all')}
          >
            Все
          </button>
          {uniqueCategories.map(category => (
            <button
              key={category}
              className={filter === category ? styles.active : ''}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.cardsContainerNews}>
          {filteredPosts
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((post, index) => (
              <div
                key={index}
                className={styles.circle}
                onClick={() => handlePostClick(post.id.toString())}
              >
                <img src={`https://tclainer.backend.demowts.ru/uploads/logos/${post.photo}`} alt={`Post ${index + 1}`} />
                <div className={styles.postContent}>
                  <span>{post.news_and_offers_category_name}</span>
                  <h3>{post.title}</h3>
                  <p>{removeHtmlTags(post.shortDescription)}</p>
                </div>
              </div>
            ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await getNewsAndOffers();
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error fetching:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default NewsPage;
