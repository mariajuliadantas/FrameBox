import {Link} from 'react-router-dom'
function Erro() {
  return (
    <div>
      <h1>Erro 404</h1>
      <p>Página não encontrada</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
}
export default Erro;