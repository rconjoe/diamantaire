// import { Heading, Markdown } from '@diamantaire/darkside/components/common-ui';
// import { ReactNode } from 'react';

// // This is still work in progress

// interface HowItWorksItemProps {
//   children?: ReactNode;
//   title?: string;
//   headingType?: string;
//   headingAdditionalClass?: string;
//   copy?: string;
//   isLastItem?: boolean;
// }

// const HowItWorksItem: React.FC<HowItWorksItemProps> = ({
//   children,
//   title,
//   headingType,
//   headingAdditionalClass,
//   copy,
//   isLastItem,
// }) => {
//   return (
//     <div className={}>
//       <div className="inner">
//         {children}
//         <div>
//           {title && (
//             <Heading type={headingType ? headingType : 'h2'} className={headingAdditionalClass}>
//               {title}
//             </Heading>
//           )}

//           {copy && (
//             <>
//               <Markdown
//                 options={{
//                   forceBlock: true,
//                 }}
//                 withStyles={false}
//                 className={}
//               >
//                 {copy}
//               </Markdown>
//               {!isLastItem && <div className="mobile-arrow">{/* <Icon type="arrow-down-bold" /> */}icon</div>}
//             </>
//           )}
//         </div>
//       </div>
//       {!isLastItem && 'icon'}
//     </div>
//   );
// };

// //

// interface CFYGalleryProps {
//   diamondType: string;
//   content?: {
//     ctoDiamondResultHowItWorks?: {
//       title: string;
//       blocks: Array<{
//         title?: string;
//         media?: {
//           responsiveImage: any; // Replace 'any' with the actual type
//         };
//         // Add other properties as needed
//       }>;
//       additionalClass?: string;
//       headingType?: string;
//       headingAdditionalClass?: string;
//     }[];
//   };
//   diamondName?: string;
// }

// const CFYGallery: React.FC<CFYGalleryProps> = ({ diamondType, content, diamondName }) => {
//   const { ctoDiamondResultHowItWorks } = content;

//   return ctoDiamondResultHowItWorks
//     ? ctoDiamondResultHowItWorks?.map((contentBlock, index) => {
//         const { title, blocks, additionalClass, headingType, headingAdditionalClass } = contentBlock;

//         return (
//           <div className={} key={`placeholder-${index}`}>
//             <Heading className={} type={headingType ? headingType : 'h2'}>
//               {title}
//             </Heading>

//             <div className={}>
//               {blocks &&
//                 blocks?.map((block, idx) => {
//                   const { media } = block;

//                   if (idx === 0) {
//                     return (
//                       <HowItWorksItem key={idx} {...block}>
//                         <div className="circular-image">
//                           icon
//                           {/* <Icon className="diamondType-icon" type={`diamond-type-${diamondType}`} alt={diamondName} /> */}
//                         </div>
//                       </HowItWorksItem>
//                     );
//                   }
//                   if (idx === 1) {
//                     return (
//                       <HowItWorksItem key={idx} {...block}>
//                         <div className="circular-image">image rough</div>
//                       </HowItWorksItem>
//                     );
//                   }
//                   if (idx === 2) {
//                     return (
//                       <HowItWorksItem key={idx} {...block}>
//                         <div className="circular-image">
//                           GenericPolishingPlanImage
//                           {/* <GenericPolishingPlanImage diamondType={diamondType} /> */}
//                         </div>
//                       </HowItWorksItem>
//                     );
//                   }
//                   if (idx === 3) {
//                     return (
//                       <HowItWorksItem key={idx} {...block}>
//                         <div className="circular-image">
//                           datoImage
//                           {/* <DatoImage data={media?.responsiveImage} /> */}
//                         </div>
//                       </HowItWorksItem>
//                     );
//                   }
//                   if (idx === 4) {
//                     return (
//                       <HowItWorksItem key={idx} {...block} isLastItem={true}>
//                         <div className="circular-image">
//                           DiamondSpriteImage
//                           {/* <DiamondSpriteImage
//                             selectedDiamondType={diamondType?.toLowerCase()}
//                             lotId={`cfy-${diamondType?.toLowerCase()}`}
//                             imageWidth={400}
//                             backgroundOnly={false}
//                           /> */}
//                         </div>
//                       </HowItWorksItem>
//                     );
//                   }

//                   return;
//                 })}
//             </div>
//           </div>
//         );
//       })
//     : null;
// };

// export default CFYGallery;

// export { CFYGallery };
