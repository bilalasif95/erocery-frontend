import { media, styled } from "@styles";

export const AddressForm = styled.form`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CityInput = styled.div`
`;

export const CityError = styled.div`
  color: red;
`;

export const RowWithTwoCells = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    width: calc(50% - ${props => props.theme.spacing.spacer} / 2);
    margin-bottom: 2rem;
    ${media.smallScreen`
      width: 100%;
      margin-bottom: 1.5rem;
    `}
  }
`;

export const RowWithOneCell = styled.div`
  width: 100%;
`;
export const PhoneField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  height: 45px;
  background: #fff;
  position: relative;
  input {
    padding: 0.8rem 1rem 0.8rem 1.9rem;
  }
  label{
    left: 2rem;
  }
`;
export const StartNum = styled.div`
  width: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 46px;
  z-index: 2;
  position: absolute;
  color: #000;
`;



