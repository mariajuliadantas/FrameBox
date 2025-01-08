import{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Favoritos() {  //sempre 1a letra maiúscula
    const [filmes, setFilmes] = useState([]); //array de objetos
    useEffect(() => {
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluir(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);
        });
        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes)); // para quando recarregar a página, os filmes excluídos não aparecerem
    }

    return (
      <div>
        <h1>Meus Filmes</h1>
        {filmes.length === 0 && <span>Você não possui nenhum filme salvo</span>}
        <ul>
            {filmes.map((item) => {
                return (
                    <li key={item.id}>
                        <   Link to={`/filme/${item.id}`}>{item.title}</Link>
                        <button onClick={()=> excluir(item.id)}>Excluir</button>
                        </li>
                )
            })}
            
        </ul>
      </div>
    );
  }
  
  export default Favoritos;
  