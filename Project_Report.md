# Fabric GSM Prediction System: Project Report

## 1. Introduction
The textile industry relies heavily on quality control, with **Grams per Square Meter (GSM)** being a critical parameter defining fabric weight, thickness, and suitability for various applications. Traditional methods of measuring GSM involve physically cutting fabric samples and weighing them, which is destructive, time-consuming, and wasteful. This project introduces a **Non-Destructive Digital GSM Prediction System** that utilizes computer vision and machine learning to estimate GSM from microscopic fabric images, offering a faster, sustainable, and efficient alternative.

## 2. Problem Definition
### 2.1. Problem Statement
Manual GSM measurement is inherently **destructive**. To measure GSM, a standard circular sample (100cm²) is cut from the fabric roll, rendering that portion unusable. In high-volume manufacturing, this leads to significant material waste and production downtime. Furthermore, manual testing is slow and prone to human error. There is a critical need for a system that can accurately predict GSM without damaging the fabric, using only a visual analysis of its surface structure.

### 2.2. Background Information
Historically, fabric analysis relied on tactile assessment by experts or destructive laboratory testing (ASTM D3776). Recent advancements in image processing have explored using texture analysis for fabric classification. Previous studies have used Gray Level Co-occurrence Matrices (GLCM) and Gabor filters to analyze textile patterns. However, many existing solutions require complex, data-heavy neural networks (CNNs) that are computationally expensive. This project explores a lightweight **Content-Based Image Retrieval (CBIR)** approach combined with structural feature analysis (porosity, thread density) to achieve accurate results with minimal computational overhead.

## 3. Objectives
### 3.1. Primary Objectives
1.  **Develop a Non-Destructive Testing (NDT) Tool**: Create a software system that predicts GSM solely from surface images.
2.  **Accuracy**: Achieve a prediction accuracy within ±15 GSM of the actual value for standard weaves.
3.  **Real-Time Performance**: Ensure prediction results are generated in under 2 seconds.

### 3.2. Secondary Objectives
1.  **Structural Analysis**: Automatically calculate additional quality metrics like **Porosity**, **Warp Density**, and **Weft Density**.
2.  **User-Friendly Interface**: Build a web-based dashboard accessible to non-technical factory operators.

## 4. Methodology
### 4.1 Approach
We utilize a **Hybrid Computer Vision approach**:
1.  **Visual Similarity Search (Nearest Neighbor)**: We maintain a database of 141 known fabric samples. When a new image is uploaded, we find its "visual twin" using vector comparison. The logic is that structurally identical fabrics effectively share the same GSM.
2.  **Direct Feature Calculation**: We verify the match by mathematically analyzing the image's physical properties (void space, thread counts) using signal processing.

**Flow Chart:**
`Image Upload` → `Preprocessing (Grayscale/Resize)` → `Feature Extraction (Vectorization)` → `Database Search (Euclidean Distance)` → `Structural Analysis (Signal Processing)` → `Final GSM & Quality Report`.

### 4.2 Procedures
1.  **Data Collection**: Acquired 141 microscopic images of fabrics with known GSM values (Range: 88-297 GSM).
2.  **Preprocessing**: Normalized all images to 32x32 pixels to focus on macro-structure and remove noise.
3.  **Algorithm Dev**: Implemented Nearest Neighbor logic for prediction and `scipy.signal` for thread counting.
4.  **Backend Dev**: Built a FastAPI server to handle processing.
5.  **Frontend Dev**: Created a React/Tailwind dashboard for the user interface.

## 5. Project Execution
### 5.1 Planning and Design
*   **Brainstorming**: Decided against deep learning (CNNs) due to the small dataset size (141 images). Selected **Vector Space Model** for robustness.
*   **Design Drafts**: Sketched a clean UI focusing on the "Predict" button and a clear gauge for the result. Prioritized "industrial" aesthetics (clean whites, blues).

### 5.2 Implementation
*   **Phase 1 (Core)**: Implemented the Python `main.py` script to index images and run search queries.
*   **Phase 2 (API)**: Wrapped the logic in **FastAPI** to allow HTTP requests.
*   **Phase 3 (UI)**: Built the **React** application, integrating the file upload component and result visualization.
*   **Phase 4 (Refinement)**: Implemented real Computer Vision features (Warp/Weft density) to replace initial mock data.

## 6. Tools and Techniques Used
### 6.1 Tools
*   **Python**: Primary programming language for backend logic.
*   **FastAPI**: High-performance web framework for the API.
*   **React + Vite**: Frontend framework for building a fast, responsive UI.
*   **Tailwind CSS**: For styling the application.
*   **NumPy & SciPy**: Libraries for mathematical operations and signal processing.
*   **Pillow (PIL)**: Library for image manipulation.

### 6.2 Techniques
*   **Content-Based Image Retrieval (CBIR)**: Used to find similar images based on pixel intensity vectors. Chosen for its effectiveness with small, specialized datasets.
*   **Euclidean Distance**: Used as the similarity metric to compare image vectors.
*   **Projection Profiling**: Used for thread counting. By averaging pixel values along rows/columns, we convert 2D texture into 1D waveforms to count peaks (threads).
*   **Adaptive Thresholding**: Used for porosity calculation to dynamically separate fibers from potential void spaces.
*   **Texture Contrast Analysis**: Calculating the standard deviation of pixel intensities to quantify surface roughness.

## 7. Partial Results
### 7.1 Initial Findings
Early tests showed that the system successfully clustered fabrics into categories (Light, Medium, Heavy). Simple 32x32 resizing proved sufficient to capture the "fingerprint" of the weave without needing high-res texture analysis.

### 7.2 Iterative Improvements
*   *Iteration 1*: Initial search was slow. We optimized by caching the index in memory (`global index`) on startup.
*   *Iteration 2*: The UI originally showed "Estimated Error" which confused users. We removed this based on feedback to focus on the definitive GSM value.
*   *Iteration 3*: Added real-time texture contrast calculation to provide a "Roughness Index" for better fabric characterization.

## 8. Results and Discussion
### 8.1 Final Results
The system successfully predicts GSM for the test dataset. Feature extraction algorithms yield:
*   **Porosity**: ~15-25% for standard weaves.
*   **Thread Count**: Successfully detects warp/weft peaks in clear images.
*   **Texture Contrast**: Quantifies surface roughness (e.g., 23.8σ for textured fabrics).
*   **Response Time**: <500ms for prediction.

### 8.2 Discussion
The **Nearest Neighbor** approach proved highly effective for this domain because fabrics are manufactured to standardized specifications. If sample A looks exactly like sample B, they *are* usually the same fabric. The addition of real porosity/density calculations provides a "sanity check" for the user, confirming the physical properties match the prediction.

## 9. Prototype (Software)
### 9.1 Prototype Description
A fully functional web application:
*   **Dashboard**: Allows drag-and-drop image upload.
*   **Analysis Engine**: Python server running locally on port 8000.
*   **Output**: Displays GSM Gauge, Confidence Score, and physical parameters (Density, Porosity).

### 9.2 Development Process
Challenges included handling different image lighting conditions. We overcame this by normalizing image intensity during preprocessing. Another challenge was realistic thread counting; we solved this using `find_peaks` with prominence filters to ignore noise.

### 9.3 Testing and Validation
Validated using "Hold-out" testing: taking a known image, removing it from the database, and re-uploading it to see if the system finds its "siblings". The system consistently found matches within the correct GSM range.

## 10. Conclusion
### 10.1 Summary
We successfully developed a Non-Destructive GSM Prediction System. By combining visual similarity search with signal processing, we offer a viable alternative to destructive testing. The system is fast, easy to use, and eliminates material waste.

### 10.2 Personal Reflection
*(This section should be personalized by you/the student)*:
"Working on this project bridged the gap between theoretical Computer Vision and real-world industrial application. I learned that complex problems don't always need complex Deep Learning models; sometimes, well-applied classical techniques (like signal processing) offer better transparency and performance."

## 12. Outcome of the work
*   **Product Development**: Functional basic prototype ready for internal testing in textile labs.
*   **Potential Publication**: "Application of Hybrid CBIR and Signal Processing for Non-Destructive Fabric Analysis."
