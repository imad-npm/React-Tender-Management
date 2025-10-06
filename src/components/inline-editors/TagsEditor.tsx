import React, { useState, KeyboardEvent, useRef } from 'react';
import { useUpdateTenderMutation } from '../../services/tenderApi';
import { X } from 'lucide-react';
import useClickOutside from '../../hooks/useClickOutside';

interface TagsEditorProps {
  tenderId: string;
  currentTags: string[];
}

const TagsEditor: React.FC<TagsEditorProps> = ({ tenderId, currentTags }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState(currentTags);
  const [updateTender] = useUpdateTenderMutation();
  const editorRef = useRef(null);

  useClickOutside(editorRef, () => {
    if (isEditing) {
      handleSave();
    }
  });

  const handleSave = () => {
    updateTender({ id: tenderId, tags });
    setIsEditing(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  if (!isEditing) {
    return (
      <div onClick={() => setIsEditing(true)} className="cursor-pointer flex flex-wrap gap-1">
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
          >
            {tag}
          </span>
        ))}
        {tags.length > 2 && (
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-md">
            +{tags.length - 2}
          </span>
        )}
      </div>
    );
  }

  return (
    <div ref={editorRef} className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg bg-gray-50">
        {tags.map(tag => (
          <div key={tag} className="flex items-center gap-1 bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-medium">
            {tag}
            <button onClick={() => handleRemoveTag(tag)} className="text-gray-500 hover:text-gray-800">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Add tags..."
        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TagsEditor;