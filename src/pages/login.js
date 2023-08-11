import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'
function Login() {
  const urlBackend = 'http://localhost:3001'//'https://backenddailynotes.onrender.com'
  const navigate = useNavigate();
  const [email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');
 
  useEffect(() => {
    document.title = 'LOGIN - DAILY NOTEXZ';
  }, []);
  function login(){
    console.log(password)
    var resultado
    Axios.post(urlBackend + "/login",{ 
      email: email,
      pass: password
        
    }).then((response)=>{  
      resultado = response.data.msg
      if(resultado === 'EM BRANCO OU NULO'){
        toast.error('Há campos em branco!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }else if(resultado === 'LOGIN AUTORIZADO'){
        const informacao = response.data.nome;
        const user = response.data.user;
        const login = 'Tá Logado'
        const token = "kajsdkhadgyfgdatwutygwoad"
        localStorage.setItem('informacao', informacao);
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        console.log(response.data)
        toast.success('Login Feito com sucesso!', {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate('/home')
      }else if(resultado === 'NÃO ENCONTRADO'){
        toast.error('Credenciais inexistentes!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }).catch((error) => {
      console.log(error)
      toast.error('Servidor sem resposta.', {
        position: toast.POSITION.TOP_RIGHT
      });
    });
  }
  return (
    <div className='BackLogin'>
        <div className="containerLogin">
                <h1 className="titleLogin">DAILY NOTEXZ</h1>
                <div className="inputsLogin">
                    <input type="text" className="inputLogin" placeholder="Usuário" value={email} onChange={(e)=> SetEmail(e.target.value)}/>
                </div>
                <div className="inputsLogin">
                    <input type="password" className="inputLogin" placeholder="Senha" value={password} onChange={(e)=> Setpassword(e.target.value)}/>
                </div>
                <div className="divBotaoLogin">
                <button className="LoginButton" onClick={login}>Entrar</button>
                </div>   
        </div>
</div>
  );
}
export default Login;
