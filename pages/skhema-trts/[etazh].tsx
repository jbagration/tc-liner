import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import FloorContent from '../../components/FloorContent';

const SchemePage: React.FC = () => {
  const router = useRouter();
  const floorNumber = parseInt(router.query.etazh as string) || 1;

  return (
    <Layout>
      <FloorContent floorNumber={floorNumber} routerPathname={router.pathname} />
    </Layout>
  );
};

export default SchemePage;
