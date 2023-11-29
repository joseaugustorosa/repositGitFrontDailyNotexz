import React, {useState, useEffect ,useRef } from "react";
import { useNavigate } from 'react-router-dom';
import '../home.css'
import '../style/home2.css'
import Sidebar  from "../components/sidebar";
import Axios from 'axios'
import { toast } from 'react-toastify';
import  HeaderComponent  from '../components/header.js'
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
function Home() {
    const navigate = useNavigate();
    const urlBackend = 'http://18.228.119.148:3001'
    const [nomeuser, Setnomeuser] = useState('PERFIL');
    const [rows, setRows] = useState([]);
    const [quadro, setquadro] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [rows1, setRows1] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [titulo, Settitulo] = useState('');
    const [descricao, setdescricao] = useState('');
    
    const handleButtonClick = () => {
        setShowPopup(true);
    };
      const handlePopupClose = () => {
        setShowPopup(false);
    };
      useEffect(() => {
        var quadro = localStorage.getItem('quadro');
        setquadro(quadro)
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
        } else {
            navigate('/')
        }             
         rederizarLista()
         rederizarListaFinished()
         rederizarListaDesenvolvimento()
         console.log(rows.length)
         document.title = 'HOME - DAILY NOTEXZ';
     }, []);

    const reload = () =>{
        var quadro = localStorage.getItem('quadro');
        setquadro(quadro)
        rederizarLista()
        rederizarListaFinished()
        rederizarListaDesenvolvimento()
        
    } 
    function toDev(index){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)
        console.log(rows[index].id)
        Axios.post(urlBackend +"/mudarStatusDev",{
            titulo: rows[index].titulo,
            data:rows[index].data,
            hora: rows[index].hora,
            id: rows[index].id,
            user: usuario
        }).then((response)=>{  
            console.log(response)
            const rowsData = response.data.rows;
            setRows(rowsData);
            //setRows1([...rows1, rows[index]]);
            rederizarLista()
            rederizarListaFinished()
            rederizarListaDesenvolvimento()
        });
    }
    function gerarId(){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const id = `${year}${month}${day}${hours}${minutes}${seconds}`;
        return id
    }
    function voltaback(index){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post(urlBackend + "/devparaback",{
            titulo: rows1[index].titulo,
            data:rows1[index].data,
            hora: rows1[index].hora,
            id: rows1[index].id,
            user: usuario

        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows(rowsData);
             rederizarLista()
        rederizarListaFinished()
        rederizarListaDesenvolvimento()
        });
    }
    function toFin(index){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post(urlBackend + "/mudarStatusFin",{
            titulo: rows1[index].titulo,
            data:rows1[index].data,
            hora: rows1[index].hora,
            id: rows1[index].id,
            user: usuario

        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows(rowsData);
             rederizarLista()
        rederizarListaFinished()
        rederizarListaDesenvolvimento()
        });
    }
    function todevVolta(index){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post(urlBackend + "/finparadev",{
            titulo: rows2[index].titulo,
            data:rows2[index].data,
            hora: rows2[index].hora,
            id: rows2[index].id,
            user: usuario

        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows(rowsData);
             rederizarLista()
        rederizarListaFinished()
        rederizarListaDesenvolvimento()
        });
    }
    function rederizarLista(){
        var quadro = localStorage.getItem('quadro')
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post(urlBackend + "/popularTabelaBacklog",{
            nomeuser: usuario,
            quadro: quadro
        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows(rowsData);
             
        });
    }
    function rederizarListaFinished(){
        var quadro = localStorage.getItem('quadro')
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post(urlBackend + "/popularTabelaFinished",{
            nomeuser: usuario,
            quadro: quadro
        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows2(rowsData);
        });
    }
    function rederizarListaDesenvolvimento(){
        var quadro = localStorage.getItem('quadro')
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post(urlBackend + "/popularTabelaDesenvo",{
            nomeuser: usuario,
            quadro:quadro
        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows1(rowsData);
        });
    }
    function hora(){
        var dataAtual = new Date();
        var hora = dataAtual.getHours(); 
        var minuto = dataAtual.getMinutes();
        var horaFormatada = hora < 10 ? "0" + hora : hora;
        var minutoFormatado = minuto < 10 ? "0" + minuto : minuto;
        var horaMinuto = horaFormatada + ":" + minutoFormatado;
        console.log(horaMinuto)
        return(horaMinuto)
    }

    function insertTarefa(){
        var quadro = localStorage.getItem('quadro')
        Axios.post(urlBackend + "/inserirNaTabelaBacklog",{
            titul: titulo,
            descricao : descricao,
            data:new Date(),
            hora: hora(),
            user: nomeuser,
            id: gerarId(),
            quadro:quadro

        }).then((response)=>{  
             console.log()
             const rowsData = response.data.rows;
             setRows(rowsData);
             Settitulo('')
             setdescricao('')
             rederizarLista()
             toast.success('Tarefa criada com sucesso!')
        });
        
        

    }
    function Delete(index){
       
        var usuario = localStorage.getItem('user');
        console.log(usuario)

        Axios.post(urlBackend + "/ExcluirBacklog",{
            id: rows[index].id,
            user: usuario


        }).then((response)=>{  
             console.log()
             const rowsData = response.data.rows;
             setRows(rowsData);
             Settitulo('')
             setdescricao('')
             rederizarLista()
             toast.warning('Tarefa deletada com sucesso!')
        });
    }
    function Delete1(index){
       
        var usuario = localStorage.getItem('user');
        console.log(usuario)

        Axios.post(urlBackend + "/ExcluirBacklog",{
            id: rows1[index].id,
            user: usuario
        }).then((response)=>{  
             console.log()
             const rowsData = response.data.rows;
             setRows(rowsData);
             Settitulo('')
             setdescricao('')
             
        
        rederizarListaDesenvolvimento()
        });
    }
     

    function Delete2(index){
       
        var usuario = localStorage.getItem('user');
        console.log(usuario)

        Axios.post(urlBackend + "/ExcluirBacklog",{
            id: rows2[index].id,
            user: usuario

        }).then((response)=>{  
             console.log()
             const rowsData = response.data.rows;
             setRows(rowsData);
             Settitulo('')
             setdescricao('')
             
             rederizarListaFinished()
        });
    }
    function formatarData(data) {
        const dataObjeto = new Date(data);
        const dia = dataObjeto.getDate();
        const mes = dataObjeto.getMonth() + 1; // Os meses são indexados de 0 a 11, por isso é necessário adicionar 1
        const ano = dataObjeto.getFullYear();
      
        const diaFormatado = dia.toString().padStart(2, '0'); // Garante que o dia sempre terá dois dígitos
        const mesFormatado = mes.toString().padStart(2, '0'); // Garante que o mês sempre terá dois dígitos
      
        return `${diaFormatado}/${mesFormatado}/${ano}`;
    }

    
    
    
  return (
    <div className="backHome">
        <HeaderComponent/>
        <Sidebar doIt = {reload}/>
        <div className="cabeçalhoNomeQuadro">
            <h2 className="quadroNome">Quadro : {quadro}</h2>

            <button className="btnExcluir" > <FontAwesomeIcon icon={faTrash } /></button>


        </div>
        <div className="div_btn_fp">
        <button onClick={handleButtonClick} className="btnADDHome">Adicionar Tarefa</button>
        </div>
      <div className="Organizacao">
        <div className="div">
            <div className="containerMain">
                <h1>Backlog</h1>
                
            <div>
            {rows.length > 0 &&(
                <div>
                {rows.map((row, index) => (
                <div className="containerItem" >
                    <h3 className="containerTitle" key={index}>{row.titulo}</h3>
                    <button className="delete" onClick={() => Delete(index)}>  <FontAwesomeIcon icon={faTrash } /></button>
                    
                    <p className="containerDescript" key={index}>{row.descricao}</p>
                   
                    <ul>
                    <li className="containerDate" key={index}>{formatarData(row.data)} </li>
                    <li className="containerHour" key={index}> - {row.hora}</li>
                    <ul className="btnsCard">
                       
                        <li className="itembtnc">  <button className="botaoleft"><FontAwesomeIcon icon={faArrowLeft }/>  </button></li>
                        <li className="itembtn"> <button className="botaoright" onClick={() =>toDev(index)}> <FontAwesomeIcon icon={faArrowRight } /></button></li>
                       
                    </ul>
                   
                   
                    </ul>
                    
                </div>
                ))}
                </div>
              ) }
              
                {rows.length === 0 &&(

                    <div className="msgSemRegistrosDiv">
                    <p className="msgSemRegistros">Sem registros de tarefas</p>
                    </div>
                ) }
          
          </div>
        
              {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <button onClick={handlePopupClose} className="close_button">x</button>
                
            <h2 className="_popup">Adicione uma tarefa</h2>
            <div className="inputsLogin">
                    <input type="text" className="inputLogin" placeholder="Titulo" value={titulo} onChange={(e)=> Settitulo(e.target.value)}/>
                </div>
                <div className="inputsLogin">
                    <textarea type="text" className="inputareaLogin" placeholder="Descricao" value={descricao} onChange={(e)=> setdescricao(e.target.value)}/>
                
                </div>
                <div className="divbtnaddtask">
                    <button className="btnaddtask" onClick={insertTarefa}>Adicionar</button>
                </div>

             </div>
        </div>
         )}
            </div>
        </div>
        <div className="div">
            <div className="containerMain">
                <h1>Developing</h1>
                
            
            {rows1.length > 0 &&(
                <div>
                {rows1.map((row, index) => (
                <div className="containerItem" >
                    <h3 className="containerTitle" key={index}>{row.titulo}</h3>
                    <button className="delete" onClick={() => Delete1(index)}> <FontAwesomeIcon icon={faTrash } /></button>
                    <p className="containerDescript" key={index}>{row.descricao}</p>
                   
                    <ul>
                    <li className="containerDate" key={index}>{formatarData(row.data)} </li>
                    <li className="containerHour" key={index}> - {row.hora}</li>
                    <ul>
                        <li className="itembtnc">  <button className="botaoleft" onClick={() =>voltaback(index)}><FontAwesomeIcon icon={faArrowLeft }/></button></li>
                        <li className="itembtn"> <button className="botaoright" onClick={() =>toFin(index)}><FontAwesomeIcon icon={faArrowRight }/></button></li>
                        
                    </ul>
                    </ul>
                    
                </div>
                ))}
                </div>
              ) }
              
                {rows1.length === 0 &&(

                    <div className="msgSemRegistrosDiv">
                    <p className="msgSemRegistros">Sem registros de tarefas</p>
                    </div>
                ) }
        </div>
        </div>
        <div className="div">
            <div className="containerMain">
                <h1>Finished</h1>
                {rows2.length > 0 &&(
                <div>


                {rows2.map((row, index) => (
                <div className="containerItem" >
                    <h3 className="containerTitle" key={index}>{row.titulo}</h3>
                    <button className="delete" onClick={() => Delete2(index)}> <FontAwesomeIcon icon={faTrash } /></button>
                    <p className="containerDescript" key={index}>{row.descricao}</p>
                   
                    <ul>
                    <li className="containerDate" key={index}>{formatarData(row.data)} </li>
                    <li className="containerHour" key={index}> - {row.hora}</li>
                    <ul>
                        <li className="itembtnc">  <button className="botaoleft" onClick={() =>todevVolta(index)}><FontAwesomeIcon icon={faArrowLeft }/></button></li>
                        <li className="itembtn"> <button className="botaoright" ><FontAwesomeIcon icon={faArrowRight }/></button></li>
                        
                    </ul>
                    </ul>
                    
                </div>
                ))}
                </div>
              ) }
              
                {rows2.length === 0 &&(

                    <div className="msgSemRegistrosDiv">
                    <p className="msgSemRegistros">Sem registros de tarefas</p>
                    </div>
                ) }
        </div>
                
            </div>
            </div>
        </div>
      
    
  );
}

export default Home;

