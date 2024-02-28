import React ,{useState,useEffect}from 'react';
import '../App.css'; // Crie um arquivo CSS para estilizar a sidebar, se necessário.
import '../style/dev.css'
import Header from '../components/header'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
import { FaPenAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { createRoot } from 'react-dom/client';
import FloatingFormModal from '../components/FormDev';
import Axios from 'axios'
const Dev = () => {
    var  resp  = null;
    const [isClicked, setIsClicked] = useState(false);
    const urlBackend = 'http://localhost:3001'
    const [showPopup, setShowPopup] = useState(false);
    const [NomeDev, setNomeDev] = useState('');
    const [SetorDev, setSetorDev] = useState('');
    const [ResponsavelDev, setResponsavelDev] = useState('');
    const [TempoDev, setTempoDev] = useState('');
    const [DescricaoDev, setDescricaoDev] = useState('');
    const [ExtraDev, setExtraDev] = useState('');
    const [OtimizacaoDev, setOtimizacaoDev] = useState('');
    const [DatainicioDev, setDataInicioDev] = useState('');
    const [DatafimDev, setDatafimDev] = useState('');
    const [Editar, setEditar] = useState(false);
    const [Deletar, setDeletar] = useState(false);
    const [id, setId] =useState('');
    
    
    
    const salvarDev = () =>{

      if (Editar){
       
        Axios.post(urlBackend + "/editDev",{
           
          id: id,
       
     descricao : DescricaoDev,
     tempo: TempoDev,
     data_inicio :new Date( DatainicioDev),
     data_fim : new Date(DatafimDev ) ,
     extra_feedback : ExtraDev,
     responsavel :ResponsavelDev ,
     setor : SetorDev,
     nome : NomeDev,
     otimizacao :OtimizacaoDev
      }).then((response)=>{  
          resp = response.data.rows;
          setRowData(resp)
          console.log(resp)
          buscar()
          toast.done("Desenvolvimento alterado com sucesso!")
      });
       
      }else{
        let usuario = localStorage.getItem('user');
        console.log(NomeDev)
        console.log(DatafimDev)
  
        console.log(SetorDev)
        console.log(ResponsavelDev)
  
        Axios.post(urlBackend + "/insertdevs",{
           
            user: usuario,
         
       descricao : DescricaoDev,
       tempo: TempoDev,
       data_inicio :new Date( DatainicioDev),
       data_fim : new Date(DatafimDev ) ,
       extra_feedback : ExtraDev,
       responsavel :ResponsavelDev ,
       setor : SetorDev,
       nome : NomeDev,
       otimizacao :OtimizacaoDev
        }).then((response)=>{  
            resp = response.data.rows;
            setRowData(resp)
            buscar()
            console.log(resp)
        });
  
      }
     

    }
    const buscar = () =>{
      let usuario = localStorage.getItem('user');
      console.log(usuario)

      Axios.post(urlBackend + "/infodevs",{
         
          user: usuario
      }).then((response)=>{  
          resp = response.data.rows;
          setRowData(resp)
          console.log(resp)
      });

    }
    const handleButtonClick = () => {
        setShowPopup(true);
    };
      const handlePopupClose = () => {
        setShowPopup(false);
        
        setNomeDev('')
        setSetorDev('')
        setResponsavelDev('')
        setTempoDev('')
        setDescricaoDev('')
        setExtraDev('')
        setOtimizacaoDev('')
        setDataInicioDev('')
        setDatafimDev('')

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
      const DeletarDev = (objeto) => {
        const resposta = window.confirm("Deseja continuar?");
        if (resposta === true) {
        Axios.post(urlBackend + "/deleteDev",{
           
          id: objeto.id
       
     
      }).then((response)=>{  
          resp = response.data.rows;
          setRowData(resp)
          buscar()
          console.log(resp)
      });
    }
    }
      
      const onCellClicked = (params) => {
         if (Editar || Deletar){ 
        const dados = params.data;
        if (Editar){
          setId(dados.id)
          setNomeDev(dados.nome)
          setSetorDev(dados.setor)
          setResponsavelDev(dados.responsavel)
          setTempoDev(dados.tempo)
          setDescricaoDev(dados.descricao)
          setExtraDev(dados.extra_feedback)
          setOtimizacaoDev(dados.otimizacao)
          setDataInicioDev(dados.data_inicio)
          setDatafimDev(dados.data_fim)

          setShowPopup(true)

        } else{
          DeletarDev(dados)
        } 
        
      }
       
      };
      const btnEditarHandle = () =>{

        if (Deletar){
          toast.error("Para ativar função editar desative a função deletar.")
        }else{
          if  (Editar){
              setEditar(false)
              toast.info("Função de editar desativada.")
          }
          else{
            setEditar(true);
            toast.info("Função de editar ativada!")
            }
          }

      }
      const btnDeletarHandle = () =>{

        if (Editar){
          toast.error("Para ativar função deletar desative a função editar.")
        }else{
          if  (Deletar){
              setDeletar(false)
              toast.info("Função de deletar desativada.")
          }
          else{
            setDeletar(true);
            toast.info("Função de deletar ativada!")
            }
          }


      }
    
  return (
    <div className="">

        <Header/>
        <div className='Options_div'>
       <div className='testez'>
       <button    onClick={btnDeletarHandle} style={{ backgroundColor: Deletar ?  'red':'#2f3857' , color: 'white' }} className="btnADDHome"><FaTrash /> </button>
        <button   onClick={handleButtonClick} className="btnADDHome">Adicionar Dev</button>
        <button   onClick={btnEditarHandle} style={{ backgroundColor: Editar ?  'red' :'#2f3857' , color: 'white' }}  className="btnADDHome"><FaPenAlt /></button>
        </div>
       
        </div>
        {showPopup && (
        <div className="popupdev">
          <div className="popup-contentdev">
          <button onClick={handlePopupClose} className="close_button">x</button>
                
            <h2 className="_popupdev">Adicione um Desenvolvimento</h2>
              
              <ul className='ContiainerUmInputs'>
                <li className='ItemContainerUmInputs'>
                <div className=''>
                <label>
                  Nome:
                </label><br></br>
                <input className='InputsUmDev'  value={NomeDev} onChange={(e)=> setNomeDev(e.target.value)}/>
              </div>
                </li>
                <li className='ItemContainerUmInputs'>
                <div className=''>
                <label>
                  Setor:
                </label><br></br>
                <input className='InputsUmDev' value={SetorDev} onChange={(e)=> setSetorDev(e.target.value)}/>
              </div>
                </li>
                <li className='ItemContainerUmInputs'>
                <div className=''>
                <label>
                  Responsável:
                </label><br></br>
                <input className='InputsUmDev' value={ResponsavelDev} onChange={(e)=> setResponsavelDev(e.target.value)}/>
              </div>
                </li>
                <li className='ItemContainerUmInputs'>
                <div className=''>
                <label>
                  Tempo Dev:
                </label><br></br>
                <input className='InputsUmDev' value={TempoDev} onChange={(e)=> setTempoDev(e.target.value)}/>
              </div>
                </li>
              </ul>
              <ul className='ContiainerUmInputs'>
                  <li className='ItemContainerdoisInputs'>
                      <label>
                      Descrição:
                    </label><br></br>
                    <textarea className='InputsdoisDev' value={DescricaoDev} onChange={(e)=> setDescricaoDev(e.target.value)}/>
                  </li>
                  <li className='ItemContainerdoisInputs'>
                  <label>
                      Extra/Feedback:
                    </label><br></br>
                    <textarea className='InputsdoisDev' value={ExtraDev} onChange={(e)=> setExtraDev(e.target.value)}/>
                  </li>
              </ul>
              <ul className='ContiainerUmInputs'>
                  <li className='ItemContainertresInputs'>
                      <label>
                      Otimização:
                    </label><br></br>
                    <input className='InputsUmDev' value={OtimizacaoDev} onChange={(e)=> setOtimizacaoDev(e.target.value)} />
                  </li>
                  <li className='ItemContainertresInputs'>
                  <label>
                      Data inicio:
                    </label><br></br>
                    <input className='InputsUmDev' value={DatainicioDev} onChange={(e)=> setDataInicioDev(e.target.value)}/>
                  </li>
                  <li className='ItemContainertresInputs' >
                  <label>
                      Data fim:
                    </label><br></br>
                    <input className='InputsUmDev' value={DatafimDev} onChange={(e)=> setDatafimDev(e.target.value)}/>
                  </li>
              </ul>
              <div className='div_dev_btn'>
                <button className='btn_salvar_dev' onClick={salvarDev}>Salvar</button>
              </div>
              

            </div>
        </div>
         )}
        <div className="ag-theme-quartz-dark" style={{ height: 500 , width: '98%' , margin: 'auto'}}>
      <AgGridReact rowData={rowData} columnDefs={colDefs}   onCellClicked={onCellClicked}/>
        </div>
       
    </div>
  );
};


export default Dev;