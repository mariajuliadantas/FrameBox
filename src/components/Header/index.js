import './header.css'; 
import{ Link } from 'react-router-dom';

function Header() {  //sempre 1a letra maiúscula
    return (
      <header>
        
              <Link className='logo' to="/">Home</Link>
              <Link className='favoritos' to="/favoritos">Meus Filmes</Link>
       
      </header>
    );
  }
  
  export default Header;
  