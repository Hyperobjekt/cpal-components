import { range } from 'd3-array'
import { scaleQuantile } from 'd3-scale'

export function updatePercentiles(
  featureCollection,
  accessor,
) {
  const { features } = featureCollection
  const scale = scaleQuantile()
    .domain(features.map(accessor))
    .range(range(9))
  return {
    type: 'FeatureCollection',
    features: features.map(f => {
      const value = accessor(f)
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      }
      return { ...f, properties }
    }),
  }
}

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const addRandomStateChoro = (
  featureCollection,
  accessor,
) => {
  const { features } = featureCollection
  // Generate a random number between 0 and 3
  // const num = getRandomInt(4)
  return {
    type: 'FeatureCollection',
    features: features.map(f => {
      const value = accessor(f)
      delete f.properties.income
      const properties = {
        ...f.properties,
        value,
        // percentile: getRandomInt(4),
        hasActions: getRandomInt(2),
      }
      return { ...f, properties }
    }),
  }
}

export const filterDistantStates = (data, state) => {
  console.log('filterDistantStates()')
  const { features } = data
  return {
    type: 'FeatureCollection',
    features: features.filter(f => {
      return f.properties.name === state
      // const value = accessor(f);
      // const properties = {
      //   ...f.properties,
      //   value,
      //   percentile: getRandomInt(4),
      //   hasActions: getRandomInt(2)
      // };
      // return {...f, properties};
    }),
  }
  // return data.filter((f) => { return f.properties.name === state })
}
