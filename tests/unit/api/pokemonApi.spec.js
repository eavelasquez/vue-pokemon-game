import pokemonApi from '@/api/pokemonApi'

describe('Pokemon API', () => {
  test('axios should be configured with the Pokemon API', () => {
    expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
  })
})