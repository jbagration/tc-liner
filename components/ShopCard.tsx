import React from 'react';
import { Shop, Food, Service } from '../lib/api';
import styles from '../styles/shopcard.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { slugify } from 'transliteration';

const transliterate = (text: string): string => {
  const cyrillicToLatinMap: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
    й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
    у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ы: 'y', э: 'e',
    ю: 'yu', я: 'ya',
  };

  return text
    .toLowerCase()
    .split('')
    .map((char) => (cyrillicToLatinMap[char] || char))
    .join('');
};

interface ShopCardProps {
  shop: Shop | Food | Service;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const router = useRouter();
  const basePath = router.pathname.includes('/magaziny') ? '/magaziny' : router.pathname.includes('/uslugy') ? '/uslugy' : '/eda';

  const formattedShopName = slugify(shop.name, { lowercase: true, separator: '-' });

  return (
    <div className={styles.card} key={shop.id}>
      <Link href={`${basePath}/[name]`} as={`${basePath}/${formattedShopName}`} passHref>
        <div className={styles.cardContent}>
          <img
            src={`https://tclainer.backend.demowts.ru/uploads/logos/${shop.logo}`}
            alt={shop.name}
            className={styles.cardImage}
          />
          <div className={styles.details}>
            <h3>{shop.name}</h3>
            <p>
              <strong>Вебсайт:</strong> {shop.website}
            </p>
            <p>
              <strong>График работы:</strong> {shop.working_hours}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShopCard;
