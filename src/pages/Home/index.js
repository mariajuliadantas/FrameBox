import { useEffect, useState } from "react";
import api from "../../services/api";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [filmeDestaque, setFilmeDestaque] = useState(null);

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

  const handleDestaque = (filme) => {
    setFilmeDestaque(filme);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h1>FILMFLIX</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/filmes">Filmes</a>
          <a href="/series">Séries</a>
        </nav>
        <div className="profile-icon">👤</div>
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
              <span>{filmeDestaque.genre_ids.join(" | ")}</span>
            </div>
            <p>{filmeDestaque.overview}</p>
            <div className="filme-actions">
              <button>+</button>
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
      <div className="carrossel-filmes">
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
    </div>
  );
}

export default Home;
