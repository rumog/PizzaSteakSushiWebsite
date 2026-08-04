const FOOD_EMOJIS: Record<string, string> = {
  gyoza: '🥟',
  ice_cream: '🍨',
  nachos: '🧀',
  pancakes: '🥞',
  pizza: '🍕',
  ramen: '🍜',
  steak: '🥩',
  sushi: '🍣',
  takoyaki: '🐙',
  waffles: '🧇',
}

export function getPredictionEmoji(label: string): string {
  return FOOD_EMOJIS[label.toLowerCase()] ?? '🍽️'
}
