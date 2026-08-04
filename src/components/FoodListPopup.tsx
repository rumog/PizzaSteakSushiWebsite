import { getPredictionEmoji } from '../utils/foodEmoji'

interface FoodListPopupProps {
  foods: string[]
  open: boolean
  onClose: () => void
}

export function FoodListPopup({ foods, open, onClose }: FoodListPopupProps) {
  if (!open) return null

  return (
    <>
      {/* clicking outside closes */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      <section className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-80 rounded-xl bg-white shadow-2xl">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-bold">Foods I Can Predict:</h2>

          <button onClick={onClose} className="text-xl hover:text-red-500" aria-label="Close">
            x
          </button>
        </div>

        <ul className="max-h-80 overflow-y-auto p-4 space-y-2">
          {foods.map((food) => (
            <li key={food} className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100">
              <span className="text-2xl">{getPredictionEmoji(food)}</span>
              <span>{food.replace('_', ' ')}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
