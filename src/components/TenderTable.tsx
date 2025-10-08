import React from 'react';
import { FileText, MessageCircle, Calendar, DollarSign, Building, ArrowRight, Archive } from 'lucide-react';
import { stageConfig, priorityConfig } from '../utils/stageConfig';
import { formatCurrency } from '../utils/formatters';
import CopyableReference from './CopyableReference';
import { Tender } from '../types/tender';
import PriorityEditor from './inline-editors/PriorityEditor';
import TagsEditor from './inline-editors/TagsEditor';
import ResponsibleEditor from './inline-editors/ResponsibleEditor';
import { useUpdateTenderMutation } from '../services/tenderApi';

interface TenderTableProps {
  tenders: Tender[];
  onOpenChat: (tender: Tender) => void;
  onStageAction: (tender: Tender) => void;
}

const TenderTable: React.FC<TenderTableProps> = ({ tenders, onOpenChat, onStageAction }) => {
  const [updateTender] = useUpdateTenderMutation();

  const handleArchive = (tender: Tender) => {
    updateTender({ id: tender.id, isArchived: !tender.isArchived });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tender Info</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Stage</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Priority</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tags</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Responsible</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tenders.map((tender) => {
              const stageInfo = stageConfig[tender.stage];
              const StageIcon = stageInfo.icon;
              const availableActionsCount = stageInfo.actions.length;

              return (
                <tr key={tender.id} className="hover:bg-gray-50 transition-colors">
                  {/* Tender Info */}
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-base">{tender.tenderName}</h3>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span>{tender.agencyName}</span>
                        </div>
                        <div className="">
                         <CopyableReference referenceNumber={tender.referenceNumber} />

                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className={`font-medium ${tender.closingDays <= 7 ? 'text-red-600' : tender.closingDays <= 14 ? 'text-orange-600' : 'text-green-600'}`}>
                            {tender.closingDays} days left
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{formatCurrency(tender.documentPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Stage */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center  gap-2">
                      <div className={`flex items-center w-48 min-w-32 justify-center gap-2 px-3  py-2 rounded-full text-sm font-medium border ${stageInfo.color} ${stageInfo.bgColor} ${stageInfo.textColor}`}>
                        <StageIcon className="w-4 h-4" />
                        {stageInfo.label}
                      </div>
                    
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="py-4 px-6">
                    <PriorityEditor tenderId={tender.id} currentPriority={tender.priority} />
                  </td>

                  {/* Tags */}
                  <td className="py-4 px-6">
                    <TagsEditor tenderId={tender.id} currentTags={tender.tags} />
                  </td>

                  {/* Responsible Member */}
                  <td className="py-4 px-6">
                    <ResponsibleEditor tenderId={tender.id} currentResponsible={tender.responsibleMember} />
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                   
                      <button
                        onClick={() => onOpenChat(tender)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Open Discussion"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      {availableActionsCount > 0 && (
                        <button
                          onClick={() => onStageAction(tender)}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Stage Actions"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                         <button
                        onClick={() => handleArchive(tender)}
                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title={tender.isArchived ? 'Unarchive' : 'Archive'}
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {tenders.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenders found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default TenderTable;

