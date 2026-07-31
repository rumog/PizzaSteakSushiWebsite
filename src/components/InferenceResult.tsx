interface InferenceResultProps {
  label: string
  confidence: number
}

function getPredictionEmoji(label: string): string {
  switch (label.toLowerCase()) {
    case 'pizza':
      return '🍕'
    case 'sushi':
      return '🍣'
    case 'steak':
      return '🥩'
    default:
      return '🍽️'
  }
}
export function InferenceResult({
  label,
  confidence,
}: InferenceResultProps) {
  const confidencePercent = 
    (confidence * 100).toFixed(1)
  
    const emoji =
    getPredictionEmoji(label)
  return(
    <section className="prediction-card">
      <h2>
        Prediction: {emoji} {label}!
      </h2>
      <p>
        Confidence:
        {' '}
        <strong>{confidencePercent}%</strong>
      </p>
    </section>
  )
}