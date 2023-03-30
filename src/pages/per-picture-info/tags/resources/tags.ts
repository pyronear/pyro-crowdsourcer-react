import smoke from './smoke.png'
import fire from './fire.png'
import fog from './fog.png'
import sky from './sunnysky.png'
import clouds from './clouds.png'
import none from './none.png'

export interface TagInfo { title: string, image: string }

export const allTags = ['clouds', 'fire', 'fog', 'smoke', 'sky', 'none'] as const
export type AllTags = typeof allTags[number]

export const tags: Record<AllTags, TagInfo> = {
  clouds: { title: 'Nuages', image: clouds },
  fire: { title: 'Feu', image: fire },
  fog: { title: 'Brouillard', image: fog },
  smoke: { title: 'Fumée', image: smoke },
  sky: { title: 'Ciel', image: sky },
  none: { title: 'Aucun', image: none }
} as const
