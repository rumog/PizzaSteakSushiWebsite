import {useState} from 'react'
import type { ChangeEvent } from 'react'
import { runInference } from '../services/inferenceapi'
import type { InferenceResponse } from '../types/inference'

interface ImageUploaderProps {
  onResult: (result: InferenceResponse) => void
}

export function ImageUploader({
  onResult,
}: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event.target.files?.[0] ?? null
    setFile(selectedFile)
    setError(null)

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  async function handleSubmit() {
    if (!file) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await runInference(file)

      onResult(result)
    } catch (err) {
      const message = 
        err instanceof Error
        ? err.message
        : ' An unexpected error occurred.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return(
    <section>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {file && (
        <div className="image-preview">
        <p>
          Selected: {file.name}
        </p>

        {previewUrl && (
          <img
          src={previewUrl}
          alt="Selected image preview"
          />
        )}
        </div>
      )}

      <button
      type="button"
      disabled={!file || loading}
      onClick={handleSubmit}
      >
        {loading ? 'Running...' : 'Make Prediction'}
      </button>
      {error && (
        <p role="alert">
          {error}
        </p>
      )}
    </section>
  )
}
