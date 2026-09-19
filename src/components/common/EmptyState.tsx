import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <BookOpen className="w-10 h-10 text-gray-400" />,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-800 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mt-1 mb-4">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
