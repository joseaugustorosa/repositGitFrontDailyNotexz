import React ,{useState,useEffect}from 'react';
import '../App.css'; // Crie um arquivo CSS para estilizar a sidebar, se necessário.
import '../style/sidebar.css'
import { toast } from 'react-toastify';
import Axios from 'axios'
import Home from '../pages/home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const Sidebar = props => {
    
    const [showInput, setShowInput] = useState(false); 
    const urlBackend = 'http://localhost:3001'//'https://backenddailynotexz.onrender.com'
    const [nomeuser, Setnomeuser] = useState('PERFIL');
    const [rows, setRows] = useState([]);
    const [nomeQuadro, SetnomeQuadro] = useState('');

    useEffect(() => {
      UpdateQuadros()
    
    }, []);

      const UpdateQuadros = ()=>{
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)
        Axios.post(urlBackend + "/buscarQuadros",{
            nomeuser: usuario
        }).then((response)=>{  
             const rowsData = response.data.rows;
             setRows(rowsData);
             
        });
      }
      const createTable = () =>{

        var usuario = localStorage.getItem('user');
        console.log("passa")
        Axios.post(urlBackend + "/criarQuadro",{
          nomeuser: usuario,
          nameQuadro : nomeQuadro


      }).then((response)=>{  
        console.log(response)
        UpdateQuadros()  
           
      });
  
      }
      
      const insertQuadroLocalStorage = (index)=>{
        console.log("teste")
        
        localStorage.removeItem('quadro')
        localStorage.setItem('quadro', rows[index].quadro );
        props.doIt()
      }
   
      const handleToggleInput = () => {
        setShowInput(!showInput); // Alterna entre mostrar e ocultar o input
      };

  return (
    <div className="sidebar">
     
      <ul className='teste' >
        <li  className='itemHeader'>Quadros</li>
        {rows.map((row, index) => (

          <li  className='quadrosItens' key={index} onClick={() =>insertQuadroLocalStorage(index)}>{row.quadro}  </li>
        ))}


        
      </ul>
      {showInput ? (
        <div>
          <input type="text"  className='testes' placeholder='Nomeie seu quadro' value={nomeQuadro} onChange={(e)=> SetnomeQuadro(e.target.value)} />
          <button onClick={createTable}>C</button>
          <button>D</button>
          </div>
      ) : (
       <div></div>
        )}
      

      <div className="DivCriarQuadro">
        <button className="btnCriarQuadro" onClick={handleToggleInput}>Criar Quadro</button>
      </div>
      <div className="DivExpandirDiminuir">
        <button className="" ><faPlus className="icon_plus"/></button>
      </div>
    </div>
  );
};

export default Sidebar;