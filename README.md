# 🌐 Internet Quality Prediction & Visualization

A geospatial machine learning project that analyzes large-scale internet speed data (15GB dataset from Kaggle) to predict and visualize internet quality across regions using an interactive map. **I've used only a sample of original dataset**


## Project Overview

This project builds an **Internet Quality Map** by:

- Processing large-scale internet speed data
- Engineering a custom **Internet Quality Score**
- Training a **Random Forest Regression model**
- Visualizing predictions on an interactive map using **Folium**

The final output is a browser-based map showing internet performance across geographic tiles.


## Dataset

- Source: Kaggle (large-scale internet speed dataset ~15GB)
- Sample used for development: reduced CSV (`sample.csv`)
- Key features:
  - `avg_d_kbps` – Average download speed
  - `avg_u_kbps` – Average upload speed
  - `avg_lat_ms` – Latency (ms)
  - `tests` – Number of tests performed
  - `devices` – Number of devices
  - `tile` – Geospatial tile (WKT format)
  - `quadkey` – Tile identifier


## Data Processing Pipeline

### 1. Unit Conversion
- Convert speeds:
  - kbps → Mbps

### 2. Data Cleaning
- Remove unreliable data:
  - Keep only rows where `tests >= 3`

### 3. Feature Engineering

#### Internet Quality Score:
A weighted metric combining speed and latency:
quality_score =
(download * 0.6) +
(upload * 0.3) -
(latency * 0.01)


### 4. Geospatial Processing
- Convert WKT tiles → geometry using `shapely`
- Extract:
  - Latitude (centroid)
  - Longitude (centroid)



## Machine Learning Model

- Model: **Random Forest Regressor**
- Library: `scikit-learn`

### Features Used:
- Download speed (Mbps)
- Upload speed (Mbps)
- Latency (ms)
- Number of tests
- Number of devices

### Training:
- Train-test split: 80/20
- Trees: 300 estimators
- Parallel processing enabled

### Evaluation Metrics:
- **MAE (Mean Absolute Error)**
- **R² Score**

---

## 🗺️ Visualization

Built using **Folium** with marker clustering.

### Map Features:
- Interactive zoom & pan
- Color-coded internet quality:
  - 🟢 Green → High quality (score ≥ 30)
  - 🟠 Orange → Medium quality (15–30)
  - 🔴 Red → Low quality (< 15)

### Marker Popup Includes:
- Quality score
- Download speed
- Upload speed
- Latency
- Number of tests

## Output Files

- `internet_quality_map.html`  
  → Interactive map (open in browser)

- `internet_quality_map_data.csv`  
  → Processed dataset with:
  - Coordinates
  - Predicted quality scores
  - Speed + latency metrics

