import React from 'react';
import styles from '../styles/adminCard.module.css';
import { Administrator } from '@/lib/api';

interface AdminCardProps {
  admin: Administrator;
  onEmailClick: (email: string) => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ admin, onEmailClick }) => (
  <div key={admin.id} className={styles.adminCircle}>
    <h3 className={styles.adminTitle}>{admin.title}</h3>
    <p className={styles.adminName}>{admin.name}</p>
    <p className={styles.adminEmail} onClick={() => onEmailClick(admin.email)}>
      {admin.email}
    </p>
    <img
      src={`https://tclainer.backend.demowts.ru/uploads/logos/${admin.photo}`}
      alt={`Admin ${admin.id}`}
      className={styles.adminPhoto}
    />
  </div>
);

export default AdminCard;
