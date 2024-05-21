import React from 'react';
import Layout from '@/components/Layout';
import styles from '../styles/privacyPolicy.module.css'; 

const PersonalDataProcessingPolicyPage: React.FC = () => {
  return (
    <Layout >      
    <div className={styles.container}>
      <h1 className={styles.title}>ПОЛОЖЕНИЕ ОБ ОБРАБОТКЕ ПЕРСОНАЛЬНЫХ ДАННЫХ</h1>
      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel sem vel felis egestas
          lobortis. Cras vehicula ac arcu sit amet aliquam. Curabitur in libero neque. Nulla
          vestibulum eros et ante ullamcorper, nec pellentesque odio feugiat. Quisque sed odio
          euismod, ultricies elit vel, sagittis arcu. Proin at metus vitae ligula ullamcorper
          pharetra. Duis cursus tellus quis efficitur sagittis. Fusce vitae purus a odio hendrerit
          congue non vitae elit. Duis non sem nec erat tincidunt cursus. In hac habitasse platea
          dictumst. Proin vitae lectus a metus bibendum consectetur a a libero.
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default PersonalDataProcessingPolicyPage;