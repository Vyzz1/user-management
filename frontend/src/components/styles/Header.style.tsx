import styled from "styled-components";

interface HeaderProps {
  size?: "small" | "medium" | "large" | "xlarge";
  color?: string;
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  margin?: string;
}

const Header = styled.h1<HeaderProps>`
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "18px";
      case "medium":
        return "24px";
      case "large":
        return "32px";
      case "xlarge":
        return "40px";
      default:
        return "24px";
    }
  }};

  color: ${({ color }) => color || "#333"};

  font-weight: ${({ weight }) => {
    switch (weight) {
      case "normal":
        return "400";
      case "medium":
        return "500";
      case "semibold":
        return "600";
      case "bold":
        return "700";
      default:
        return "600";
    }
  }};

  text-align: ${({ align }) => align || "left"};
  margin: ${({ margin }) => margin || "0 0 16px 0"};

  line-height: 1.2;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export default Header;
