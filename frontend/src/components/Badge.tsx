import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'VALID' | 'CONFIRMED' | 'INVALID' | 'CANCELLED' | 'USED' | 'PENDING' | 'EXPIRED' | 'ACTIVE' | 'INACTIVE' | 'WRONG_DATE' | 'DELIVERED' | string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className, ...props }) => {
  const colors: Record<string, string> = {
    VALID: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    CONFIRMED: 'bg-blue-100 text-blue-800 border border-blue-200',
    DELIVERED: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    ACTIVE: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    INVALID: 'bg-red-100 text-red-800 border border-red-200',
    CANCELLED: 'bg-red-100 text-red-800 border border-red-200',
    USED: 'bg-purple-100 text-purple-800 border border-purple-200',
    INACTIVE: 'bg-gray-100 text-gray-800 border border-gray-200',
    WRONG_DATE: 'bg-amber-100 text-amber-800 border border-amber-200',
    PENDING: 'bg-amber-100 text-amber-800 border border-amber-200',
    EXPIRED: 'bg-amber-100 text-amber-800 border border-amber-200',
  };

  const displayStatus = status === 'USED' || status === 'DELIVERED' ? 'ENTREGADO' : status === 'CONFIRMED' ? 'CONFIRMADO' : status === 'CANCELLED' ? 'CANCELADO' : status;

  return (
    <span
      className={twMerge(
        clsx('px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide', colors[status] || 'bg-gray-100 text-gray-800'),
        className
      )}
      {...props}
    >
      {displayStatus}
    </span>
  );
};
