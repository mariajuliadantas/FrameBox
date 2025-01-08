import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("/movie/popular", {
          params: {
            api_key: "e0f6edc7bc682a076685bacf966a7c02",
            language: "pt-BR",
          },
        });

        // Atualiza o estado com a lista de filmes
        setFilmes(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os filmes:", error);
      }
    }

    loadFilmes();
  }, []);

  if(loading){
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          ))
        ) : (
          <p>Carregando filmes...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
