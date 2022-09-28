import type { Pokemon } from "./types";
import { useEffect, useState } from "react";
import { POKEMONS } from "./constants";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState(POKEMONS);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState<Record<Pokemon["id"], boolean>>(
    {}
  );

  useEffect(() => {
    const favorites = localStorage.getItem("favorite");

    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const newPokemon = POKEMONS.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setPokemons(newPokemon);
  }, [searchValue]);

  const priceTotal = cart.reduce(
    (acc, curretValue) => acc + curretValue.price,
    0
  );

  const addCart = (pokemon: Pokemon) => {
    if (priceTotal + pokemon.price <= 10) {
      setCart(cart.concat(pokemon));
    }
  };

  const addFavorites = (id: Pokemon["id"]) => {
    setFavorites({ ...favorites, [id]: !favorites[id] });
  };

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </nav>
      <section>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <figure>
              <i
                className={`nes-icon is-medium ${
                  favorites[pokemon.id] ? "heart" : "is-transparent"
                }`}
                onClick={() => addFavorites(pokemon.id)}
              />
              <img className="nes-container" src={pokemon.image} />
            </figure>
            <div>
              <p>
                {pokemon.name} (${pokemon.price})
              </p>
              <p>{pokemon.description}</p>
            </div>
            <button className="nes-btn" onClick={() => addCart(pokemon)}>
              Agregar
            </button>
          </article>
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">
          {cart.length} cart total ${priceTotal}
        </button>
      </aside>
    </>
  );
}

export default App;
