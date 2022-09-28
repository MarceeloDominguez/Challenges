import { useEffect, useState } from "react";

import api from "./api";
import { Pokemon } from "./types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonsCart, setPokemonsCart] = useState<Pokemon[]>([]);

  useEffect(() => {
    api.list().then((res) => {
      setPokemons(res);
      setIsLoading(false);
    });
  }, []);

  const addItemsToCart = (pokemon: Pokemon) => {
    setPokemonsCart([...pokemonsCart, pokemon]);
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <section>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <img className="nes-container" src={pokemon.image} />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{pokemon.name}</p>
                <p>$ {pokemon.price}</p>
              </div>
              <p>{pokemon.description}</p>
            </div>
            <button onClick={() => addItemsToCart(pokemon)} className="nes-btn">
              Agregar
            </button>
          </article>
        ))}
      </section>

      <aside>
        <button
          disabled={pokemonsCart.length > 2}
          className="nes-btn is-primary"
        >
          {pokemonsCart.length} items
        </button>
      </aside>
    </>
  );
}

export default App;
