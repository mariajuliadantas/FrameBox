import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [filmeDestaque, setFilmeDestaque] = useState(null);

  // Referência para o carrossel
  const carrosselRef = useRef(null);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("/movie/popular", {
        params: {
          api_key: "e0f6edc7bc682a076685bacf966a7c02",
          language: "pt-BR",
        },
      });

      setFilmes(response.data.results);
      setFilmeDestaque(response.data.results[0]); // Define o primeiro filme como destaque inicial
    }

    loadFilmes();
  }, []);

  const adicionarAosFavoritos = (filme) => {
    const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];
    const filmeExiste = lista.some((item) => item.id === filme.id);

    if (filmeExiste) {
      toast.warning(`O filme "${filme.title}" já está na sua lista!`);
      return;
    }

    lista.push(filme);
    localStorage.setItem("minhaLista", JSON.stringify(lista));

    toast.success(`Filme "${filme.title}" adicionado à lista!`);
  };

  const handleDestaque = (filme) => {
    setFilmeDestaque(filme);
  };

  const scrollLeft = () => {
    carrosselRef.current.scrollBy({
      top: 0,
      left: -300, // Quantidade de scroll horizontal para a esquerda
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carrosselRef.current.scrollBy({
      top: 0,
      left: 300, // Quantidade de scroll horizontal para a direita
      behavior: "smooth",
    });
  };

  return (
    <div className="home-container">
      {/* ToastContainer */}
      <ToastContainer />

      {/* Header */}
      <header className="header">
        <h1>FRAMEBOX</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/minha-lista">Minha Lista</a>
        </nav>
      </header>

      {/* Filme em destaque */}
      {filmeDestaque && (
        <div
          className="filme-destaque"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${filmeDestaque.backdrop_path})`,
          }}
        >
          <div className="filme-detalhes">
            <h2>{filmeDestaque.title}</h2>
            <div className="filme-info">
              <span>⭐ {filmeDestaque.vote_average}</span>
            </div>
            <p>{filmeDestaque.overview}</p>
            <div className="filme-actions">
              <button onClick={() => adicionarAosFavoritos(filmeDestaque)}>
                +
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://youtube.com/results?search_query=${filmeDestaque.title} Trailer`,
                    "_blank"
                  )
                }
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de filmes */}
      <div className="carrossel-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          ◀
        </button>
        <div className="carrossel-filmes" ref={carrosselRef}>
          {filmes.map((filme) => (
            <div
              key={filme.id}
              className="filme-card"
              onClick={() => handleDestaque(filme)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                alt={filme.title}
              />
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          ▶
        </button>
      </div>
    </div>
  );
}

export default Home;
