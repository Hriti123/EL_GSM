import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Minimize2, Maximize2, Layers, Grid, Zap } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function FeatureAnalysis({ features }) {
    if (!features) return null;

    const data = {
        labels: ['Warp Den.', 'Weft Den.', 'Porosity', 'Fiber Area'],
        datasets: [
            {
                label: 'Current Sample',
                data: [
                    parseFloat(features.warpDensity),
                    parseFloat(features.weftDensity),
                    features.porosity,
                    features.fiberAreaFraction
                ],
                backgroundColor: '#3b82f6',
                borderRadius: 4,
            },
            {
                label: 'Std. Average',
                data: [30, 30, 10, 65], // Mock standard values
                backgroundColor: '#e5e7eb',
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <FeatureCard
                    icon={<Grid className="w-4 h-4 text-blue-500" />}
                    label="Warp Density"
                    value={features.warpDensity}
                    unit="yarns/mm"
                />
                <FeatureCard
                    icon={<Grid className="w-4 h-4 text-purple-500 rotate-90" />}
                    label="Weft Density"
                    value={features.weftDensity}
                    unit="yarns/mm"
                />
                <FeatureCard
                    icon={<Minimize2 className="w-4 h-4 text-indigo-500" />}
                    label="Porosity"
                    value={features.porosity}
                    unit="%"
                />
                <FeatureCard
                    icon={<Layers className="w-4 h-4 text-emerald-500" />}
                    label="Fiber Area"
                    value={features.fiberAreaFraction}
                    unit="%"
                />
                <FeatureCard
                    icon={<Zap className="w-4 h-4 text-orange-500" />}
                    label="Texture Contrast"
                    value={features.textureContrast}
                    unit="σ"
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparative Analysis</h3>
                <div className="h-64">
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, label, value, unit }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">{label}</span>
                {icon}
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">{value}</span>
                <span className="text-xs text-gray-400">{unit}</span>
            </div>
        </div>
    );
}
