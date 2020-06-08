import { media,styled } from "@styles";

export const Wrapper = styled.div`
  margin-bottom: 1.4rem;
`;

export const Bar = styled.div`
  background-color: ${props => props.theme.tile.backgroundColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-top: 1rem;
  margin-bottom: 1.4rem;
  ${media.smallScreen`
  padding: 1rem;
`}

`;

export const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0;
  ${media.smallScreen`
  width: 100%;
  flex-wrap: wrap;
`}
`;

export const FiltersButton = styled.button`
  font-size: ${props => props.theme.typography.smallFontSize};
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0 1rem;
`;

export const Clear = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
  border: 1px solid ${props => props.theme.colors.lightFont};
  border-radius: 5px;
  margin: 0 0 1rem;
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-right: 0;
  ${media.smallScreen`
  width: 100%;
  flex-wrap: wrap;
`}
`;

export const Element = styled.span`
  padding-right: 1rem;
`;

export const Filters = styled.span`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0.6rem;
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.lightFont};
`;

export const Sort = styled.div`
  width: 12rem;
  display: inline-block;
`;

export const FiltersChipsWrapper = styled.div`
> div {
    margin: 0.4rem;
  }
`;
