import React, { useEffect } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

const Map: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=8b30580e-c42e-40f6-873a-cc1eca4315d9&lang=ru_RU';
    script.async = true;
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map('map', {
            center: [55.733842, 37.588144], 
            zoom: 15, 
          });

          const placemark = new window.ymaps.Placemark(map.getCenter(), {
            hintContent: 'Ваш адрес',
          }, {
            iconLayout: 'default#image',
            iconImageHref: '/marker.png',
            iconImageOffset: [-15, -42], 
          });

          map.geoObjects.add(placemark);
        });
      } else {
        console.error('Не удалось загрузить Yandex Maps API');
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }} />
  );
};

export default Map;
