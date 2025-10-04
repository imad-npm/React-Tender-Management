import { Routes, Route } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import ChatPanel from './components/ChatPanel';
import StageActionModal from './components/StageActionModal';
import { useTenderStore } from './store/tenderStore';
import NavigationBar from './components/NavigationBar';
import TenderListPage from './pages/TenderListPage';
import PipelinePage from './pages/PipelinePage';

function App() {
  const {
    selectedTenderForPreview,
    selectedTenderForChat,
    selectedTenderForAction,
    chatMessages,
    sendMessage,
    changeTenderStage,
    setSelectedTenderForPreview,
    setSelectedTenderForChat,
    setSelectedTenderForAction,
  } = useTenderStore();

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

      {/* Navigation */}
      <NavigationBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<TenderListPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
        </Routes>
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
