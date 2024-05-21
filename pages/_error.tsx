import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import Layout from '../components/Layout';

const ErrorPage = ({ statusCode, title }: ErrorProps) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40vh',
    textAlign: 'center',
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1>{title || 'An error occurred'}</h1>
        <p>
          {statusCode
            ? `The server returned an error with status code ${statusCode}.`
            : 'An unexpected error occurred.'}
        </p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ res, err }: NextPageContext) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const title = err ? err.name : 'Error';
  return { props: { statusCode, title } };
}

export default ErrorPage;
