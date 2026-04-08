import React, { useCallback, useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';

export function ImageUpload({ onUpload, isAnalyzing }) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onUpload(file);
        }
    };

    const clearImage = (e) => {
        e.stopPropagation();
        setPreview(null);
        // Note: Parent component should handle clearing prediction state
    };

    return (
        <div className="w-full">
            <div
                className={clsx(
                    "relative w-full h-80 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden bg-white",
                    dragActive && "border-blue-500 bg-blue-50",
                    !dragActive && !preview && "border-gray-300 hover:border-gray-400",
                    preview && "border-none"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {isAnalyzing ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Analyzing Fabric Structure...</p>
                        <p className="text-gray-400 text-sm mt-1">Measuring yarn density & weaving pattern</p>
                    </div>
                ) : preview ? (
                    <div className="relative w-full h-full group">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={clearImage}
                                className="bg-white/90 text-red-600 p-3 rounded-full hover:bg-white transition-transform transform hover:scale-105"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        {/* Guidelines Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-3 rounded-lg text-white/90 text-xs">
                            Preview Mode • {preview ? 'Ready for detailed analysis' : ''}
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Upload Fabric Sample</h3>
                        <p className="text-gray-500 mt-2 mb-6 max-w-sm mx-auto">
                            Drag & drop your microscopic fabric image here, or browse files
                        </p>
                        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-blue-200">
                            Browse Files
                            <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
                        </label>
                        <p className="mt-4 text-xs text-gray-400">
                            Supports JPG, PNG, TIFF (Microscope Quality Recommended)
                        </p>
                    </div>
                )}
            </div>

            {/* Imaging Guidelines */}
            <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-lg p-4">
                <h4 className="flex items-center text-sm font-semibold text-blue-800 mb-2">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Imaging Guidelines
                </h4>
                <ul className="text-xs text-blue-700/80 space-y-1 list-disc list-inside">
                    <li>Ensure uniform lighting across the fabric surface</li>
                    <li>Magnification should clearly show yarn structure</li>
                    <li>Avoid blurred or out-of-focus areas</li>
                    <li>Sample should be flat and wrinkle-free</li>
                </ul>
            </div>
        </div>
    );
}
