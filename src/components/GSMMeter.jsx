import React from 'react';
import { clsx } from 'clsx';

export function GSMMeter({ value, category }) {
    // Normalize value for display (assuming 0-400 range usually)
    const percentage = Math.min((value / 400) * 100, 100);

    const getColor = () => {
        switch (category) {
            case 'Light': return 'text-green-500 border-green-500';
            case 'Medium': return 'text-blue-500 border-blue-500';
            case 'Heavy': return 'text-orange-500 border-orange-500';
            default: return 'text-gray-400 border-gray-300';
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className={clsx(
                "relative w-48 h-48 rounded-full border-8 flex items-center justify-center transition-colors duration-500",
                getColor()
            )}>
                <div className="text-center">
                    <span className="block text-4xl font-bold text-gray-900">{value}</span>
                    <span className="text-sm font-medium text-gray-500 uppercase">GSM</span>
                </div>
            </div>
            <div className={clsx(
                "mt-4 px-4 py-1.5 rounded-full text-sm font-semibold border",
                category === 'Light' && "bg-green-50 text-green-700 border-green-200",
                category === 'Medium' && "bg-blue-50 text-blue-700 border-blue-200",
                category === 'Heavy' && "bg-orange-50 text-orange-700 border-orange-200",
                !category && "bg-gray-100 text-gray-500"
            )}>
                {category || 'Unknown Category'}
            </div>
        </div>
    );
}
