import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { runInference } from '../services/inferenceapi'
import type { InferenceResponse } from '../types/inference'

interface ImageUploaderProps {
  onResult: (result: InferenceResponse) => void
}

export function ImageUploader({ onResult }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
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
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-400">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="
          block
          w-full
          text-sm
          text-gray-600
          file:mr-4
          file:rounded-lg
          file:border-0
          file:bg-stone-200
          file:px-4
          file:py-2
          file:font-semibold
          file:text-rose-900
          hover:file:bg-stone-300
        "
        />
      </div>

      {file && (
        <div className="space-y-4 rounded-xl bg-gray-50 p-5">
          <p className="text-sm text-gray-600">
            Selected:
            <span className="ml-2 font-medium text-gray-900">{file.name}</span>
          </p>

          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Selected image preview"
                className="
                max-h-72
                rounded-xl
                object-contain
                shadow-md
              "
              />
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        disabled={!file || loading}
        onClick={handleSubmit}
        className="
        w-full
        rounded-xl
        bg-rose-700
        px-6
        py-3
        font-semibold
        text-white
        shadow
        transition
        hover:bg-rose-700
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
      >
        {loading ? 'Running...' : 'Make Prediction'}
      </button>
      {error && (
        <p
          role="alert"
          className="
          rounded-lg
          bg-red-50
          p-4
          text-sm
          text-red-700
        "
        >
          {error}
        </p>
      )}
    </section>
  )
}
