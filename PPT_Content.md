# Non-Destructive Digital GSM Prediction System (Presentation Outline)

## 1. Introduction
*   Introduction to the project: A digital system for fabric GSM measurement.
*   Concept: Replacing physical cutting/weighing with computer vision prediction.
*   Goal: Sustainable, fast, and non-destructive quality control.

## 2. Project Overview
*   **What it is:** A web-based dashboard + image processing backend.
*   **Input:** Microscopic image of fabric.
*   **Output:** Predicted GSM + Structural Analysis.
*   **Core Benefit:** Eliminates material waste (NDT).

## 3. Problem Definition
### 3.1. Problem Statement
*   Current GSM testing is **destructive** (requires cutting samples).
*   It causes significant **material waste** in mass production.
*   Manual testing is **slow** and prone to human error.

## 4. Objectives
### 4.1. Primary Objectives
1.  **Develop NDT Tool**: Predict GSM from surface images.
2.  **Accuracy**: ±15 GSM tolerance.
3.  **Speed**: Real-time results (< 2s).

### 4.2. Secondary Objectives
1.  **Structural Features**: Calc Porosity, Warp/Weft Density.
2.  **Usability**: Simple UI for factory operators.

## 5. Literature Review
*   **Standard**: ASTM D3776 (Destructive physical weighting).
*   **Texture Analysis**: GLCM, Gabor Filters (Traditional CV).
*   **Deep Learning**: CNNs (Requires massive data, computationally heavy).
*   **Our Gap**: Need for a lightweight solution for small datasets (<500 samples).

## 6. Methodology
### 6.1 Approach
*   **Hybrid Model**:
    1.  **Visual Search (CBIR)**: Finds "visual twin" (Nearest Neighbor).
    2.  **Signal Processing**: Verified by thread counting/porosity calc.

### 6.2 Procedures
1.  **Data**: Index 141 fabric samples.
2.  **Preprocessing**: Resize/Grayscale (32x32 vectors).
3.  **Algorithm**: Peak detection (Density) + Thresholding (Porosity).
4.  **Integration**: React Frontend <-> FastAPI Backend.

## 7. Tools and Techniques Used
### 6.1 Tools
*   **Backend**: Python, FastAPI, NumPy, SciPy.
*   **Frontend**: React, Vite, Tailwind CSS.
*   **Processing**: OpenCV/Pillow.

### 6.2 Techniques
*   **CBIR**: Vector Similarity Search.
*   **Euclidean Distance**: Similarity metric.
*   **Projection Profiling**: 1D counting of thread peaks.
*   **RMS Contrast**: Standard deviation for texture roughness.

## 8. Project Progress
*   [x] Phase 1: Data Collection & Algorithm Design.
*   [x] Phase 2: Backend API Development.
*   [x] Phase 3: Frontend Dashboard & Integration.
*   [x] Phase 4: Real CV Feature Implementation (Density, Porosity, Contrast).

## 9. Results / Simulation
*   **Input**: Sample Image (`WIN_20260120...jpg`).
*   **Predicted**: 97 GSM.
*   **Confidence**: 99%.
*   **Calculated Features**:
    *   Warp Density: 0.6 threads/unit.
    *   Weft Density: 1.5 threads/unit.
    *   Porosity: 22.6%.
    *   Texture Contrast: 23.8σ.

## 10. Challenges Faced
1.  **Lighting Variations**: Solved via mean intensity normalization.
2.  **No Physical Scale**: Solved by using relative density metrics (Threads/View).

## 11. Final Outcome
*   A fully functional **Digital GSM Prediction Dashboard**.
*   **Capability**: Drag-and-drop analysis in <500ms.
*   **Hardware**: Compatible with standard digital microscopes.

## 12. Applications
1.  **Manufacturing QC**: Real-time production line monitoring.
2.  **Remote Buying**: Verifying fabric specs remotely.
3.  **Digital Inventory**: Searchable fabric archives.

## 13. Future Scope
1.  **Mobile App**: Android/iOS version for field use.
2.  **Cloud Database**: Centralized data for multi-factory sync.
3.  **Defect Detection**: Detecting holes/stains alongside GSM.

## 14. Conclusion
*   successfully demonstrated non-destructive testing via Computer Vision.
*   Reduced waste and inspection time.
*   Proven accuracy using hybrid Nearest-Neighbor + Signal Processing.

## 15. References
1.  ASTM D3776 Standard Test Methods.
2.  Haralick et al., "Textural features for image classification".
3.  FastAPI & React Documentation.
