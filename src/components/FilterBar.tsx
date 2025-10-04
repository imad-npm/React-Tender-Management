import React from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Filters, TenderStage, Priority } from '../types/tender';
import { stageConfig, priorityConfig } from '../utils/stageConfig';
import { useTenderStore } from '../store/tenderStore';
import MultiSelectFilter from '../ui/MultiSelectFilter';
import DatePicker from '../ui/DatePicker';

const FilterBar: React.FC = () => {
  const {
    filters,
    setFilters,
    availableTags,
    availableUsers,
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

  const stageOptions = (Object.keys(stageConfig) as TenderStage[]).map(stage => ({
    value: stage,
    label: stageConfig[stage].label,
    color: stageConfig[stage].color,
    bgColor: stageConfig[stage].bgColor,
    textColor: stageConfig[stage].textColor,
  }));

  const priorityOptions = (Object.keys(priorityConfig) as Priority[]).map(priority => ({
    value: priority,
    label: priorityConfig[priority].label,
    color: priorityConfig[priority].color,
    dotColor: priorityConfig[priority].dotColor,
  }));

  const tagOptions = availableTags.map(tag => ({
    value: tag,
    label: tag,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    color: 'border-blue-200',
  }));

  const userOptions = availableUsers.map(user => ({
    value: user.id,
    label: user.name,
  }));

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
          <MultiSelectFilter
            label="Stages"
            options={stageOptions}
            selectedValues={filters.stages}
            onChange={(values) => updateFilters('stages', values as TenderStage[])}
          />

          <MultiSelectFilter
            label="Priority"
            options={priorityOptions}
            selectedValues={filters.priorities}
            onChange={(values) => updateFilters('priorities', values as Priority[])}
          />

          <MultiSelectFilter
            label="Tags"
            options={tagOptions}
            selectedValues={filters.tags}
            onChange={(values) => updateFilters('tags', values)}
          />

          <MultiSelectFilter
            label="Responsible Member"
            options={userOptions}
            selectedValues={filters.users}
            onChange={(values) => updateFilters('users', values)}
          />

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="Start Date"
              value={filters.dateRange.start}
              onChange={(value) => updateFilters('dateRange', { ...filters.dateRange, start: value })}
            />
            <DatePicker
              label="End Date"
              value={filters.dateRange.end}
              onChange={(value) => updateFilters('dateRange', { ...filters.dateRange, end: value })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
