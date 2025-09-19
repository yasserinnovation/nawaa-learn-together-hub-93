
import React from 'react';
import AddToolButton from './AddToolButton';

interface ToolsHeaderProps {
  toolCount: number;
  onSortChange: (value: string) => void;
}

const ToolsHeader = ({ toolCount, onSortChange }: ToolsHeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold text-foreground">Available Tools ({toolCount})</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-muted-foreground">Sort by:</label>
          <select 
            id="sort-select"
            className="border border-border rounded p-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort tools by"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <AddToolButton />
      </div>
    </header>
  );
};

export default ToolsHeader;
