import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { NewsAndOffer } from '@/lib/api';
import { useRouter } from 'next/router';
import styles from '../../styles/shopcard.module.css';
import axios from 'axios';
import Loading from '@/components/Loading';

const backendUrl = 'https://tclainer.backend.demowts.ru';

const NewsAndOffersPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<NewsAndOffer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (id !== undefined) {
          const response = await axios.get(`${backendUrl}/api/news-and-offers/${id}`);
          console.log(response)
          if (response.data ) {
            setPost(response.data.data.news);
          } else {
            console.error('Post not found');
          }
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPostData();
  }, [id]);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      {post ? (
        <div className={styles.container}>
          <div className={styles.headerNewsPage}>
            <div className={styles.headerNewsTitle}>
              <div className={styles.shopNameNewsPage}>
                <h1>{post.title}</h1>
              </div>
            </div>
          </div>
          <div className={styles.descriptionNewsPage}>
            <img src={`${backendUrl}/uploads/logos/${post.photo}`} alt={`News photo`} />
            <p dangerouslySetInnerHTML={{ __html: post.description }} />
          </div>
        </div>
      ) : (
        <p>Пост не найден</p>
      )}
    </Layout>
  );
};

export default NewsAndOffersPage;
