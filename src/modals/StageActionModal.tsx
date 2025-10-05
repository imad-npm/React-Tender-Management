import React, { useState, useEffect } from 'react';
import { X, ArrowRight, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import { TenderStage } from '../types/tender';
import { StageActionModalProps } from '../types/modals';
import { stageConfig } from '../utils/stageConfig';
import { useUpdateTenderMutation } from '../services/tenderApi'; // Keep this import
import { useGetUsersQuery } from '../services/userApi'; // New import
import SearchableSelect from '../ui/SearchableSelect';

const StageActionModal: React.FC<StageActionModalProps> = ({
  tender,
  isOpen,
  onClose,
}) => {
  const [updateTender, { isLoading: isUpdatingStage }] = useUpdateTenderMutation();
  const { data: availableUsers = [] } = useGetUsersQuery();

  const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    if (tender) {
      setSelectedUser(tender.responsibleMember.id);
    }
  }, [tender]);

  if (!isOpen || !tender) return null;

  const currentStageConfig = stageConfig[tender.stage];
  const availableActions = currentStageConfig.actions;

  const handleAction = async (action: string, nextStage: TenderStage) => {
    if (!selectedUser) {
      alert('Please select a responsible member.');
      return;
    }

    setSelectedAction(action);

    const responsibleUser = availableUsers.find(u => u.id === selectedUser);
    if (responsibleUser) {
      try {
        await updateTender({
          id: tender.id,
          stage: nextStage,
          responsibleMember: responsibleUser,
        }).unwrap();
        onClose();
      } catch (error) {
        console.error('Failed to update tender:', error);
        alert('Failed to update tender stage.');
      }
    }
    setSelectedAction('');
  };

  const getActionDescription = (nextStage: TenderStage) => {
    const nextStageConfig = stageConfig[nextStage];
    return `This will move the tender to "${nextStageConfig.label}" stage.`;
  };

  const userOptions = availableUsers.map(user => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center py-5 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Stage Actions</h2>
            <p className="text-gray-600 text-sm mt-1">{tender.tenderName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Current Stage */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Stage</h3>
            <div
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${currentStageConfig.color} ${currentStageConfig.bgColor} ${currentStageConfig.textColor}`}
            >
              <currentStageConfig.icon className="w-4 h-4" />
              {currentStageConfig.label}
            </div>
          </div>

          {/* Available Actions */}
          {availableActions.length > 0 ? (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Available Actions</h3>

              {/* Grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {availableActions.map((actionItem) => {
                  const nextStageConfig = stageConfig[actionItem.nextStage];
                  const ActionIcon = actionItem.icon;

                  return (
                    <div
                      key={actionItem.action}
                      className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {/* Header */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ActionIcon className={`w-4 h-4 ${actionItem.iconColor}`} />
                            <span className="font-medium text-gray-900">
                              {actionItem.label}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Next Stage */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-gray-600">Next stage:</span>
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${nextStageConfig.color} ${nextStageConfig.bgColor} ${nextStageConfig.textColor}`}
                          >
                            <nextStageConfig.icon className="w-3 h-3" />
                            {nextStageConfig.label}
                          </div>
                        </div>

                        {/* Responsible Member */}
                        {!['no-go', 'reject', 'cancel'].includes(actionItem.action) && (
                          <SearchableSelect
                            label="Assign Responsible"
                            options={userOptions}
                            value={selectedUser}
                            onChange={setSelectedUser}
                            placeholder="Select a user"
                            icon={Users}
                          />
                        )}

                        <p className="text-xs text-gray-600 mt-2">
                          {getActionDescription(actionItem.nextStage)}
                        </p>

                        {actionItem.isDestructive && (
                          <div className="flex items-center gap-2 p-2 bg-red-50 rounded-md mt-3">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-xs text-red-700">
                              This action cannot be undone
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Footer (button) */}
                      <button
                        onClick={() =>
                          handleAction(actionItem.action, actionItem.nextStage)
                        }
                        disabled={isUpdatingStage || !selectedUser}
                        className={`mt-4 w-full px-4 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${actionItem.color}`}
                      >
                        {isUpdatingStage && selectedAction === actionItem.action ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          actionItem.label
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Actions Available</h3>
              <p className="text-gray-600">
                This tender is in a final stage with no further actions required.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StageActionModal;