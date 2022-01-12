import getPokemonOptions, { getPokemons, getPokemonNames } from '@/helpers/getPokemonOptions'


describe('getPokemonOptions helpers', () => {
  test('should return an array of numbers', () => {
    const pokemons = getPokemons()

    expect(pokemons.length).toBe(650)
    expect(pokemons[0]).toBe(1)
    expect(pokemons[500]).toBe(501)
  })

  test('should return an array of 4 elements with names of pokemons', async () => {
    const pokemons = await getPokemonNames([1, 2, 3, 4])
    
    expect(pokemons).toStrictEqual([
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' },
      { id: 4, name: 'charmander' },
    ])
  })
  
  test('getPokemonOptions should return a mixed array ', async() => {
    const pokemons = await getPokemonOptions()

    expect(pokemons.length).toBe(4)
    expect(pokemons).toEqual([
      { id: expect.any(Number), name: expect.any(String) },
      { id: expect.any(Number), name: expect.any(String) },
      { id: expect.any(Number), name: expect.any(String) },
      { id: expect.any(Number), name: expect.any(String) },
    ])
  })
})
