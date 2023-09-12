import { useEffect, useState } from 'react';

const SwiperCustomPagination = ({ swiper, activeIndex, thumb, reload }) => {
  const [loadIndex, setLoadIndex] = useState(0);

  useEffect(() => {
    const newLoadIndex = loadIndex + 1;

    setLoadIndex(newLoadIndex);
  }, [reload]);

  return (
    <div className="custom-pagination" data-load={loadIndex}>
      {swiper?.slides?.map((_, index) => {
        return (
          <div
            key={index}
            className={`custom-pagination-thumbnail ${activeIndex === index ? 'active' : ''}`}
            onClick={() => swiper.slideTo(index)}
          >
            {thumb[index]}
          </div>
        );
      })}
    </div>
  );
};

export default SwiperCustomPagination;

export { SwiperCustomPagination };
