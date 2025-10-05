import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TenderTable from '../components/TenderTable';
import { useTenderStore } from '../store/tenderStore';
import { useFilteredTenders } from '../hooks/useFilteredTenders';
import { Filters } from '../types/tender';

const TenderListPage = () => {
  const {
    availableTags,
    availableUsers,
  } = useTenderStore();

  const [filters, setFilters] = useState<Filters>({
    search: '',
    stages: [],
    users: [],
    priorities: [],
    tags: [],
    dateRange: { start: '', end: '' },
  });

  const filteredTenders = useFilteredTenders(filters);

  return (
    <>
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={availableTags}
        availableUsers={availableUsers.map(u => ({ value: u.id, label: u.name }))}
      />
      <TenderTable tenders={filteredTenders} />
    </>
  );
};

export default TenderListPage;
