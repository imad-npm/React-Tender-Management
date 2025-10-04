import FilterBar from '../components/FilterBar';
import TenderTable from '../components/TenderTable';
import { useTenderStore, useFilteredTenders } from '../store/tenderStore';

const TenderListPage = () => {
  const {
    filters,
    availableTags,
    availableUsers,
    setFilters,
    setSelectedTenderForPreview,
    setSelectedTenderForChat,
    setSelectedTenderForAction,
  } = useTenderStore();

  const filteredTenders = useFilteredTenders();

  return (
    <>
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={availableTags}
        availableUsers={availableUsers.map(u => u.id)}
      />
      <TenderTable />
    </>
  );
};

export default TenderListPage;
