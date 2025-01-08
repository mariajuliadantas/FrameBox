import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null); // Estado para armazenar os dados do filme
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: "e0f6edc7bc682a076685bacf966a7c02",
            language: "pt-BR", // Define o idioma como português (opcional)
          },
        });
        setFilme(response.data);
      } catch (err) {
        console.error("Erro ao carregar o filme:", err);
      } finally {
        setLoading(false); // Sempre encerra o carregamento
      }
    }

    loadFilme();
  }, [id]); // 'id' como dependência

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  function salvar(){
    const lista= localStorage.getItem('filmes');
    let filmesSalvos = JSON.parse(lista) || [];
    const filmeSalvo = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
    if(filmeSalvo){
    alert('Filme ja esta em sua lista de favoritos');
    return;
  }
  filmesSalvos.push(filme);
  localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
  alert('Filme adicionado a lista de favoritos');

}

  if (!filme) {
    return <h1>Filme não encontrado.</h1>;
  }

  return (
    <div>
      <h1>{filme.title}</h1>
      <p>{filme.overview}</p>
      <strong>{filme.vote_average}/10</strong>
      <img
        src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
        alt={filme.title}/>
        <div className="sbutton"><button onClick={salvar} >Salvar</button></div>
        <div className="tbutton"><button><a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer `}>Trailer</a></button></div>
    </div>
  );
}

export default Filme;
