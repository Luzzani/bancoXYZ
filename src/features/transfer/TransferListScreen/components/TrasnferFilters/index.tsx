import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Input } from '../../../../../components/common/Input';
import { COLORS } from '../../../../../theme/colors';

interface TransferFiltersProps {
  name: string;
  amount: string;
  date: string;
  setName: (text: string) => void;
  setAmount: (text: string) => void;
  setDate: (text: string) => void;
  onClear: () => void;
}

export const TransferFilters = ({
  name,
  amount,
  date,
  setName,
  setAmount,
  setDate,
  onClear,
}: TransferFiltersProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const getDisplayDate = () => {
    if (!date) return '';
    const [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`;
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (event.type === 'set' && selectedDate) {
      const y = selectedDate.getFullYear();
      const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const d = String(selectedDate.getDate()).padStart(2, '0');
      setDate(`${y}-${m}-${d}`);
    }
  };

  const hasFilters = name || amount || date;

  return (
    <View style={styles.container}>
      <Input
        label="Destinatario"
        placeholder="Ej: Marta Gómez"
        value={name}
        onChangeText={setName}
        autoCorrect={false}
      />

      <View style={styles.row}>
        <View style={styles.flex1}>
          <Input
            label="Monto"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={styles.flex1}
          onPress={() => setShowPicker(true)}
          activeOpacity={0.7}>
          <View pointerEvents="none">
            <Input
              label="Fecha"
              placeholder="Seleccionar"
              value={getDisplayDate()}
              editable={false}
            />
          </View>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date ? new Date(date + 'T12:00:00') : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {hasFilters && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearButtonText}>Limpiar filtros</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  clearButton: {
    marginTop: 4,
    alignItems: 'center',
    paddingVertical: 8,
  },
  clearButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
