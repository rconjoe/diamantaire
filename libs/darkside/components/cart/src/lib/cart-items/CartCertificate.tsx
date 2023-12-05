import { motion } from 'framer-motion';
import styled from 'styled-components';

const CartDiamondCertificateStyles = styled.div`
  margin-top: 2rem;
  .certificate-info {
    border: 0.1rem solid #000;
    background-color: #fff;

    .certificate-info__inner {
      padding: 2rem;

      .certificate-info__title {
        display: flex;
        margin-bottom: 1rem;
        p {
          flex: 1;
          margin: 0;
          font-size: var(--font-size-xsmall);
          font-weight: 500;
          display: block;
          color: var(--color-black);

          &:first-child {
            flex: 2;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      .certificate-info__body {
        p {
          margin: 0;
          font-size: var(--font-size-xxsmall);
          display: block;
          color: var(--color-grey);
        }

        button {
          font-size: 1.6rem;
          svg {
            position: relative;
            top: 0.7rem;
            left: -0.5rem;
            margin-right: -0.5rem;
            transform: scale(0.75);
          }
        }
      }
    }
  }
`;

const CartDiamondCertificate = ({ certificate }) => {
  const { copy: certCopy, title: certTitle, price: certPrice } = certificate || {};

  return (
    <CartDiamondCertificateStyles>
      <motion.div
        className="certificate-info dark"
        key="cert-container"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { y: 0, opacity: 1 },
          collapsed: { y: 50, opacity: 0 },
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <div className="certificate-info__inner">
          <div className="certificate-info__title">
            <p>{certTitle}</p>
            <p>{certPrice}</p>
          </div>
          <div className="certificate-info__body">
            <p>{certCopy}</p>
          </div>
        </div>
      </motion.div>
    </CartDiamondCertificateStyles>
  );
};

export default CartDiamondCertificate;
