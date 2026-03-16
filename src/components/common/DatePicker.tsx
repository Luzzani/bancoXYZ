import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { COLORS } from '../../theme/colors';
import { Button } from './Button';

interface DatePickerProps {
  isVisible: boolean;
  value: Date;
  onClose: () => void;
  onChange: (date: Date) => void;
  minimumDate?: Date;
}

export const DatePicker = ({
  isVisible,
  value,
  onClose,
  onChange,
  minimumDate,
}: DatePickerProps) => {
  const [tempDate, setTempDate] = useState(value);

  if (!isVisible && tempDate !== value) {
    setTempDate(value);
  }

  const handleOnChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      onClose();
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  if (Platform.OS === 'android') {
    if (!isVisible) return null;
    return (
      <DateTimePicker
        value={value}
        mode="date"
        display="default"
        onChange={handleOnChange}
        minimumDate={minimumDate}
      />
    );
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="inline"
                onChange={handleOnChange}
                minimumDate={minimumDate}
              />
              <View style={styles.pickerButtons}>
                <Button
                  text="Cancelar"
                  onPress={() => {
                    setTempDate(value);
                    onClose();
                  }}
                  style={styles.cancelDateButton}
                  textStyle={styles.cancelDateText}
                />
                <Button
                  text="Confirmar"
                  onPress={() => {
                    onChange(tempDate);
                    onClose();
                  }}
                  style={styles.confirmDateButton}
                  textStyle={styles.confirmDateText}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    width: '90%',
  },
  pickerButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelDateButton: {
    flex: 1,
    height: 'auto',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  cancelDateText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmDateButton: {
    flex: 1,
    height: 'auto',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  confirmDateText: {
    color: COLORS.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
