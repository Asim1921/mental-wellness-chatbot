import React from 'react';
import styled, { css } from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

const getButtonStyles = (variant, theme) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryDark};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.text};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondaryDark};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryLight}10;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryLight}10;
        }
      `;
    case 'danger':
      return css`
        background-color: ${theme.colors.error};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.error}dd;
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryDark};
        }
      `;
  }
};

const getButtonSize = (size, theme) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.md};
        font-size: ${theme.typography.fontSizes.sm};
      `;
    case 'medium':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSizes.md};
      `;
    case 'large':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.xl};
        font-size: ${theme.typography.fontSizes.lg};
      `;
    default:
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSizes.md};
      `;
  }
};

// Notice the $ prefix on custom props
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: ${({ theme }) => theme.transitions.short};
  cursor: pointer;
  border: none;
  outline: none;
  white-space: nowrap;
  
  ${({ $variant, theme }) => getButtonStyles($variant, theme)}
  ${({ $size, theme }) => getButtonSize($size, theme)}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Adjust spacing for icon and loading spinner */
  > svg, > span {
    margin-right: ${({ theme, $iconOnly }) => $iconOnly ? '0' : theme.spacing.sm};
  }
`;

const SpinnerWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme, $hasChildren }) => $hasChildren ? theme.spacing.sm : '0'};
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  icon = null,
  type = 'button',
  onClick,
  ...props
}) => {
  const iconOnly = !children && icon;
  
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $iconOnly={iconOnly}
      disabled={disabled || isLoading}
      type={type}
      onClick={isLoading ? null : onClick}
      {...props}
    >
      {isLoading ? (
        <SpinnerWrapper $hasChildren={!!children}>
          <LoadingSpinner size="16px" />
        </SpinnerWrapper>
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </StyledButton>
  );
};

export default Button;