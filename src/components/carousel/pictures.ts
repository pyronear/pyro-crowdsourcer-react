const importAll = (r: __WebpackModuleApi.RequireContext) => {
  return r.keys().map(r);
}

// Warning: requires webpack
export const  images = importAll(require.context('./pictures', false, /\.(png|jpe?g|svg)$/)) as Array<string>;

export  const pickOne = async () => images[Math.floor(Math.random() * images.length)] as string
