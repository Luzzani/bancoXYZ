import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { Button } from '../../../../components/common/Button';

interface TransferConfirmModalProps {
  isVisible: boolean;
  data: {
    amount: string;
    recipientDoc: string;
    date: Date;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export const TransferConfirmModal = ({
  isVisible,
  data,
  onConfirm,
  onCancel,
}: TransferConfirmModalProps) => (
  <Modal visible={isVisible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>Revisá los datos</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Destinatario (Doc)</Text>
          <Text style={styles.infoValue}>{data.recipientDoc}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Monto</Text>
          <Text style={[styles.infoValue, { color: COLORS.primary }]}>${data.amount}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fecha</Text>
          <Text style={styles.infoValue}>{data.date.toLocaleDateString('es-AR')}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            text="Modificar"
            onPress={onCancel}
            style={[styles.buttonBase, styles.modifyButton]}
            textStyle={styles.text}
          />

          <Button text="Confirmar" onPress={onConfirm} style={[styles.buttonBase]} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.text.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    paddingBottom: 8,
  },
  infoLabel: { color: COLORS.text.secondary, fontSize: 14 },
  infoValue: { fontWeight: '600', color: COLORS.text.primary, fontSize: 14 },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  buttonBase: {
    flex: 1,
    height: 48,
  },
  modifyButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    color: COLORS.text.primary,
  },
});
