import { Building2 } from 'lucide-react';
import KPICards from './components/KPICards';
import FilterBar from './components/FilterBar';
import TenderTable from './components/TenderTable';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import ChatPanel from './components/ChatPanel';
import StageActionModal from './components/StageActionModal';
import { useTenderStore, useFilteredTenders } from './store/tenderStore';

function App() {
  // Get state and actions from the Zustand store
  const {
    kpiData,
    filters,
    availableTags,
    availableUsers,
    selectedTenderForPreview,
    selectedTenderForChat,
    selectedTenderForAction,
    chatMessages,
    setFilters,
    sendMessage,
    changeTenderStage,
    setSelectedTenderForPreview,
    setSelectedTenderForChat,
    setSelectedTenderForAction,
  } = useTenderStore();

  // Get the derived/computed filtered tenders
  const filteredTenders = useFilteredTenders();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tender Management</h1>
              <p className="text-gray-600">Track and manage your tender pipeline efficiently</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <KPICards data={kpiData} />

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={availableTags}
          availableUsers={availableUsers.map(u => u.id)}
        />

        {/* Tender Table */}
        <TenderTable
          tenders={filteredTenders}
          onDocumentPreview={setSelectedTenderForPreview}
          onOpenChat={setSelectedTenderForChat}
          onStageAction={setSelectedTenderForAction}
        />
      </main>

      {/* Modals and Panels */}
      <DocumentPreviewModal
        tender={selectedTenderForPreview}
        isOpen={!!selectedTenderForPreview}
        onClose={() => setSelectedTenderForPreview(null)}
      />

      <ChatPanel
        tender={selectedTenderForChat}
        isOpen={!!selectedTenderForChat}
        onClose={() => setSelectedTenderForChat(null)}
        messages={chatMessages}
        onSendMessage={sendMessage}
      />

      <StageActionModal
        tender={selectedTenderForAction}
        isOpen={!!selectedTenderForAction}
        onClose={() => setSelectedTenderForAction(null)}
        onStageChange={changeTenderStage}
      />
    </div>
  );
}

export default App;
