import React from 'react';
import { X, Download, FileText, Calendar, User } from 'lucide-react';
import { Tender } from '../types/tender';
import { DocumentPreviewModalProps } from '../types/modals';

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  tender,
  isOpen,
  onClose
}) => {
  if (!isOpen || !tender) return null;

  const formatFileSize = (size: string) => size;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tender.tenderName}</h2>
            <p className="text-gray-600 mt-1">{tender.agencyName} • {tender.referenceNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Tender Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tender Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{tender.closingDays}</div>
                <div className="text-sm text-gray-600">Days Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${tender.documentPrice}</div>
                <div className="text-sm text-gray-600">Doc Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{tender.documents.length}</div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{tender.tags.length}</div>
                <div className="text-sm text-gray-600">Tags</div>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
            {tender.documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{document.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(document.uploadedAt)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                        {document.type}
                      </span>
                      <span>{formatFileSize(document.size)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Responsible Member */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsible Member</h3>
            <div className="flex items-center gap-3">
              <img
                src={tender.responsibleMember.avatar}
                alt={tender.responsibleMember.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{tender.responsibleMember.name}</h4>
                <p className="text-sm text-gray-600">{tender.responsibleMember.role}</p>
                <p className="text-sm text-gray-500">{tender.responsibleMember.email}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tender.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;