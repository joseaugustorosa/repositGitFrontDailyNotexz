import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../home.css'
import Axios from 'axios'
import { toast } from 'react-toastify';
import { User  } from 'feather-icons-react';

import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const navigate = useNavigate();
    const [perfil, Setperfil] = useState('PERFIL');
    const [nomeuser, Setnomeuser] = useState('PERFIL');
    const [rows, setRows] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [rows1, setRows1] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    var resultado1;
    const [titulo, Settitulo] = useState('');
    const [descricao, setdescricao] = useState('');
    const handleButtonClick = () => {
        setShowPopup(true);
      };
    
      const handlePopupClose = () => {
        setShowPopup(false);
      };
    useEffect(() => {
    
       var info = localStorage.getItem('informacao');
       var login = localStorage.getItem('credencialLogin');
       if(login != 'Tá Logado'){
        navigate('/login');
       }
        Setperfil(info)
        rederizarLista()
        rederizarListaFinished()
        rederizarListaDesenvolvimento()
        console.log(rows.length)
        document.title = 'DAILY NOTEXZ';
    }, []);
    function toDev(index){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post("https://backenddailynotes.onrender.com/mudarStatusDev",{
            titulo: rows[index].titulo,
            data:rows[index].data,
            hora: rows[index].hora,

            user: usuario

        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows(rowsData);
             rederizarLista()
            rederizarListaFinished()
            rederizarListaDesenvolvimento()
        });
    }
    function voltaback(index){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post("https://backenddailynotes.onrender.com/devparaback",{
            titulo: rows1[index].titulo,
            data:rows1[index].data,
            hora: rows1[index].hora,

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

        Axios.post("https://backenddailynotes.onrender.com/mudarStatusFin",{
            titulo: rows1[index].titulo,
            data:rows1[index].data,
            hora: rows1[index].hora,

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

        Axios.post("https://backenddailynotes.onrender.com/finparadev",{
            titulo: rows2[index].titulo,
            data:rows2[index].data,
            hora: rows2[index].hora,

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
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post("https://backenddailynotes.onrender.com/popularTabelaBacklog",{
            nomeuser: usuario
        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows(rowsData);
             
        });
    }
    function rederizarListaFinished(){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post("https://backenddailynotes.onrender.com/popularTabelaFinished",{
            nomeuser: usuario
        }).then((response)=>{  
           
             const rowsData = response.data.rows;
             setRows2(rowsData);
        });
    }
    function rederizarListaDesenvolvimento(){
        var usuario = localStorage.getItem('user');
        Setnomeuser(usuario)

        Axios.post("https://backenddailynotes.onrender.com/popularTabelaDesenvo",{
            nomeuser: usuario
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

        Axios.post("https://backenddailynotes.onrender.com/inserirNaTabelaBacklog",{
            titul: titulo,
            descricao : descricao,
            data:new Date(),
            hora: hora(),
            user: nomeuser

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

        Axios.post("https://backenddailynotes.onrender.com/ExcluirBacklog",{
            titulo: rows[index].titulo,
            data:rows[index].data,
            hora: rows[index].hora,
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

        Axios.post("https://backenddailynotes.onrender.com/ExcluirBacklog",{
            titulo: rows1[index].titulo,
            data:rows1[index].data,
            hora: rows1[index].hora,
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

        Axios.post("https://backenddailynotes.onrender.com/ExcluirBacklog",{
            titulo: rows2[index].titulo,
            data:rows2[index].data,
            hora: rows2[index].hora,
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
        <div className="header">
        <nav>
            <ul>
                <li className="nameNav">DAILY NOTEXZ</li>
                <li className="todolistNavHome">To-do List</li>
                <li className="perfilIcon" ><User></User></li>
                <li className="perfilNavHome" >{perfil} </li>
                
            </ul>

        </nav>
        </div >    
        <div className="div_btn_fp">
        <button onClick={handleButtonClick} className="btnADDHome">Adicionar Tarefa</button>
        </div>
        <div className="div">
            <div className="containerMain">
                <h1>Backlog</h1>
                
            <div>
            {rows.length > 0 &&(
                <div>
                {rows.map((row, index) => (
                <div className="containerItem" >
                    <h3 className="containerTitle" key={index}>{row.titulo}</h3>
                    <button className="delete" onClick={() => Delete(index)}> Del</button>
                    
                    <p className="containerDescript" key={index}>{row.descricao}</p>
                   
                    <ul>
                    <li className="containerDate" key={index}>{formatarData(row.data)}</li>
                    <li className="containerHour" key={index}>{row.hora}</li>
                    <ul>
                        <li className="itembtn"> <button className="botaoright" onClick={() =>toDev(index)}>prox</button></li>
                        <li className="itembtnc">  <button className="botaoleft">voltar</button></li>
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
                    <button className="delete" onClick={() => Delete1(index)}> Del</button>
                    <p className="containerDescript" key={index}>{row.descricao}</p>
                   
                    <ul>
                    <li className="containerDate" key={index}>{formatarData(row.data)}</li>
                    <li className="containerHour" key={index}>{row.hora}</li>
                    <ul>
                        <li className="itembtn"> <button className="botaoright" onClick={() =>toFin(index)}>prox</button></li>
                        <li className="itembtnc">  <button className="botaoleft" onClick={() =>voltaback(index)}>voltar</button></li>
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
                    <button className="delete" onClick={() => Delete2(index)}> Del</button>
                    <p className="containerDescript" key={index}>{row.descricao}</p>
                   
                    <ul>
                    <li className="containerDate" key={index}>{formatarData(row.data)}</li>
                    <li className="containerHour" key={index}>{row.hora}</li>
                    <ul>
                        <li className="itembtn"> <button className="botaoright" >prox</button></li>
                        <li className="itembtnc">  <button className="botaoleft" onClick={() =>todevVolta(index)}>voltar</button></li>
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
      
    
  );
}

export default Home;
