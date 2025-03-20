import React from 'react';
import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

// Updated with $-prefixed props
const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme, $error }) => $error ? theme.colors.error : theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.short};
  
  &:focus {
    outline: none;
    border-color: ${({ theme, $error }) => $error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme, $error }) => $error 
      ? `${theme.colors.error}30` 
      : `${theme.colors.primary}30`};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
  
  ${({ $leftIcon }) => $leftIcon && css`
    padding-left: 2.5rem;
  `}
  
  ${({ $rightIcon }) => $rightIcon && css`
    padding-right: 2.5rem;
  `}
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 2.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  ${({ $position }) => $position === 'left' && css`
    left: 0;
  `}
  
  ${({ $position }) => $position === 'right' && css`
    right: 0;
  `}
`;

const HelperText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, $error }) => $error ? theme.colors.error : theme.colors.textLight};
`;

const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  disabled = false,
  required = false,
  error = null,
  helperText = null,
  leftIcon = null,
  rightIcon = null,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span style={{ color: 'red' }}> *</span>}
        </Label>
      )}
      <InputContainer>
        {leftIcon && (
          <IconWrapper $position="left">
            {leftIcon}
          </IconWrapper>
        )}
        <StyledInput
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
          required={required}
          $error={!!error}
          $leftIcon={!!leftIcon}
          $rightIcon={!!rightIcon}
          {...props}
        />
        {rightIcon && (
          <IconWrapper $position="right">
            {rightIcon}
          </IconWrapper>
        )}
      </InputContainer>
      {(helperText || error) && (
        <HelperText $error={!!error}>
          {error || helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};

export default Input;