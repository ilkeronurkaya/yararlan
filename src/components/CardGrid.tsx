import React from 'react';
import Card from './Card';

interface Tool {
  id: number;
  slug: string;
  name: string;
  url: string;
  logo_url?: string;
  short_description: string;
  category: string;
  click_count: number;
  purpose?: string;
}

interface CardGridProps {
  tools: Tool[];
}

const CardGrid: React.FC<CardGridProps> = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tools.map((tool) => (
        <Card key={tool.id} {...tool} />
      ))}
    </div>
  );
};

export default CardGrid;
