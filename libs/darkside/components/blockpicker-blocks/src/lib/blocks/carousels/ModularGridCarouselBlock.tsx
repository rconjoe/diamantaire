// /* eslint-disable import/no-unresolved */
// import { UniLink } from '@diamantaire/darkside/core';
// import { cx } from '@emotion/css';
// import Image from 'next/image';
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';

// import * as contentBlockStyles from './CarouselContentBlock.style';
// import * as styles from './ModularGridCarouselBlock.style';
// import Heading from '../molecules/Heading';
// import LazyLoadWrapper from '../molecules/LazyLoadWrapper';

// // a 2x2 grid on desktop, with a 3 item centered slider on mobile

// type ModularGridCarouselBlockProps = {
//   title?: string;
//   subtitle?: string;
//   blocks?: Array<any>;
//   additionalClass?: string;
//   id?: string;
//   isMobile?: boolean;
//   headingAdditionalClass?: string;
//   headingType?: string;
//   countryCode: string;
//   shouldLazyLoad?: boolean;
// };

// const ModularGridCarouselBlock = ({
//   blocks,
//   additionalClass,
//   title,
//   subtitle,
//   headingType,
//   headingAdditionalClass,
//   isMobile,
//   shouldLazyLoad,
//   countryCode,
// }: ModularGridCarouselBlockProps) => {
//   if (!blocks || !blocks?.length) {
//     return null;
//   }

//   const block = (
//     <div className={cx(styles.wrapper, additionalClass)}>
//       <div className={cx(contentBlockStyles.contentBlockLayout)}>
//         <div className={cx(contentBlockStyles.contentBlockTitle, '-no-margin-top')}>
//           {title && (
//             <Heading
//               type={headingType ? headingType : 'h2'}
//               className={cx(styles.title, 'primary', headingAdditionalClass ? headingAdditionalClass : 'h1')}
//             >
//               {title}
//             </Heading>
//           )}
//           {title && subtitle && <p className={cx(styles.subtitle)}>{subtitle}</p>}
//         </div>

//         <div className={styles.body}>
//           {isMobile ? (
//             <Swiper centeredSlides={true} spaceBetween={17} slidesPerView={3} loop={true}>
//               {blocks?.map((block) => {
//                 // List of countries that this block should appear in. if EMPTY, it will appear in ALL countries.
//                 if (block?.supportedCountries?.length && !block?.supportedCountries?.includes(countryCode)) {
//                   return null;
//                 }

//                 return (
//                   <SwiperSlide key={block.id}>
//                     <GridCarouselBlockItem isMobile={isMobile} data={block} />
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper>
//           ) : (
//             <ul className={cx(styles.grid)}>
//               {blocks?.map((block) => {
//                 // List of countries that this block should appear in. if EMPTY, it will appear in ALL countries.
//                 if (block?.supportedCountries?.length && !block?.supportedCountries?.includes(countryCode)) {
//                   return null;
//                 }

//                 return (
//                   <li key={block.id}>
//                     <GridCarouselBlockItem isMobile={isMobile} data={block} />
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   if (shouldLazyLoad) {
//     return <LazyLoadWrapper>{block}</LazyLoadWrapper>;
//   }

//   return block;
// };

// export default ModularGridCarouselBlock;

// interface GridCarouselBlockItemProps {
//   data: {
//     desktopImage: {
//       url: string;
//       responsiveImage: {
//         height: number;
//         width: number;
//       };
//     };
//     mobileImage: {
//       url: string;
//       responsiveImage: {
//         height: number;
//         width: number;
//       };
//     };
//     title: string;
//     link: string;
//   };
//   isMobile: boolean;
// }

// const GridCarouselBlockItem = ({ data, isMobile }: GridCarouselBlockItemProps) => {
//   const { mobileImage, desktopImage, title, link } = data;

//   const desktopImageObject = {
//     src: desktopImage.url,
//     height: desktopImage.responsiveImage.height,
//     width: desktopImage.responsiveImage.width,
//   };

//   const mobileImageObject = {
//     src: mobileImage.url,
//     height: mobileImage.responsiveImage.height,
//     width: mobileImage.responsiveImage.width,
//   };

//   return (
//     <UniLink route={link}>
//       <div className={cx(styles.media)}>
//         {isMobile && (
//           <Image alt={title} src={mobileImageObject.src} width={mobileImageObject.width} height={mobileImageObject.height} />
//         )}
//         {!isMobile && (
//           <Image
//             alt={title}
//             src={desktopImageObject.src}
//             width={desktopImageObject.width}
//             height={desktopImageObject.height}
//           />
//         )}
//       </div>
//       <div className={cx(styles.label)}>
//         <Heading type="h3">{data.title}</Heading>
//       </div>
//     </UniLink>
//   );
// };
