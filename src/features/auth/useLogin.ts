import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../store/slices/auth/thunks';
import { clearError } from '../../store/slices/auth';
import { FormErrors } from './types';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { error: serverError, isLoading } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleLogin = () => {
    setFormErrors({});
    const newErrors: FormErrors = {};

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim()) {
      newErrors.email = 'El correo es obligatorio.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Formato inválido.';
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    dispatch(login({ email: email.trim(), password }));
  };

  const onEmailChange = (text: string) => {
    setEmail(text.replace(/\s/g, ''));
    if (formErrors.email) setFormErrors(prev => ({ ...prev, email: undefined }));
    if (serverError) dispatch(clearError());
  };

  const onPasswordChange = (text: string) => {
    setPassword(text);
    if (formErrors.password) setFormErrors(prev => ({ ...prev, password: undefined }));
    if (serverError) dispatch(clearError());
  };

  return {
    handleLogin,
    isLoading,
    error: {
      ...formErrors,
      ...(serverError ? { general: serverError.message } : {}),
    },
    onEmailChange,
    onPasswordChange,
    isValid: email.length > 0 && password.length > 6,
    email,
    password,
  };
};
