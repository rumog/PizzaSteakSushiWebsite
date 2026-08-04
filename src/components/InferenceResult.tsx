interface InferenceResultProps {
  label: string
  confidence: number
}

function getPredictionEmoji(label: string): string {
  switch (label.toLowerCase()) {
    case 'gyoza':
      return '🥟'
    case 'ice_cream':
      return '🍨'
    case 'nachos':
      return '🧀' // closest available; no official nachos emoji
    case 'pancakes':
      return '🥞'
    case 'pizza':
      return '🍕'
    case 'ramen':
      return '🍜'
    case 'steak':
      return '🥩'
    case 'sushi':
      return '🍣'
    case 'takoyaki':
      return '🐙' // closest available; no official takoyaki emoji
    case 'waffles':
      return '🧇'
    default:
      return '🍽️'
  }
}
export function InferenceResult({ label, confidence }: InferenceResultProps) {
  const confidencePercent = (confidence * 100).toFixed(1)

  const emoji = getPredictionEmoji(label)
  return (
    <section className="prediction-card">
      <h2>
        Prediction: {emoji} {label}!
      </h2>
      <p>
        Confidence: <strong>{confidencePercent}%</strong>
      </p>
    </section>
  )
}
