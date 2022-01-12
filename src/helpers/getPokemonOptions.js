import pokemonApi from "../api/pokemonApi"

/**
 *
 * @returns
 */
export const getPokemons = () => {
  const pokemons = Array.from(Array(650))

  return pokemons.map((_, index) => index + 1)
}

/**
 *
 * @param {*} param0
 * @returns
 */
export const getPokemonNames = async ([a, b, c, d] = []) => {
  const [p1, p2, p3, p4] = await Promise.all([
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ])

  return [
    { id: p1.data.id, name: p1.data.name },
    { id: p2.data.id, name: p2.data.name },
    { id: p3.data.id, name: p3.data.name },
    { id: p4.data.id, name: p4.data.name },
  ]
}

/**
 *
 * @returns
 */
const getPokemonOptions = () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

  return getPokemonNames(mixedPokemons.splice(0, 4))
}

export default getPokemonOptions
