import React from 'react';
import { Filters, TenderStage, Priority } from '../types/tender';
import { stageConfig, priorityConfig } from '../utils/stageConfig';

interface UseFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  availableTags: string[];
  availableUsers: { value: string; label: string }[];
}

export const useFilters = ({ filters, onFiltersChange, availableTags, availableUsers }: UseFiltersProps) => {
  const updateFilters = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      stages: [],
      users: [],
      priorities: [],
      tags: [],
      dateRange: { start: '', end: '' },
      isArchived: false,
    });
  };

  const clearSingleFilter = (key: keyof Filters) => {
    if (key === 'dateRange') {
      updateFilters(key, { start: '', end: '' });
    } else if (key === 'isArchived') {
      updateFilters(key, false);
    } else {
      updateFilters(key, []);
    }
  };

  const hasActiveFilters =
    filters.search ||
    filters.stages.length ||
    filters.users.length ||
    filters.priorities.length ||
    filters.tags.length ||
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.isArchived;

  const stageOptions = Object.keys(stageConfig).map(stage => ({
    value: stage,
    label: stageConfig[stage as TenderStage].label,
  }));

  const priorityOptions = Object.keys(priorityConfig).map(priority => ({
    value: priority,
    label: priorityConfig[priority as Priority].label,
  }));

  const tagOptions = availableTags.map(tag => ({ value: tag, label: tag }));
  const userOptions = availableUsers;

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
      label: availableUsers.find(user => user.value === u)?.label || u,
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

  if (filters.isArchived) {
    activeTags.push({
      label: 'Archived Tenders',
      key: 'isArchived',
      value: 'true',
    });
  }

  return {
    updateFilters,
    clearFilters,
    clearSingleFilter,
    hasActiveFilters,
    activeTags,
    stageOptions,
    priorityOptions,
    tagOptions,
    userOptions,
  };
};
