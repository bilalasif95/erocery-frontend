import { media, styled } from "@styles";
import { Size } from "./types";

const padding = {
  md: "0.9rem 1rem",
  sm: "0.1rem 1rem",
};

// const fontSize = (fontSize: string, smallFontSize: string) => ({
//   md: fontSize,
//   sm: smallFontSize,
// });

export const Primary = styled.button<{
  color: "primary" | "secondary";
  fullWidth?: boolean;
  size: Size;
}>`
  background-color: ${props =>
    props.theme.button.colors[props.color].background};
  padding: ${props => padding[props.size]};
  border: none;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  color: ${props => props.theme.button.colors[props.color].color};
  width: ${props => (props.fullWidth ? "100%" : "auto")}

  &:hover {
    background-color: ${props =>
      props.theme.button.colors[props.color].hoverBackground};
    color: ${props => props.theme.button.colors[props.color].hoverColor};
  }

  &:active {
    background-color: ${props =>
      props.theme.button.colors[props.color].activeBackground};
    box-shadow: -3px 3px 14px 0px rgba(129, 67, 67, 0.2);
  }

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};

    &,
    &:hover {
      cursor: not-allowed;
    }
  }

  ${media.smallScreen`
    padding:  0.5rem 1rem;
    width: ${(props: { fullWidth: boolean }) =>
      props.fullWidth ? "100%" : "88%"};
  `}
`;

export const Secondary = styled(Primary)`
  box-shadow: inset 0px 0px 0px 3px
    ${props => props.theme.button.colors.secondary.color};
  border-left: 1px solid ${props => props.theme.button.colors.secondary.color};
  border-right: 1px solid ${props => props.theme.button.colors.secondary.color};
`;

export const Text = styled.span`
  display: inline-block;
  font-size: 1.125rem;
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};

  ${media.smallScreen`
  font-size: 0.9rem !important;
`}
`;
