import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { useLogin } from './useLogin';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const LoginScreen = () => {
  const { email, password, isLoading, error, onEmailChange, onPasswordChange, handleLogin } =
    useLogin();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.brand}>BancoXYZ</Text>
              <Text style={styles.subtitle}>Ingresá tus datos para operar</Text>
            </View>

            <View style={styles.form}>
              <Input
                label="Correo electrónico"
                placeholder="ejemplo@mail.com"
                value={email}
                onChangeText={onEmailChange}
                error={error.email}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                label="Contraseña"
                placeholder="Tu clave de 6 dígitos"
                value={password}
                onChangeText={onPasswordChange}
                error={error.password}
                secureTextEntry
              />

              {error?.general ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error.general}</Text>
                </View>
              ) : null}

              <Button
                text="Entrar"
                onPress={handleLogin}
                isLoading={isLoading}
                disabled={!!error.email || !!error.password}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brand: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: COLORS.status.errorBorder,
    backgroundColor: COLORS.status.errorLight,
  },
  errorBox: {
    backgroundColor: COLORS.status.errorLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.status.errorBorder,
  },
  errorText: {
    color: COLORS.status.error,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
