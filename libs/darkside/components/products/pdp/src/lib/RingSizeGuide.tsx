import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { formatRingSize } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const LINK_TO_PDF = `https://images.vraiandoro.com/content-images/VRAI_Ring_Sizer_PDF_en_US.pdf`;

const RING_SIZE_GUIDE_COLUMN_TITLES = ['USA & Canada', 'Diameter (mm)', 'Europe', 'UK & Australia'];

const RingSizeGuideStyles = styled.div`
  .size-guide__actions {
    margin: 1rem 0 2rem;
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        margin-right: 15px;

        &:last-child {
          margin-right: 0;
        }

        button {
          font-size: 1.4rem;
        }
      }
    }
  }
  .table-header {
    display: flex;

    .column-title__wrapper {
      flex: 1;
    }
    .column-title__title {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      display: block;
    }
  }
  .row {
    display: flex;
    margin-bottom: 1.5rem;
  }
  .size {
    flex: 1;
    font-size: 1.2rem;

    ${media.medium`font-size: 1.4rem;`}
  }
`;

const RingSizeGuide = () => {
  const { locale } = useRouter();

  return (
    <RingSizeGuideStyles>
      <div className="size-guide__actions">
        <ul>
          <li>
            <DarksideButton
              openUrlInNewWindow={true}
              href="/ring-sizer/ring-sizer/ring-sizer-32905666134109"
              colorTheme="teal"
              type="underline"
            >
              <UIString>Order a ring sizer</UIString>
            </DarksideButton>
          </li>
          <li>
            <DarksideButton openUrlInNewWindow={true} href={LINK_TO_PDF} colorTheme="teal" type="underline">
              <UIString>Print a ring sizer</UIString>
            </DarksideButton>
          </li>
        </ul>
      </div>
      <div className="table">
        <div className="table-header">
          {RING_SIZE_GUIDE_COLUMN_TITLES.map((columnTitle) => {
            return (
              <div className="column-title__wrapper" key={columnTitle}>
                <strong className="column-title__title -bold">
                  <UIString>{columnTitle}</UIString>
                </strong>
              </div>
            );
          })}
        </div>
        <div className="table-body">
          {RING_SIZE_CONVERSIONS.map((conversionSet) => {
            const { usCanada, diameter, europe, ukAustralia } = conversionSet;

            return (
              <div key={usCanada} className="row">
                <span className="size">{formatRingSize(usCanada, locale)}</span>
                <span className="size">{formatRingSize(diameter, locale)}</span>
                <span className="size">{formatRingSize(europe, locale)}</span>
                <span className="size">{ukAustralia}</span>
              </div>
            );
          })}
        </div>
      </div>
    </RingSizeGuideStyles>
  );
};

export default RingSizeGuide;

const RING_SIZE_CONVERSIONS = [
  {
    usCanada: 3,
    diameter: 14.1,
    europe: 44,
    ukAustralia: 'F',
  },
  {
    usCanada: 3.25,
    diameter: 14.3,
    europe: 45,
    ukAustralia: 'F1/2',
  },
  {
    usCanada: 3.5,
    diameter: 14.5,
    europe: 45.5,
    ukAustralia: 'G',
  },
  {
    usCanada: 3.75,
    diameter: 14.7,
    europe: 46,
    ukAustralia: 'G1/2',
  },
  {
    usCanada: 4,
    diameter: 14.9,
    europe: 47,
    ukAustralia: 'H',
  },
  {
    usCanada: 4.25,
    diameter: 15.1,
    europe: 47.5,
    ukAustralia: 'H1/2',
  },
  {
    usCanada: 4.5,
    diameter: 15.3,
    europe: 48,
    ukAustralia: 'I',
  },
  {
    usCanada: 4.75,
    diameter: 15.5,
    europe: 48.5,
    ukAustralia: 'J',
  },
  {
    usCanada: 5,
    diameter: 15.7,
    europe: 49,
    ukAustralia: 'J1/2',
  },
  {
    usCanada: 5.25,
    diameter: 15.9,
    europe: 50,
    ukAustralia: 'K',
  },
  {
    usCanada: 5.5,
    diameter: 16.1,
    europe: 50.5,
    ukAustralia: 'K1/2',
  },
  {
    usCanada: 5.75,
    diameter: 16.3,
    europe: 51,
    ukAustralia: 'L',
  },
  {
    usCanada: 6,
    diameter: 16.5,
    europe: 52,
    ukAustralia: 'L1/2',
  },
  {
    usCanada: 6.25,
    diameter: 16.7,
    europe: 52.5,
    ukAustralia: 'M',
  },
  {
    usCanada: 6.5,
    diameter: 16.9,
    europe: 53,
    ukAustralia: 'M1/2',
  },
  {
    usCanada: 6.75,
    diameter: 17.1,
    europe: 54,
    ukAustralia: 'N',
  },
  {
    usCanada: 7,
    diameter: 17.3,
    europe: 54.5,
    ukAustralia: 'N1/2',
  },
  {
    usCanada: 7.25,
    diameter: 17.6,
    europe: 55,
    ukAustralia: 'O',
  },
  {
    usCanada: 7.5,
    diameter: 17.8,
    europe: 56,
    ukAustralia: 'O1/2',
  },
  {
    usCanada: 7.75,
    diameter: 18,
    europe: 56.5,
    ukAustralia: 'P',
  },
  {
    usCanada: 8,
    diameter: 18.2,
    europe: 57,
    ukAustralia: 'P1/2',
  },
  {
    usCanada: 8.25,
    diameter: 18.4,
    europe: 58,
    ukAustralia: 'Q',
  },
  {
    usCanada: 8.5,
    diameter: 18.6,
    europe: 58.5,
    ukAustralia: 'Q1/2',
  },
  {
    usCanada: 8.75,
    diameter: 18.8,
    europe: 59,
    ukAustralia: 'R',
  },
  {
    usCanada: 9,
    diameter: 19,
    europe: 60,
    ukAustralia: 'R1/2',
  },
  {
    usCanada: 9.25,
    diameter: 19.2,
    europe: 60.5,
    ukAustralia: 'S',
  },
  {
    usCanada: 9.5,
    diameter: 19.4,
    europe: 61,
    ukAustralia: 'S1/2',
  },
  {
    usCanada: 9.75,
    diameter: 19.6,
    europe: 61.5,
    ukAustralia: 'T',
  },
  {
    usCanada: 10,
    diameter: 19.8,
    europe: 62,
    ukAustralia: 'T1/2',
  },
  {
    usCanada: 10.25,
    diameter: 20,
    europe: 63,
    ukAustralia: 'U',
  },
  {
    usCanada: 10.5,
    diameter: 20.2,
    europe: 63.5,
    ukAustralia: 'U1/2',
  },
  {
    usCanada: 10.75,
    diameter: 20.4,
    europe: 64,
    ukAustralia: 'V',
  },
  {
    usCanada: 11,
    diameter: 20.6,
    europe: 65,
    ukAustralia: 'V1/2',
  },
  {
    usCanada: 11.25,
    diameter: 20.9,
    europe: 65.5,
    ukAustralia: 'W',
  },
  {
    usCanada: 11.5,
    diameter: 21.1,
    europe: 66,
    ukAustralia: 'W1/2',
  },
  {
    usCanada: 11.75,
    diameter: 21.3,
    europe: 67,
    ukAustralia: 'X',
  },
  {
    usCanada: 12,
    diameter: 21.5,
    europe: 67.5,
    ukAustralia: 'X1/2',
  },
  {
    usCanada: 12.25,
    diameter: 21.7,
    europe: 68,
    ukAustralia: 'Y',
  },
  {
    usCanada: 12.5,
    diameter: 21.9,
    europe: 69,
    ukAustralia: 'Z',
  },
  {
    usCanada: 12.75,
    diameter: 22.1,
    europe: 69.5,
    ukAustralia: 'Z1/2',
  },
  {
    usCanada: 13,
    diameter: 22.3,
    europe: 70,
    ukAustralia: '',
  },
  {
    usCanada: 13.25,
    diameter: 22.5,
    europe: 71,
    ukAustralia: 'Z1',
  },
  {
    usCanada: 13.5,
    diameter: 22.7,
    europe: 71.5,
    ukAustralia: '',
  },
  {
    usCanada: 13.75,
    diameter: 22.9,
    europe: 72,
    ukAustralia: 'Z2',
  },
  {
    usCanada: 14,
    diameter: 23.1,
    europe: 72.5,
    ukAustralia: 'Z3',
  },
];
