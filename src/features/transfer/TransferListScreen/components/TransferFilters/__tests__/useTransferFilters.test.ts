import { renderHook, act } from '@testing-library/react-native';
import { useTransferFilters } from '../useTransferFilters';
import { TransferHistoryItem } from '../../../../../../api/types';

const mockItems: TransferHistoryItem[] = [
  {
    value: 1500,
    date: '2026-01-10',
    currency: 'ARS',
    payeer: { document: '1', name: 'Juan Perez' },
  },
  {
    value: 2500,
    date: '2026-02-15',
    currency: 'ARS',
    payeer: { document: '2', name: 'Maria Sosa' },
  },
  {
    value: 500,
    date: '2026-01-10',
    currency: 'ARS',
    payeer: { document: '3', name: 'Lucas Gomez' },
  },
];

describe('useTransferFilters Hook', () => {
  it('debería devolver todos los items cuando los filtros están vacíos', () => {
    const { result } = renderHook(() => useTransferFilters(mockItems));
    expect(result.current.filteredItems).toHaveLength(3);
  });

  it('debería filtrar por nombre (case insensitive)', () => {
    const { result } = renderHook(() => useTransferFilters(mockItems));

    act(() => {
      result.current.setters.setName('MARIA');
    });

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].payeer.name).toBe('Maria Sosa');
  });

  it('debería filtrar por monto (coincidencia de inicio)', () => {
    const { result } = renderHook(() => useTransferFilters(mockItems));

    act(() => {
      result.current.setters.setAmount('500');
    });

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].value).toBe(500);
  });

  it('debería filtrar por fecha', () => {
    const { result } = renderHook(() => useTransferFilters(mockItems));

    act(() => {
      result.current.setters.setDate('2026-01-10');
    });

    expect(result.current.filteredItems).toHaveLength(2);
  });

  it('debería combinar múltiples filtros (Nombre y Fecha)', () => {
    const { result } = renderHook(() => useTransferFilters(mockItems));

    act(() => {
      result.current.setters.setName('Juan');
      result.current.setters.setDate('2026-01-10');
    });

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].payeer.name).toBe('Juan Perez');
  });

  it('debería limpiar todos los filtros correctamente', () => {
    const { result } = renderHook(() => useTransferFilters(mockItems));

    act(() => {
      result.current.setters.setName('Juan');
      result.current.clearFilters();
    });

    expect(result.current.filters.name).toBe('');
    expect(result.current.filteredItems).toHaveLength(3);
  });
});
