import { useEffect, useState } from 'react'
import { ImageUploader } from './components/ImageUploader'
import { getClassList } from './services/inferenceapi'
import { FoodListPopup } from './components/FoodListPopup'
import './App.css'
import { InferenceResult } from './components/InferenceResult'
import type { InferenceResponse, InferenceGetClassListResponse } from './types/inference'

function App() {
  const [result, setResult] = useState<InferenceResponse | null>(null)
  const [classListResponse, setClassListResponse] = useState<InferenceGetClassListResponse | null>(
    null,
  )
  const [showFoodList, setShowFoodList] = useState(false)

  useEffect(() => {
    async function loadClassList() {
      try {
        const response = await getClassList()
        setClassListResponse(response)
      } catch (error) {
        console.error('Failed to load calss list:', error)
      }
    }
    loadClassList()
  }, [])

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-tl
        from-orange-100
        via-amber-100
        to-rose-100
        flex
        items-center
        justify-center
        p-4
        sm:p-6
      "
    >
      <div
        className="
            w-full
            max-w-xl
            rounded-2xl
            bg-white
            shadow-lg
            p-4
            sm:p-6
            md:p-8
          "
      >
        <h1 className="text-4xl font-bold text-center mb-8">Tiny Food Predictor</h1>
        <ImageUploader onResult={setResult} />
        <button
          onClick={() => setShowFoodList(true)}
          className="mt-4 text-rose-600 underline hover:text-blue-800"
        >
          See all foods I can predict
        </button>
        {result && (
          <InferenceResult label={result.result.class_name} confidence={result.result.confidence} />
        )}
        {classListResponse && (
          <FoodListPopup
            foods={classListResponse.result.class_list}
            open={showFoodList}
            onClose={() => setShowFoodList(false)}
          />
        )}
      </div>
    </main>
  )
}

export default App
