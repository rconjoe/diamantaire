const SwiperCustomPagination = ({ swiper, activeIndex, thumb }) => {
  return (
    <div className="custom-pagination">
      {swiper?.slides?.map((slide, index) => {
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
