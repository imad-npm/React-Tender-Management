import React from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Filters, TenderStage, Priority } from '../types/tender';
import { stageConfig, priorityConfig } from '../utils/stageConfig';
import { useTenderStore } from '../store/tenderStore';

const FilterBar: React.FC = () => {
  const {
    filters,
    setFilters,
    availableTags,
    // availableUsers, // This is the full user object, we only need the id
  } = useTenderStore();

  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

  const updateFilters = (key: keyof Filters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      stages: [],
      users: [],
      priorities: [],
      tags: [],
      dateRange: { start: '', end: '' }
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.stages.length > 0 || 
    filters.users.length > 0 || 
    filters.priorities.length > 0 || 
    filters.tags.length > 0 ||
    filters.dateRange.start ||
    filters.dateRange.end;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by tender name, reference number, or agency..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={filters.search}
            onChange={(e) => updateFilters('search', e.target.value)}
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
          {/* Stage Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stages</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(stageConfig) as TenderStage[]).map((stage) => {
                const config = stageConfig[stage];
                const isSelected = filters.stages.includes(stage);
                return (
                  <button
                    key={stage}
                    onClick={() => {
                      const newStages = isSelected
                        ? filters.stages.filter(s => s !== stage)
                        : [...filters.stages, stage];
                      updateFilters('stages', newStages);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? `${config.bgColor} ${config.textColor} border ${config.color}`
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex gap-2">
              {(Object.keys(priorityConfig) as Priority[]).map((priority) => {
                const config = priorityConfig[priority];
                const isSelected = filters.priorities.includes(priority);
                return (
                  <button
                    key={priority}
                    onClick={() => {
                      const newPriorities = isSelected
                        ? filters.priorities.filter(p => p !== priority)
                        : [...filters.priorities, priority];
                      updateFilters('priorities', newPriorities);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? config.color
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = filters.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      const newTags = isSelected
                        ? filters.tags.filter(t => t !== tag)
                        : [...filters.tags, tag];
                      updateFilters('tags', newTags);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.dateRange.start}
                onChange={(e) => updateFilters('dateRange', { ...filters.dateRange, start: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.dateRange.end}
                onChange={(e) => updateFilters('dateRange', { ...filters.dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
