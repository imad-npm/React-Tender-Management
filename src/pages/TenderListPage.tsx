import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TenderTable from '../components/TenderTable';
import { useTenderStore } from '../store/tenderStore';
import { useFilteredTenders } from '../hooks/useFilteredTenders';
import { Filters, Tender } from '../types/tender';
import DocumentPreviewModal from '../modals/DocumentPreviewModal';
import ChatPanel from '../modals/ChatPanel';
import StageActionModal from '../modals/StageActionModal';

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

  const [selectedTenderForPreview, setSelectedTenderForPreview] = useState<Tender | null>(null);
  const [selectedTenderForChat, setSelectedTenderForChat] = useState<Tender | null>(null);
  const [selectedTenderForAction, setSelectedTenderForAction] = useState<Tender | null>(null);

  const filteredTenders = useFilteredTenders(filters);

  return (
    <>
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={availableTags}
        availableUsers={availableUsers.map(u => ({ value: u.id, label: u.name }))}
      />
      <TenderTable 
        tenders={filteredTenders} 
        onOpenChat={(tender: Tender) => setSelectedTenderForChat(tender)}
        onStageAction={(tender: Tender) => setSelectedTenderForAction(tender)}
      />
      <DocumentPreviewModal
        tender={selectedTenderForPreview}
        isOpen={!!selectedTenderForPreview}
        onClose={() => setSelectedTenderForPreview(null)}
      />
      <ChatPanel
        tender={selectedTenderForChat}
        isOpen={!!selectedTenderForChat}
        onClose={() => setSelectedTenderForChat(null)}
      />
      <StageActionModal
        tender={selectedTenderForAction}
        isOpen={!!selectedTenderForAction}
        onClose={() => setSelectedTenderForAction(null)}
      />
    </>
  );
};

export default TenderListPage;
