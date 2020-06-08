import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  text-align: left;
  font-weight:600;
  margin: 0 0 0.5rem;
`;

export const Wrapper = styled.div`
  background: transparent;
  text-align: left;
  max-height: 30rem;
  transition: 0.3s;

  :hover {
    background: transparent;
  }

  ${media.mediumScreen`
    padding: 0;
  `}
  ${media.smallScreen`
  padding: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e7e7e7 !important;
`}
`;
export const DeskView = styled.div`
display: block;
`;
// export const MobView = styled.div`
// display: none;
//   ${media.smallScreen`
//     display: flex;
//     justify-content: flex-start;
//   `}
// `;
export const Details = styled.div`
width: 80%;
padding:0 0 0 0.5rem;
`;
export const Content = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

`;
export const Title = styled.h4`
  font-weight: 500;
  margin:1rem 0 0;
  min-height: 40px;
  max-height: 40px;
  font-size: 1.1rem;
  text-align: left;
  overflow: hidden;
  padding: 0 0.5rem;

  ${media.smallScreen`
  text-transform: capitalize;
  font-size: 0.7rem;
`}
`;
export const Link = styled.div`
width: 10%;
`;

export const Price = styled.p`
  ${textProps};
  padding: 0 0.5rem;
`;
export const AddCartBtn = styled.div`
display: flex;
justify-content: flex-end;
background: #f4423c;
text-align: center;
align-items: center;
color: #fff;
border-radius: 5px;
font-size: 12px !important;
font-weight: 600;
text-transform: uppercase;
padding: 0.5rem;
`;

export const Image = styled.div`
  width: auto;
  height:250px;
  display: flex;
  align-items: center;
  justify-content:center;
  max-width: 100%;
  overflow: hidden;
  > img {
    width: auto;
    height: auto;
    max-width: 100%;
    min-width: 185px !important;
    ${media.mediumScreen`
    min-width: 100% !important;
 `}
  }
  ${media.smallScreen`
    height: 150px;
 `}
`;
