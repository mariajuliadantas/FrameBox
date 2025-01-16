import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./home.css"; // Reutilizando o mesmo CSS da Home

function MinhaLista() {
  const [minhaLista, setMinhaLista] = useState([]);
  const [filmeDestaque, setFilmeDestaque] = useState(null);

  useEffect(() => {
    // Carregar os filmes salvos no localStorage
    const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];
    setMinhaLista(lista);

    // Define o primeiro filme da lista como destaque inicial (se houver filmes)
    if (lista.length > 0) {
      setFilmeDestaque(lista[0]);
    }
  }, []);

  const removerDaLista = (filme) => {
    // Remover o filme da lista e do localStorage
    const novaLista = minhaLista.filter((item) => item.id !== filme.id);
    localStorage.setItem("minhaLista", JSON.stringify(novaLista));
    setMinhaLista(novaLista);

    // Atualiza o destaque caso o filme removido seja o atual
    if (filmeDestaque?.id === filme.id) {
      setFilmeDestaque(novaLista[0] || null);
    }

    toast.error(`Filme "${filme.title}" removido da sua lista!`);
  };

  const handleDestaque = (filme) => {
    setFilmeDestaque(filme);
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
              <button onClick={() => removerDaLista(filmeDestaque)}>-</button>
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
        {minhaLista.length > 0 ? (
          minhaLista.map((filme) => (
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
          ))
        ) : (
          <div className= "texto"> <p>Você ainda não adicionou filmes à lista :( <br></br>Clique  <a href="/">aqui</a> para adicionar!</p></div>
        )}
      </div>
    </div>
  );
}

export default MinhaLista;
