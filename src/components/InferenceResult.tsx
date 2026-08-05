import { getPredictionEmoji } from '../utils/foodEmoji'

interface InferenceResultProps {
  label: string
  confidence: number
}

export function InferenceResult({ label, confidence }: InferenceResultProps) {
  const confidencePercent = (confidence * 100).toFixed(1)

  const emoji = getPredictionEmoji(label)
  return (
    <section className="mt-8 p-6 rounded-xl bg-stone-100 border border-rose-200">
      <h2>
        Prediction: {emoji} {label}!
      </h2>
      <p>
        Confidence: <strong>{confidencePercent}%</strong>
      </p>
    </section>
  )
}
