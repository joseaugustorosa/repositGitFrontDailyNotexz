import React, {useState, useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header'
import '../style/health.css'
import { CSSTransition } from 'react-transition-group';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'react-toastify';

const Health = () =>  {
    const navigate = useNavigate()
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('')
    const [exibirDiv, setExibirDiv] = useState(false);
    const handleOpcaoChange = (event) => {
        setOpcaoSelecionada(event.target.value);
      
      };
      const handleClick = () => {
        setExibirDiv(!exibirDiv);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Opção selecionada:', opcaoSelecionada);
      };
    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {
        // O usuário está autenticado, pode acessar as funcionalidades restritas
        } else {
            navigate('/')
        
        }
        document.title = 'DAILY NOTEXZ';
        toast.info('Página em construção')
     }, []);
    const data = [
        { mes: 'Janeiro', Frequencia: 20 },
        { mes: 'Fevereiro', Frequencia: 10 },
        { mes: 'Março', Frequencia: 10 },
        { mes: 'Abril', Frequencia: 25 },
        { mes: 'Junho', Frequencia: 23 },
        { mes: 'Julho', Frequencia: 21 },
        { mes: 'Agosto', Frequencia: 4 },
        { mes: 'Setembro', Frequencia: 7 },
        { mes: 'Outubro', Frequencia: 14 },
        { mes: 'Novembro', Frequencia: 18 },
        { mes: 'Dezembro', Frequencia: 28 },
       

      ];
      const estiloGrafico = {
        background: 'yellow',
       // Troque 'yellow' para a cor desejada
      };
  return (
        <div>
            <Header/>
            <div className="CabecalhoHealth">
                <h1 className="titleHealth">HEALTH</h1>
            </div>

            <div className="divInformacaoHealth">
                
                
            </div>
            <div className="divPrincipal">
                <h2 className="DataHealth">15/07/23</h2>
                <div className="centerbtn">
                <button onClick={handleClick} className="btnChecks">Daily Checks</button>
                </div>
                <div>
                <CSSTransition
        in={exibirDiv}
        timeout={300}
        classNames="animacao"
        unmountOnExit
      > 
              <div className="itenscheck"> 
                <form onSubmit={handleSubmit} >
                    <input type="radio" name="atividade" value="Academia"  checked={opcaoSelecionada === 'Academia'}
          onChange={handleOpcaoChange}/><label>Academia</label><br/>
                    <input type="radio" name="atividade" value="Corrida" checked={opcaoSelecionada === 'Corrida'}
          onChange={handleOpcaoChange} /><label>Corrida</label><br/>
                    <input type="radio" name="atividade" value="Treinos Diversos" checked={opcaoSelecionada === 'Treinos Diversos'}
          onChange={handleOpcaoChange}/><label>Treinos Diversos</label><br/>
                <br />
                <button type="submit">Enviar</button>
            </form>
            </div>
            </CSSTransition>

                </div>
                
            </div>
            <div className="divGráfico">
                <h3 className="tituloFrequenciaGrafico">Frequência Treino Anual</h3>
                <LineChart width={400} height={300} data={data} >
                <XAxis dataKey="mes" />
                <YAxis />
                <Line type="monotone" dataKey="Frequencia" stroke="#fff" />
                <Tooltip />
                <Legend />
                </LineChart>
            </div>
            
        </div>

  );
}
export default Health;
