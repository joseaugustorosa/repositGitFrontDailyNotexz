import React ,{useState,useEffect}from 'react';
import '../App.css'; // Crie um arquivo CSS para estilizar a sidebar, se necessário.
import '../style/sidebar.css'
import { toast } from 'react-toastify';
import Axios from 'axios'
const Sidebar = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [showInput, setShowInput] = useState(false); 
    const urlBackend = 'http://localhost:3001'//'https://backenddailynotes.onrender.com'
    const [nomeuser, Setnomeuser] = useState('PERFIL');
    const [rows, setRows] = useState([]);
   

    useEffect(() => {
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)
        Axios.post(urlBackend + "/buscarQuadros",{
            nomeuser: usuario
        }).then((response)=>{  
             const rowsData = response.data.rows;
             setRows(rowsData);
             
        });
    
    }, []);


    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
      };
      const handleToggleInput = () => {
        setShowInput(!showInput); // Alterna entre mostrar e ocultar o input
      };

  return (
    <div className="sidebar">
     
      <ul className='teste' >
        <li  className='itemHeader'>Quadros</li>
        {rows.map((row, index) => (

          <li  key={index}>{row.quadro}  </li>
        ))}
      </ul>
      {showInput ? (
        <div>
          <input type="text"  className='testes' placeholder='Nomeie seu quadro'/>
          <button>C</button>
          <button>D</button>
          </div>
      ) : (
       <div></div>
        )}
      

      <div className="DivCriarQuadro">
        <button className="btnCriarQuadro" onClick={handleToggleInput}>Criar Quadro</button>
      </div>
    </div>
  );
};

export default Sidebar;