const importAll = (r: __WebpackModuleApi.RequireContext): unknown[] => {
  return r.keys().map(r)
}

// Warning: requires webpack
export const images = importAll(require.context('./pictures', false, /\.(png|jpe?g|svg)$/)) as string[]

export const pickOne = (): string => images[Math.floor(Math.random() * images.length)]
