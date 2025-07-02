import { Button as AntButton } from "antd";
import { type ButtonProps } from "antd/lib/button/button";
import styled, { css } from "styled-components";

interface CustomButtonProps extends ButtonProps {
  customVariant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "gradient";
  rounded?: boolean;
  shadow?: boolean;
  glow?: boolean;
}

const CustomButton = styled(AntButton)<CustomButtonProps>`
  border-radius: ${({ rounded }) => (rounded ? "50px" : "8px")};
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  /* Shadow effect */
  ${({ shadow }) =>
    shadow &&
    css`
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      &:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
      }
    `}

  /* Glow effect */
  ${({ glow }) =>
    glow &&
    css`
      &:hover {
        box-shadow: 0 0 20px rgba(24, 144, 255, 0.4);
      }
    `}
  
  /* Variant styles */
  ${({ customVariant }) => {
    switch (customVariant) {
      case "gradient":
        return css`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;

          &:hover {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            color: white;
          }

          &:focus {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            color: white;
          }
        `;

      case "success":
        return css`
          background-color: #52c41a;
          border-color: #52c41a;
          color: white;

          &:hover {
            background-color: #73d13d;
            border-color: #73d13d;
            color: white;
          }
        `;

      case "warning":
        return css`
          background-color: #faad14;
          border-color: #faad14;
          color: white;

          &:hover {
            background-color: #ffc53d;
            border-color: #ffc53d;
            color: white;
          }
        `;

      case "danger":
        return css`
          background-color: #ff4d4f;
          border-color: #ff4d4f;
          color: white;

          &:hover {
            background-color: #ff7875;
            border-color: #ff7875;
            color: white;
          }
        `;

      case "secondary":
        return css`
          background-color: #f5f5f5;
          border-color: #d9d9d9;
          color: #333;

          &:hover {
            background-color: #e6e6e6;
            border-color: #bfbfbf;
            color: #333;
          }
        `;

      default:
        return "";
    }
  }}
  


  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  /* Size variants */
  &.ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
  }

  &.ant-btn-lg {
    height: 44px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 600;
  }
`;
CustomButton.displayName = "Button";
export default CustomButton;
export type { CustomButtonProps };
