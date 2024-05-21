import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/shopcard.module.css';
import Image from 'next/image';

const ToTenantsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    brandCategory: '',
    areaFrom: '',
    areaTo: '',
    mallsPresent: '',
    website: '',
    contactPerson: '',
    position: '',
    phone: '',
    email: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.borderContainer}>
          <Image src="/tenant.svg" alt="tenant" width={112} height={112} />
          <h1>Арендаторам</h1>
        </div>
        <div className={styles.toTenatsText}>
          <p>
            ТРЦ Лайнер представляет собой концепцию, рассчитанную на ежедневные удовлетворения
            потребностей жителей зоны охвата. Тенант-микс арендаторов сформирован таким образом,
            чтобы генерировать постоянный покупательский поток. Продуктовый супермаркет, кинотеатр,
            фуд сегмент, услуги, fashion, развлечения и многое другое находятся в непосредственной
            близости от высокоплотной сложившейся и новой застройки Солнцево, где проживает свыше 350
            тыс. человек, поэтому межрайонный формат Лайнер рассчитан на среднюю посещаемость 20-25 тыс. человек в день.
          </p>
          <a href="/path/to/presentation.pdf" className={styles.presentationButton}>
            Скачать презентацию
          </a>
          </div>
        <div className={styles.blocksContainer}>
          <div className={styles.block}>
          <Image src="/book.svg" alt="Book" width={60} height={60} />
          <div className={styles.blockText}>
            <h2>51 645,8 кв.м.</h2>
            <p>Общая площадь (GBA) включая подземный паркинг</p>
          </div>
          </div>
          <div className={styles.block}>
          <Image src="/people.svg" alt="people" width={60} height={60} />
          <div className={styles.blockText}>
            <h2>28 771 кв.м.</h2>
            <p>Арендопригодная площадь (GLA)</p>
          </div></div>
          <div className={styles.block}>
          <Image src="/people.svg" alt="people" width={60} height={60} />
            <div className={styles.blockText}>
            <h2>16 500 чел./день</h2>
            <p>Один из самых высоких показателей посещаемости</p>
          </div>
          </div>
        </div>

        <h1 className={styles.rentalTitle}>Заявка на аренду</h1>
        <form className={styles.rentalForm} onSubmit={handleFormSubmit}>
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label htmlFor="brandName">Название бренда*</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="brandCategory">Категория бренда (магазин, ресторан, развлечения)</label>
              <input
                type="text"
                id="brandCategory"
                name="brandCategory"
                value={formData.brandCategory}
                onChange={handleFormChange}
              />
            </div>


            <div className={styles.formGroup}>
  <label htmlFor="areaFrom">Необходимая площадь</label>
  <div className={styles.rangeInput}>
    <span>от</span>
    <input
      type="number"
      id="areaFrom"
      name="areaFrom"
      value={formData.areaFrom}
      onChange={handleFormChange}
      required
    />
    <span>до</span>
    <input
      type="number"
      id="areaTo"
      name="areaTo"
      value={formData.areaTo}
      onChange={handleFormChange}
      required
    />
    <span>кв.м.</span>
  </div>
</div>



            <div className={styles.formGroup}>
              <label htmlFor="mallsPresent">В каких ТЦ представлены</label>
              <input
                type="text"
                id="mallsPresent"
                name="mallsPresent"
                value={formData.mallsPresent}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="website">Сайт</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contactPerson">Контактное лицо*</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="position">Должность</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Телефон*</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
          
            <button type="submit">Отправить</button>
            <p className={styles.dataProcessingText}>Отправляя свои персональные данные, вы соглашаетесь на их обработку</p>

          </div>

          <div className={`${styles.formSection} ${styles.formSectionRightSide}`}>
          <div className={styles.formGroup}>
              <h3>Отдел аренды</h3>
              <p>Наталия Левитина</p>
              <p>arendanebo@stol.ru</p>
            </div>
            <div className={styles.formGroup}>
              <h3>Реклама и промо</h3>
              <p>Email: reklama@stol.ru</p>
            </div>
            <div className={styles.formGroup}>
              <h3>Контактный телефон</h3>
              <p>+7 495 984 70 10</p>
            </div>

          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ToTenantsPage;
