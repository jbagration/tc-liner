import React from 'react';

const Loading: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40vh', 
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <p>Загрузка...</p>
    </div>
  );
};

export default Loading;
