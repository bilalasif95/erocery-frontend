import { media, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;

  ${media.mediumScreen`
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1.5rem;
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  `}
`;

export const Item = styled.div`
  border: 1px solid #f6f6f6;
`;

export const CartButton = styled.div`
  button {
    padding: 0.5rem 1rem;
  }
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
