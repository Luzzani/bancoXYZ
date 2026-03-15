export const COLORS = {
  primary: '#004A99',
  secondary: '#FFB81C',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  text: {
    primary: '#1A1C1E',
    secondary: '#6C757D',
    inverse: '#FFFFFF',
    placeholder: '#999999',
    disabled: '#A1A1A1',
  },
  status: {
    success: '#28A745',
    error: '#DC3545',
    errorLight: '#FEE2E2',
    errorBorder: '#FECACA',
    warning: '#FFC107',
    info: '#17A2B8',
    disabled: '#bdc3c7',
  },
  border: '#E1E4E8',
  divider: '#f0f0f0',
} as const;

export type ColorType = typeof COLORS;
