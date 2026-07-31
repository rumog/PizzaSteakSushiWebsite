import type { InferenceResponse } from '../types/inference'

export async function runInference(file: File): Promise<InferenceResponse> {
  const formData = new FormData()

  // the parameter has to be named the same as what's expected in our fastapi
  // inference service.  See that conde to confirm (or the sawgger page)
  formData.append('image_upload', file)

  const response = await fetch('/api/predict', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Inference request failed: ${response.status}`)
  }
  return response.json()
}
