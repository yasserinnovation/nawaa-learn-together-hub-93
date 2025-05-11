
import React from 'react';
import AddToolButton from './AddToolButton';

interface ToolsHeaderProps {
  toolCount: number;
  onSortChange: (value: string) => void;
}

const ToolsHeader = ({ toolCount, onSortChange }: ToolsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold">Available Tools ({toolCount})</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select 
            className="border rounded p-1 text-sm"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <AddToolButton />
      </div>
    </div>
  );
};

export default ToolsHeader;
