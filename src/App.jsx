import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { ImageUpload } from './components/ImageUpload';
import { PredictionResult } from './components/PredictionResult';
import { FeatureAnalysis } from './components/FeatureAnalysis';
import { HistoryPanel } from './components/HistoryPanel';
import { mockPredict, mockHistory } from './utils/mockApi';

function App() {
  const [activeTab, setActiveTab] = useState('predict');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load mock history on mount
    setHistory(mockHistory);
  }, []);

  const handleUpload = async (file) => {
    setIsAnalyzing(true);
    setCurrentResult(null);
    try {
      const result = await mockPredict(file);
      setCurrentResult(result);
      // Add to history
      setHistory(prev => [result, ...prev]);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recoverHistory = (item) => {
    setCurrentResult(item);
    setActiveTab('predict');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">Fabric GSM Analyzer</h1>
                <p className="text-xs text-gray-500">Industrial Quality Control System</p>
              </div>
            </div>

            <nav className="flex space-x-1 items-center">
              <NavTab active={activeTab === 'predict'} onClick={() => setActiveTab('predict')} icon={<LayoutDashboard />}>
                Predict
              </NavTab>

            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex overflow-hidden">
        <main className="flex-grow overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">

            {activeTab === 'predict' && (
              <>
                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Sample Input</h2>
                  <ImageUpload onUpload={handleUpload} isAnalyzing={isAnalyzing} />
                </section>

                {currentResult && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                    <PredictionResult result={currentResult} />

                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Structural Analysis</h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Download Report</button>
                      </div>
                      <FeatureAnalysis features={currentResult.features} />
                    </section>
                  </div>
                )}
              </>
            )}



          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 hidden lg:block bg-white shadow-xl z-20">
          <HistoryPanel history={history} onSelect={recoverHistory} />
        </aside>
      </div>
    </div>
  );
}

function NavTab({ active, children, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-blue-50 text-blue-700"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      )}
    >
      {React.cloneElement(icon, { className: "w-4 h-4" })}
      {children}
    </button>
  );
}

export default App;
