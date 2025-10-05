// src/lib/api.ts

const fromEnv = import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL =
  import.meta.env.PROD
    ? (fromEnv ?? (() => { throw new Error('VITE_API_BASE_URL missing in prod build'); })())
    : (fromEnv ?? 'http://localhost:8000');

// Data Models from FastAPI
export interface TrainRequest {
  model_type: string;
  params: Record<string, any>;
}

export interface PredictRequest {
  kicid: string;
  model_type: string;
  mission: string;
  planet_star_radius_ratio?: number;
  a_by_rstar?: number;
  inclination_deg?: number;
}

export interface PredictBatchRequest {
  csv_blob_path: string;
  model_type: string;
}

export interface PredictResponse {
    features: Record<string, any>;
    prediction: number;
    prediction_proba: number | null;
}

export interface TrainResponse {
    message: string;
}

export interface HealthResponse {
    Health: string;
}

export interface BatchPredictResponse {
    results: Record<string, any>[];
}


/**
 * Fetches the health status of the API.
 * @returns A promise that resolves to the health status.
 */
export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch API health.');
  }
  return response.json();
}

/**
 * Sends a request to train a model.
 * @param request The training request payload.
 * @returns A promise that resolves to the training response.
 */
export async function trainModel(request: TrainRequest): Promise<TrainResponse> {
  const response = await fetch(`${API_BASE_URL}/trainer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to train model.');
  }
  return response.json();
}

/**
 * Sends a request for a real-time prediction.
 * @param request The prediction request payload.
 * @returns A promise that resolves to the prediction response.
 */
export async function predictRealtime(request: PredictRequest): Promise<PredictResponse> {
  const response = await fetch(`${API_BASE_URL}/predict-realtime`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to get prediction.');
  }
  return response.json();
}

/**
 * Uploads a file to blob storage.
 * @param file The file to upload.
 * @returns A promise that resolves to the path of the uploaded blob.
 */
export async function uploadFile(file: File): Promise<{ blob_path: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload-to-blob/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to upload file.');
  }
  return response.json();
}

/**
 * Sends a request for batch prediction.
 * @param request The batch prediction request payload.
 * @returns A promise that resolves to the batch prediction response.
 */
export async function predictBatch(request: PredictBatchRequest): Promise<BatchPredictResponse> {
  const response = await fetch(`${API_BASE_URL}/predict-batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to get batch predictions.');
  }
  return response.json();
}
