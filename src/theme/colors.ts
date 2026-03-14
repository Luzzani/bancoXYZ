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
  },
  status: {
    success: '#28A745',
    error: '#DC3545',
    errorLight: '#FEE2E2',
    errorBorder: '#FECACA',
    warning: '#FFC107',
    info: '#17A2B8',
  },
  border: '#E1E4E8',
} as const;

export type ColorType = typeof COLORS;
