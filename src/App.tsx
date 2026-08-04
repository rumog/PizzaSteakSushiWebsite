import { useState } from 'react'
import { ImageUploader } from './components/ImageUploader'
import './App.css'
import { InferenceResult } from './components/InferenceResult'
import type { InferenceResponse } from './types/inference'

function App() {
  const [result, setResult] = useState<InferenceResponse | null>(null)
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Tiny Food Predictor</h1>
        <ImageUploader onResult={setResult} />

        {result && (
          <InferenceResult label={result.result.class_name} confidence={result.result.confidence} />
        )}
      </div>
    </main>
  )
}

export default App
