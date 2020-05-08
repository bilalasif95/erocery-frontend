import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Wrapper = styled.div`
  background: ${props => props.theme.colors.light};
  padding: 2.5rem;
  text-align: center;
  max-height: 30rem;
  transition: 0.3s;
  border: 1px solid #f5f5f5;

  :hover {
    background-color: ${props => props.theme.colors.hoverLightBackground};
  }

  ${media.mediumScreen`
    padding: 1.8rem;
  `}
  ${media.smallScreen`
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e7e7e7 !important;
`}
`;
export const DeskView = styled.div`
  ${media.smallScreen`
    display: none;
  `}
`;
export const MobView = styled.div`
display: none;
  ${media.smallScreen`
    display: flex;
    justify-content: flex-start;
  `}
`;
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
  text-transform: uppercase;
  font-weight: normal;
  min-height: 40px;
  ${textProps}
  ${media.smallScreen`
  text-transform: capitalize;
`}
`;
export const Link = styled.div`
width: 10%;
`;

export const Price = styled.p`
  ${textProps}
  ${media.smallScreen`
  font-weight:600;
  margin: 0;
`}
`;
export const AddCartBtn = styled.div`
display: flex;
justify-content: flex-end;
background: #f4423c;
text-align: center;
align-items: center;
color: #fff;
border-radius: 5px;
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
padding: 0.5rem;
`;

export const Image = styled.div`
  width: auto;
  height:230px;
  display: flex;
  align-items: center;
  justify-content:center;
  max-width: 100%;
  overflow: hidden;
  > img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
  ${media.smallScreen`
  width:20%;
  height:auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin:0 0.5rem 0 0;
`}
`;
