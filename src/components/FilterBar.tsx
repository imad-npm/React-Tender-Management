import React from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Filters, TenderStage, Priority } from '../types/tender';
import { stageConfig, priorityConfig } from '../utils/stageConfig';
import { useTenderStore } from '../store/tenderStore';
import NativeSelect from '../ui/NativeSelect';
import DatePicker from '../ui/DatePicker';

const FilterBar: React.FC = () => {
  const { filters, setFilters, availableTags, availableUsers } = useTenderStore();
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
      dateRange: { start: '', end: '' },
    });
  };

  const clearSingleFilter = (key: keyof Filters) => {
    updateFilters(key, key === 'dateRange' ? { start: '', end: '' } : []);
  };

  const hasActiveFilters =
    filters.search ||
    filters.stages.length ||
    filters.users.length ||
    filters.priorities.length ||
    filters.tags.length ||
    filters.dateRange.start ||
    filters.dateRange.end;

  const stageOptions = Object.keys(stageConfig).map(stage => ({
    value: stage,
    label: stageConfig[stage as TenderStage].label,
  }));

  const priorityOptions = Object.keys(priorityConfig).map(priority => ({
    value: priority,
    label: priorityConfig[priority as Priority].label,
  }));

  const tagOptions = availableTags.map(tag => ({ value: tag, label: tag }));
  const userOptions = availableUsers.map(user => ({ value: user.id, label: user.name }));

  // Collect all active filter tags for display
  const activeTags: { label: string; key: keyof Filters; value: string }[] = [];

  filters.stages.forEach(stage => {
    activeTags.push({
      label: stageConfig[stage as TenderStage]?.label || stage,
      key: 'stages',
      value: stage,
    });
  });

  filters.priorities.forEach(p => {
    activeTags.push({
      label: priorityConfig[p as Priority]?.label || p,
      key: 'priorities',
      value: p,
    });
  });

  filters.tags.forEach(t => {
    activeTags.push({ label: t, key: 'tags', value: t });
  });

  filters.users.forEach(u => {
    activeTags.push({
      label: availableUsers.find(user => user.id === u)?.name || u,
      key: 'users',
      value: u,
    });
  });

  if (filters.dateRange.start) {
    activeTags.push({
      label: `From ${filters.dateRange.start}`,
      key: 'dateRange',
      value: 'start',
    });
  }

  if (filters.dateRange.end) {
    activeTags.push({
      label: `To ${filters.dateRange.end}`,
      key: 'dateRange',
      value: 'end',
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Top Row */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Search */}
        <div className="flex-1 min-w-[280px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by tender name, reference number, or agency..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={filters.search}
            onChange={e => updateFilters('search', e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

     

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NativeSelect
            label="Stage"
            options={stageOptions}
            value={filters.stages[0] || ''}
            onChange={value => updateFilters('stages', value ? [value as TenderStage] : [])}
            placeholder="All Stages"
          />

          <NativeSelect
            label="Priority"
            options={priorityOptions}
            value={filters.priorities[0] || ''}
            onChange={value => updateFilters('priorities', value ? [value as Priority] : [])}
            placeholder="All Priorities"
          />

          <NativeSelect
            label="Tag"
            options={tagOptions}
            value={filters.tags[0] || ''}
            onChange={value => updateFilters('tags', value ? [value] : [])}
            placeholder="All Tags"
          />

          <NativeSelect
            label="Responsible Member"
            options={userOptions}
            value={filters.users[0] || ''}
            onChange={value => updateFilters('users', value ? [value] : [])}
            placeholder="All Members"
          />

          <DatePicker
            label="Start Date"
            value={filters.dateRange.start}
            onChange={value => updateFilters('dateRange', { ...filters.dateRange, start: value })}
          />
          <DatePicker
            label="End Date"
            value={filters.dateRange.end}
            onChange={value => updateFilters('dateRange', { ...filters.dateRange, end: value })}
          />
        </div>
      )}
       {/* Active Filters Badges */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeTags.map((tag, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
            >
              {tag.label}
              <button
                onClick={() => clearSingleFilter(tag.key as keyof Filters)}
                className="hover:text-blue-900 focus:outline-none"
                aria-label={`Remove ${tag.label}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
