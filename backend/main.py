import os
import glob
import re
from typing import List, Tuple
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from PIL import Image
import numpy as np
from io import BytesIO

from scipy import signal

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FeatureVector:
    def __init__(self, path: str, gsm: int, vector: np.ndarray):
        self.path = path
        self.gsm = gsm
        self.vector = vector


index: List[FeatureVector] = []
DATA_DIR = os.path.join(os.path.dirname(__file__), "data", "gsm")

def extract_features(image: Image.Image) -> np.ndarray:
    """
    Extracts a simply feature vector:
    1. Resize to 32x32 (preserve structure)
    2. Convert to grayscale
    3. Flatten
    This acts as a structural fingerprint.
    """
    
    img_small = image.resize((32, 32)).convert("L")
    arr = np.array(img_small).flatten() / 255.0
    return arr

def analyze_structure(image: Image.Image) -> dict:
    """
    Performs real Computer Vision analysis on the fabric structure.
    """
    
    img_gray = image.convert("L")
    img_arr = np.array(img_gray)
    
    
    mean_intensity = np.mean(img_arr)
    
    
    threshold = mean_intensity - (np.std(img_arr) * 0.5)
    void_pixels = np.sum(img_arr < threshold)
    total_pixels = img_arr.size
    porosity = (void_pixels / total_pixels) * 100
    

    fiber_fraction = 100 - porosity
    
    warp_profile = np.mean(img_arr, axis=0)
    

    weft_profile = np.mean(img_arr, axis=1)
    
    warp_peaks, _ = signal.find_peaks(warp_profile, distance=5, prominence=5)
    weft_peaks, _ = signal.find_peaks(weft_profile, distance=5, prominence=5)
    
    
    h, w = img_arr.shape
    warp_density = (len(warp_peaks) / w) * 100
    weft_density = (len(weft_peaks) / h) * 100
 
    texture_contrast = np.std(img_arr)
    
    return {
        "warpDensity": f"{warp_density:.1f}",
        "weftDensity": f"{weft_density:.1f}",
        "porosity": round(porosity, 1),
        "fiberAreaFraction": round(fiber_fraction, 1),
        "meanIntensity": int(mean_intensity),
        "textureContrast": round(texture_contrast, 1)
    }

def build_index():
    """Looads all images and builds the feature index."""
    global index
    print("Building index from:", DATA_DIR)
    
    folder_pattern = re.compile(r'(\d+)-(\d+)')
    
  
    count = 0
    for root, dirs, files in os.walk(DATA_DIR):
        folder_name = os.path.basename(root)
        match = folder_pattern.match(folder_name)
        
        if match:
            gsm = int(match.group(2))
            
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png', '.tiff')):
                    try:
                        path = os.path.join(root, file)
                        with Image.open(path) as img:
                            vector = extract_features(img)
                            index.append(FeatureVector(path, gsm, vector))
                            count += 1
                    except Exception as e:
                        print(f"Error loading {file}: {e}")
                        
    print(f"Index built! Loaded {count} fabric samples.")

@app.on_event("startup")
async def startup_event():
    build_index()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Receives an image, finds the nearest visual neighbor in the dataset,
    and returns its GSM.
    """
    contents = await file.read()
    image = Image.open(BytesIO(contents))
    

    query_vector = extract_features(image)
    

    best_match = None
    min_dist = float('inf')
    
    for item in index:
        dist = np.linalg.norm(query_vector - item.vector)
        if dist < min_dist:
            min_dist = dist
            best_match = item
            
    if best_match:
       
        confidence = max(50, min(99, int(100 - min_dist * 2)))
  
        real_features = analyze_structure(image)
        
        return {
            "id": os.path.basename(best_match.path),
            "gsm": best_match.gsm,
            "confidence": confidence,
            "category": 'Light' if best_match.gsm < 200 else 'Medium' if best_match.gsm < 250 else 'Heavy',
            "timestamp": "Now",
            "features": real_features,
            "matchedImage": best_match.path 
        }
    else:
        return {"error": "No matches found"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
