import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Food } from '@/lib/api';
import InfoPage from '../../components/InfoPage';
import { transliterate } from 'transliteration';

const backendUrl = 'https://tclainer.backend.demowts.ru/api';

const FoodPage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const [foods, setFoods] = useState<Food | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const url = `${backendUrl}/food`;
        const response = await axios.get(url);
        if (response.data && response.data.data && response.data.data.foods) {
          const selectedFood = response.data.data.foods.data.find(
            (f: Food) => {
              const trimmedName = f.name.trim(); 
              const transliteratedName = transliterate(trimmedName.toLowerCase()).replace(/\s/g, '-');
              return transliteratedName === name;
            }
          );

          if (selectedFood) {
            setFoods(selectedFood);
          } else {
            console.error('Not found');
          }
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchFoodData();
    }
  }, [name]);

  return (
    <InfoPage
      data={foods}
      loading={loading}
      categoryTitle={foods?.food_category_name || ''}
      pageTitle={foods?.name || ''}
    />
  );
};

export default FoodPage;
