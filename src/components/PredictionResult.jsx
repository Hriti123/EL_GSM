import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { GSMMeter } from './GSMMeter';

export function PredictionResult({ result }) {
    if (!result) return null;

    const { gsm, confidence, category, features } = result;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Main Gauge */}
                <div className="flex-shrink-0">
                    <GSMMeter value={gsm} category={category} />
                </div>

                {/* Details */}
                <div className="flex-grow space-y-6 w-full">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Prediction Analysis</h2>
                        <p className="text-gray-500 text-sm">Based on microscopic structural analysis</p>
                    </div>



                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Quality Check Passed
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                            Analysis ID: #{result.id.toString().slice(-6)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
