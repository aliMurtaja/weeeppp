import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import dashboardRepository from '../services/dashboardRepository';

// Custom hooks wrap React Query + Repository.
// This keeps components "dumb" and makes data access consistent.

export function usePracticeOverview() {
  return useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: () => dashboardRepository.getOverview(),
  });
}

export function useAppointments({ size = 1000 } = {}) {
  const query = useQuery({
    queryKey: ['dashboard-appointments', size],
    queryFn: () => dashboardRepository.getAppointments(size),
    keepPreviousData: true,
  });

  return query;
}

export function useDrFirst() {
  return useQuery({
    queryKey: ['dashboard-drfirst'],
    queryFn: () => dashboardRepository.getDrFirst(),
  });
}

export function useReadyForDoctor() {
  return useQuery({
    queryKey: ['dashboard-ready-for-doctor'],
    queryFn: () => dashboardRepository.getReadyForDoctor(),
  });
}

// Example of memoized selector to avoid recomputing derived data in components.
export function useFilteredAppointments({ size = 1000, searchText }) {
  const { data, ...rest } = useAppointments({ size });

  const filteredRows = useMemo(() => {
    const rows = data?.rows ?? [];
    if (!searchText) return rows;

    const lower = searchText.toLowerCase();
    return rows.filter((row) =>
      row.patient.toLowerCase().includes(lower),
    );
  }, [data, searchText]);

  return { data: data ? { ...data, rows: filteredRows } : data, ...rest };
}


