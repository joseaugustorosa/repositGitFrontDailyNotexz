import React, {useState, useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { User } from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';


const HeaderComponent = () =>  {
    const navigate = useNavigate();
    const [perfil, Setperfil] = useState('PERFIL');
    useEffect(() => {
        var info = localStorage.getItem('informacao');
         Setperfil(info)
     }, []);
     const isMobile = useMediaQuery({ maxWidth: 768 });
     function gotoHome(){
        navigate('/home')
     }
     function gotoDev(){
        navigate('/Dev')
       }
       const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };
    
    const logout = () =>{
       
        localStorage.removeItem('token');
        navigate('/')
    }


  return (
    <div className="header">
         
      {isMobile ? (
        <div>
        <nav>
            <ul >
            <li className="nomeNavMobile">DAILY NOTEXZ</li>
            <li className="buttonOptionsHome"><button className="btnMenuHead" onClick={toggleMenu}>   <FontAwesomeIcon icon={faBars} /></button></li>              
            </ul>
        </nav>
        <div>
        <CSSTransition
        in={menuAberto}
        timeout={300}
        classNames="animacao"
        unmountOnExit> 

            <ul className="lista">
                <li className="itens" onClick={gotoDev}>To-do List</li>
                <li  className="itens" onClick={gotoHome}>Tarefas</li>
                
                <li className="itens" >{perfil} - perfil <User></User></li>
                <li className="itens" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt } className="m" /></li>
                
            </ul> 

        </CSSTransition>
        </div>
        </div>
    ) : (
        <nav>
        <ul>
            <li className="nameNav">DAILY NOTEXZ</li>
            <li className="itens" onClick={gotoDev}>Desenvolvimentos</li>
            <li className="itens" onClick={gotoHome}>Tarefas</li>
            <li className="logoutBTN"  onClick={logout}><FontAwesomeIcon icon={faSignOutAlt } className="m" /> </li>        
            <li className="perfilIcon" ><User></User></li>
            <li className="perfilNavHome"  >{perfil} </li>  
            
        
       
    
             
        </ul>
       
        </nav>
        )}
    </div >      
  );
}

export default HeaderComponent;
