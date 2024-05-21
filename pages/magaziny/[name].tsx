import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Shop } from '@/lib/api';
import InfoPage from '../../components/InfoPage';
import { transliterate } from 'transliteration';

const backendUrl = 'https://tclainer.backend.demowts.ru/api';

const ShopPage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const url = `${backendUrl}/shops`;
        const response = await axios.get(url);
        if (response.data && response.data.data && response.data.data.shops) {
          const selectedShop = response.data.data.shops.data.find((s: Shop) => {
            const trimmedName = s.name.trim(); 
            const transliteratedName = transliterate(trimmedName.toLowerCase()).replace(/\s/g, '-');
            return transliteratedName === name;
          });

          if (selectedShop) {
            setShop(selectedShop);
          } else {
            console.error('Shop not found');
          }
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchShopData();
    }
  }, [name]);

  return (
    <InfoPage
      data={shop}
      loading={loading}
      categoryTitle={shop?.shop_category_name || ''}
      pageTitle={shop?.name || ''}
    />
  );
};

export default ShopPage;
