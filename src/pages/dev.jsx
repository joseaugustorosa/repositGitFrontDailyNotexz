import React ,{useState,useEffect}from 'react';
import '../App.css'; // Crie um arquivo CSS para estilizar a sidebar, se necessário.
import '../style/dev.css'
import Header from '../components/header'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { createRoot } from 'react-dom/client';
import Axios from 'axios'
const Dev = () => {
    var  resp  = null;
    const urlBackend = 'http://localhost:3001'
    const [showPopup, setShowPopup] = useState(false);
    
    
    const handleButtonClick = () => {
        setShowPopup(true);
    };
      const handlePopupClose = () => {
        setShowPopup(false);
    };
    useEffect(() => {
        let usuario = localStorage.getItem('user');
        console.log(usuario)

        Axios.post(urlBackend + "/infodevs",{
           
            user: usuario
        }).then((response)=>{  
            resp = response.data.rows;
            setRowData(resp)
            console.log(resp)
        });
    }, []);
    
    const [rowData, setRowData] = useState([
       
      ]);
    
      // Column Definitions: Defines & controls grid columns.
      const [colDefs, setColDefs] = useState([
        { field: "nome", headerName: 'Nome'},
        { field: 'descricao', headerName: 'Descrição' },
        { field: 'tempo' , headerName: 'Tempo' },
        { field: 'data_inicio', headerName: 'Data Inicio'  },
        { field: 'data_fim' , headerName: 'Data Fim' },
       
        { field: 'extra_feedback', headerName: 'Extra/Feedback'  },
        { field: 'responsavel', headerName: 'Responsável'  },
        { field: 'setor', headerName: 'Setor'  },
        { field: 'otimizacao' , headerName: 'Otimização' },
        
      ]);

  return (
    <div className="">

        <Header/>
        <div className='Options_div'>
       <div className='testez'>
        <button   onClick={handleButtonClick} className="btnADDHome">Adicionar Dev</button>
        </div>
        </div>
        <div className="ag-theme-quartz-dark" style={{ height: 500 , width: '98%' , margin: 'auto'}}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
        {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <button onClick={handlePopupClose} className="close_button">x</button>
                
            <h2 className="_popup">Adicione uma tarefa</h2>
            <div className="inputsLogin">
                    <input type="text" className="inputLogin" placeholder="Titulo" />
                </div>
                <div className="inputsLogin">
                    <textarea type="text" className="inputareaLogin" placeholder="Descricao" />
                
                </div>
                <div className="divbtnaddtask">
                    <button className="btnaddtask" >Adicionar</button>
                </div>

             </div>
        </div>
         )}
    </div>
  );
};


export default Dev;