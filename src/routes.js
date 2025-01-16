import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';



import Erro from './pages/Erro/Index';
import MinhaLista from './pages/Home/minhalista';


function RoutesApp() {
    return(
        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/minha-lista" element={<MinhaLista />} />
            
            
            <Route path="*" element={<Erro />} />
        </Routes>
        </BrowserRouter>    
        )
}
export default RoutesApp; //exporta a função RoutesApp