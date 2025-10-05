import { useGetTendersQuery } from '../services/tenderApi';
import { Filters } from '../types/tender';

// Selector for filtered tenders
export const useFilteredTenders = (filters: Filters) => {
  const { data: tenders = [], isLoading } = useGetTendersQuery();

  if (isLoading) {
    return []; // Return empty array while loading
  }

  return tenders.filter(tender => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        tender.tenderName.toLowerCase().includes(searchLower) ||
        tender.agencyName.toLowerCase().includes(searchLower) ||
        tender.referenceNumber.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    if (filters.stages.length > 0 && !filters.stages.includes(tender.stage)) {
      return false;
    }
    if (filters.priorities.length > 0 && !filters.priorities.includes(tender.priority)) {
      return false;
    }
    if (filters.tags.length > 0 && !filters.tags.some(tag => tender.tags.includes(tag))) {
      return false;
    }
    if (filters.users.length > 0 && !filters.users.includes(tender.responsibleMember.id)) {
      return false;
    }
    if (filters.dateRange.start && new Date(tender.createdAt) < new Date(filters.dateRange.start)) {
      return false;
    }
    if (filters.dateRange.end && new Date(tender.createdAt) > new Date(filters.dateRange.end)) {
      return false;
    }
    return true;
  });
};