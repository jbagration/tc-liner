import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Service } from '@/lib/api';
import InfoPage from '../../components/InfoPage';
import { transliterate } from 'transliteration';

const backendUrl = 'https://tclainer.backend.demowts.ru/api';

const ServicesPage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const [services, setServices] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const url = `${backendUrl}/services`;
        const response = await axios.get(url);
        if (response.data && response.data.data && response.data.data.services) {
          const selectedServices = response.data.data.services.data.find((s: Service) => {
            const trimmedName = s.name.trim();
            const transliteratedName = transliterate(trimmedName.toLowerCase()).replace(/\s/g, '-');
            return transliteratedName === name;
          });

          if (selectedServices) {
            setServices(selectedServices);
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
      fetchServicesData();
    }
  }, [name]);

  return (
    <InfoPage
      data={services}
      loading={loading}
      categoryTitle={services?.service_category_name || ''}
      pageTitle={services?.name || ''}
    />
  );
};

export default ServicesPage;
