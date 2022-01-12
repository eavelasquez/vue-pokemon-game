import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage.vue'

import { pokemons } from '../mocks/pokemons.mock'


describe('PokemonPage.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })

  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should match snapshot when pokemons load', () => {
    const wrapper = mount(PokemonPage, {
      data() {
        return {
          message: '',
          pokemon: pokemons[0],
          pokemons: pokemons,
          showAnswer: false,
          showPokemon: false,
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should call mixPokemonOptions when mounting component', () => {
    const mixPokemonOptionsSpy = jest.spyOn(PokemonPage.methods, 'mixPokemonOptions')
    shallowMount(PokemonPage)

    expect(mixPokemonOptionsSpy).toHaveBeenCalled()
  })

  test('should show the PokemonPicture and PokemonOptions components', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          message: '',
          pokemon: pokemons[0],
          pokemons: pokemons,
          showAnswer: false,
          showPokemon: false,
        }
      }
    })

    const picture = wrapper.findComponent({ name: 'pokemon-picture' })
    const options = wrapper.findComponent({ name: 'pokemon-options' })

    expect(picture.exists()).toBeTruthy()
    expect(picture.attributes('pokemonid')).toBe('1')
    expect(options.exists()).toBeTruthy()
    expect(options.attributes('pokemons')).toBeTruthy()
  })

  test('checkAnswer should work', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          message: '',
          pokemon: pokemons[1],
          pokemons: pokemons,
          showAnswer: false,
          showPokemon: false,
        }
      }
    })

    await wrapper.vm.checkAnswer(pokemons[1].id)

    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.vm.showPokemon).toBeTruthy()
    expect(wrapper.vm.showAnswer).toBeTruthy()
    expect(wrapper.vm.message).toBe(`You\'re right, this pokemon is ${pokemons[1].name}!`)

    await wrapper.vm.checkAnswer(pokemons[2].id)
    expect(wrapper.vm.message).toBe(`Ops! You're wrong, this pokemon is ${pokemons[1].name}`)
  })
  
})