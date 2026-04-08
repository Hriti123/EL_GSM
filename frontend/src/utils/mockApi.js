import axios from 'axios';

/**
 * Mock API for Fabric GSM Prediction System
 * Simulates backend responses for development
 */

// Switch to real backend
export const mockPredict = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('/api/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Prediction API failed:", error);
    throw error;
  }
};

export const mockHistory = [
  {
    id: 1,
    gsm: 245,
    category: 'Medium',
    timestamp: '2023-10-24T10:30:00Z',
    imageUrl: 'https://placehold.co/100x100?text=Fabric+1',
    confidence: 92,
    features: {
      warpDensity: "42.5",
      weftDensity: "38.2",
      porosity: 12,
      fiberAreaFraction: 72,
      meanIntensity: 115
    }
  },
  {
    id: 2,
    gsm: 180,
    category: 'Light',
    timestamp: '2023-10-24T09:15:00Z',
    imageUrl: 'https://placehold.co/100x100?text=Fabric+2',
    confidence: 88,
    features: {
      warpDensity: "35.0",
      weftDensity: "32.0",
      porosity: 18,
      fiberAreaFraction: 58,
      meanIntensity: 140
    }
  },
  {
    id: 3,
    gsm: 310,
    category: 'Heavy',
    timestamp: '2023-10-23T16:45:00Z',
    imageUrl: 'https://placehold.co/100x100?text=Fabric+3',
    confidence: 95,
    features: {
      warpDensity: "55.4",
      weftDensity: "48.9",
      porosity: 8,
      fiberAreaFraction: 85,
      meanIntensity: 90
    }
  }
];
