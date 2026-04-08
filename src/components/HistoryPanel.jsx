import React, { useState } from 'react';
import { Search, History, Download, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export function HistoryPanel({ history, onSelect }) {
    const [filter, setFilter] = useState('');

    // Filter history based on ID or Category
    const filteredHistory = history.filter(item =>
        item.category.toLowerCase().includes(filter.toLowerCase()) ||
        item.id.toString().includes(filter)
    );

    return (
        <div className="h-full bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-100">
                <h3 className="flex items-center text-sm font-bold text-gray-800 mb-4">
                    <History className="w-4 h-4 mr-2" />
                    Recent Analysis
                </h3>

                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search history..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-2 space-y-2">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                        >
                            <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-gray-900">{item.gsm} GSM</span>
                                    <span className={clsx(
                                        "text-[10px] px-1.5 py-0.5 rounded-full font-medium border",
                                        item.category === 'Light' && "bg-green-50 text-green-700 border-green-200",
                                        item.category === 'Medium' && "bg-blue-50 text-blue-700 border-blue-200",
                                        item.category === 'Heavy' && "bg-orange-50 text-orange-700 border-orange-200"
                                    )}>
                                        {item.category}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 truncate">
                                    {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No history found
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <button className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                </button>
            </div>
        </div>
    );
}
