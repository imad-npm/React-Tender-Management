
import React, { useState, useRef } from 'react';
import { useUpdateTenderMutation } from '../../services/tenderApi';
import { Priority } from '../../types/tender';
import { priorityConfig } from '../../utils/stageConfig';
import NativeSelect from '../../ui/NativeSelect';
import useClickOutside from '../../hooks/useClickOutside';

interface PriorityEditorProps {
  tenderId: string;
  currentPriority: Priority;
}

const PriorityEditor: React.FC<PriorityEditorProps> = ({ tenderId, currentPriority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTender] = useUpdateTenderMutation();
  const editorRef = useRef(null);

  useClickOutside(editorRef, () => setIsEditing(false));

  const handlePriorityChange = (newPriority: string | number) => {
    updateTender({ id: tenderId, priority: newPriority as Priority });
    setIsEditing(false);
  };

  const priorityInfo = priorityConfig[currentPriority];
  const options = Object.keys(priorityConfig).map((p) => ({
    value: p,
    label: priorityConfig[p as Priority].label,
  }));

  return (
    <div ref={editorRef} onClick={() => setIsEditing(true)} className="cursor-pointer">
      {isEditing ? (
        <NativeSelect
          options={options}
          value={currentPriority}
          onChange={handlePriorityChange}
        />
      ) : (
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${priorityInfo.color}`}>
          <div className={`w-2 h-2 rounded-full ${priorityInfo.dotColor}`}></div>
          {priorityInfo.label}
        </div>
      )}
    </div>
  );
};

export default PriorityEditor;
