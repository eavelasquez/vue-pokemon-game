import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions.vue'

import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: { pokemons },
    })
  })

  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="options-container">
        <ul>
          <li>bulbasaur</li>
          <li>ivysaur</li>
          <li>venusaur</li>
          <li>charmander</li>
        </ul>
      </div>
    `)
  })

  test('should display all 4 options correctly', () => {
    const liTags = wrapper.findAll('li')
    
    expect(liTags.length).toBe(4)
    for (let i = 0; i < liTags.length; i++) {
      expect(liTags[i].text()).toBe(pokemons[i].name)
    }
  })

  test('should emit "selection-pokemon" with their respective parameters when clicking', () => {
    const [li1, li2, li3, li4] = wrapper.findAll('li')

    li1.trigger('click')
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')

    const emitted = wrapper.emitted('selectionPokemon')

    expect(emitted.length).toBe(4)
    expect(emitted[0]).toStrictEqual([1])
    expect(emitted[1]).toStrictEqual([2])
    expect(emitted[2]).toStrictEqual([3])
    expect(emitted[3]).toStrictEqual([4])
  })
})
