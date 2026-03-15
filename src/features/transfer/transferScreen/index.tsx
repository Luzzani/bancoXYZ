import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTransfer } from './useTransfer';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { COLORS } from '../../../theme/colors';
import { RootStackParamList } from '../../../navigation/types';
import { TransferConfirmModal } from './components/TrasnferConfirmModal';

type Props = NativeStackScreenProps<RootStackParamList, 'TransferForm'>;

export const TransferScreen = ({ navigation }: Props) => {
  const { form, status, confirmation, isReady } = useTransfer();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardStyle}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Transferir dinero</Text>
            <Text style={styles.subtitle}>Ingresá el DNI/CUIT y el monto.</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="DNI/CUIT del Destinatario"
              placeholder="Ej: 20384445551"
              value={form.recipientDoc}
              onChangeText={form.setRecipientDoc}
              keyboardType="numeric"
            />

            <Input
              label="Monto a enviar"
              placeholder="$ 0.00"
              value={form.amount}
              onChangeText={form.setAmount}
              keyboardType="numeric"
              error={status.localError}
            />

            <View style={styles.dateSection}>
              <Text style={styles.label}>Fecha de ejecución</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => form.setShowDatePicker(true)}
                activeOpacity={0.7}>
                <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
                <Text style={styles.dateText}>{form.date.toLocaleDateString('es-AR')}</Text>
              </TouchableOpacity>
            </View>

            {form.showDatePicker && (
              <DateTimePicker
                value={form.date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={new Date()}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  form.setShowDatePicker(false);
                  if (event.type === 'set' && selectedDate) {
                    form.setDate(selectedDate);
                  }
                }}
              />
            )}
          </View>

          <View style={styles.footer}>
            <Button
              text="Confirmar Operación"
              onPress={confirmation.show}
              isLoading={status.isLoading}
              disabled={!isReady}
            />
          </View>
        </ScrollView>

        <TransferConfirmModal
          isVisible={confirmation.isVisible}
          data={{
            amount: form.amount,
            recipientDoc: form.recipientDoc,
            date: form.date,
          }}
          onCancel={confirmation.hide}
          onConfirm={confirmation.confirm}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardStyle: { flex: 1 },
  container: { flex: 1, backgroundColor: COLORS.background },
  backButton: { paddingHorizontal: 24, paddingTop: 8 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16, flexGrow: 1 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text.primary },
  subtitle: { fontSize: 16, color: COLORS.text.secondary, marginTop: 8 },
  form: { flex: 1 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
    marginLeft: 4,
  },
  dateSection: { marginBottom: 24 },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateText: { marginLeft: 12, fontSize: 16, color: COLORS.text.primary },
  footer: { marginTop: 24 },
});
