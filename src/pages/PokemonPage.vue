<template>
  <h1 v-if="!pokemon">Wait a moment please...</h1>
  <div v-else>
    <h1>Who is this Pokemon?</h1>
    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemons" @selection-pokemon="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions.js'

export default {
  name: 'PokemonPage',
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      message: '',
      pokemon: null,
      pokemons: [],
      showAnswer: false,
      showPokemon: false,
    }
  },
  methods: {
    async mixPokemonOptions() {
      this.pokemons = await getPokemonOptions()

      const randomInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemons[randomInt]
    },
    checkAnswer(selectedId) {
      this.showAnswer = true
      this.showPokemon = true

      this.message =
        selectedId === this.pokemon.id
          ? `You're right, this pokemon is ${this.pokemon.name}!`
          : `Ops! You're wrong, this pokemon is ${this.pokemon.name}`
    },
    newGame() {
      (this.message = ''),
        (this.pokemon = null),
        (this.showAnswer = false),
        (this.showPokemon = false),
        (this.pokemons = []),
        this.mixPokemonOptions()
    },
  },
  mounted() {
    this.mixPokemonOptions()
  },
}
</script>

<style scoped>
button {
  background-color: #64bb87;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 5px 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>