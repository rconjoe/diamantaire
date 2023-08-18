// import { getBlockPictureAlt } from '../../../helpers';
// import { isCountrySupported } from '../../../helpers/supportedCountries';
// import { getClientSideCountryCode, getCountryCode } from '../../../store/selectors/geolocation';

// import LazyLoadWrapper from '../LazyLoadWrapper';
// import { Image, Markdown, VideoBlock } from '../index';

// import { Heading, Markdown } from '@diamantaire/darkside/components/common-ui';

// interface ModularSingleMediaBlockProps {
//   image: string;
//   title: string;
//   copy: string;
//   ctaCopy: string;
//   ctaRoute: string;
//   additionalClass: string;
//   textBlockAlignment: string;
//   shouldLazyLoad: boolean;
//   ctaCopy2: PropTypes.string;
//   ctaRoute2: PropTypes.string;
//   headingType: PropTypes.string;
//   headingAdditionalClass: PropTypes.string;
//   supportedCountries: PropTypes.array;
//   countryCode: PropTypes.string.isRequired;
// }

// const ModularSingleMediaBlock = ({
//   media,
//   title,
//   copy,
//   additionalClass,
//   headingType,
//   headingAdditionalClass,
//   shouldLazyLoad,
//   supportedCountries,
//   countryCode,
// }) => {
//   // If country is not supported, do not render
//   if (!isCountrySupported(supportedCountries, countryCode)) {
//     return null;
//   }

//   const alt = getBlockPictureAlt({
//     media,
//     title,
//   });

//   const hasVideo = Boolean(media?.video);

//   const block = (
//     <div className={additionalClass ?? additionalClass}>
//       {title && (
//         <Heading
//           type={headingType ? headingType : 'h2'}
//           className={cx(headingAdditionalClass ?? headingAdditionalClass, additionalClass)}
//         >
//           {title}
//         </Heading>
//       )}

//       {copy && <Markdown>{copy}</Markdown>}

//       <div className="media">{hasVideo ? <VideoBlock video={media?.video} /> : <Image image={media} alt={alt} />}</div>
//     </div>
//   );

//   if (shouldLazyLoad) {
//     return <LazyLoadWrapper>{block}</LazyLoadWrapper>;
//   }

//   return block;
// };

// ModularSingleMediaBlock.propTypes = propTypes;

// const mapStateToProps = (state) => {
//   return {
//     countryCode: getClientSideCountryCode(state) || getCountryCode(state),
//   };
// };

// export default connect(mapStateToProps)(ModularSingleMediaBlock);

const ModularSingleMediaBlock = () => {
  return <div></div>;
};

export default ModularSingleMediaBlock;

export { ModularSingleMediaBlock };
