
import React, { useState, useRef } from 'react';
import { useUpdateTenderMutation } from '../../services/tenderApi';
import { useGetUsersQuery } from '../../services/userApi';
import { User } from '../../types/tender';
import SearchableSelect from '../../ui/SearchableSelect';
import useClickOutside from '../../hooks/useClickOutside';

interface ResponsibleEditorProps {
  tenderId: string;
  currentResponsible: User;
}

const ResponsibleEditor: React.FC<ResponsibleEditorProps> = ({ tenderId, currentResponsible }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTender] = useUpdateTenderMutation();
  const { data: users } = useGetUsersQuery();
  const editorRef = useRef(null);

  useClickOutside(editorRef, () => setIsEditing(false));

  const handleResponsibleChange = (newResponsibleId: string | number) => {
    const newResponsible = users?.find(user => user.id === newResponsibleId);
    if (newResponsible) {
      updateTender({ id: tenderId, responsibleMember: newResponsible });
    }
    setIsEditing(false);
  };

  const userOptions = users?.map(user => ({ value: user.id, label: user.name })) || [];

  return (
    <div ref={editorRef} onClick={() => setIsEditing(true)} className="cursor-pointer">
      {isEditing ? (
        <SearchableSelect
          options={userOptions}
          value={currentResponsible.id}
          onChange={handleResponsibleChange}
        />
      ) : (
        <div className="flex items-center gap-2">
          <img
            src={currentResponsible.avatar}
            alt={currentResponsible.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{currentResponsible.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsibleEditor;
