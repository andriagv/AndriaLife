import React from "react";
import { Button } from "@/components/ui/button";
import { FilterOption } from "@/interfaces/IProjectService";

interface ProjectFiltersProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ 
  filters, 
  activeFilter, 
  onFilterChange 
}) => {
  if (filters.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      {filters.map((filterOption) => (
        <Button 
          key={filterOption.id}
          className={`filter-btn${activeFilter === filterOption.id ? ' filter-btn-active' : ''}`}
          onClick={() => onFilterChange(filterOption.id)}
        >
          {filterOption.label}
        </Button>
      ))}
    </div>
  );
};

export default ProjectFilters;