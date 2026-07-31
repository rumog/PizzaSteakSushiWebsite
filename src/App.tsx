
import { useState } from 'react'
import {ImageUploader} from './components/ImageUploader'
import './App.css'
import { InferenceResult } from './components/InferenceResult'
import type { InferenceResponse } from './types/inference'

function App() {
  const [result, setResult] =
    useState<InferenceResponse | null>(null)
  return (
    <main>
      <h1>Pizza Steak Sushi Predictor</h1>
      <ImageUploader onResult={setResult} />

      {result && (<InferenceResult
        label={result.result.class_name}
        confidence={result.result.confidence}
      />
      )}</main>
  )
}

export default App
