import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'
function Login() {

  useEffect(() => {
    document.title = 'DAILY NOTEXZ';
    
   }, []);



    const navigate = useNavigate();
    const [email, SetEmail] = useState('');
    const [password, Setpassword] = useState('');
   
    function login(){
      console.log(password)
      var resultado
      Axios.post("https://backenddailynotes.onrender.com/login",{ 
        email: email,
        pass: password
        
      }).then((response)=>{  
        resultado = response.data.msg
        if(resultado === 'Login Não Autorizado'){
          toast.success('deu merda!', {
            position: toast.POSITION.TOP_RIGHT
          });
        }else if(resultado === 'Login Autorizado'){
          const informacao = response.data.nome;
          const user = response.data.user;
          const login = 'Tá Logado'
          const token = "kajsdkhadgyfgdatwutygwoad"
          localStorage.setItem('informacao', informacao);
          localStorage.setItem('user', user);
          localStorage.setItem('token', token);
          
          console.log(response.data)
          toast.success('Login Autorizado, boa !!', {
            position: toast.POSITION.TOP_RIGHT
          });
          navigate('/home')
        }else{
          toast.error('escreve o bagulho certo!', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }).catch((error) => {
        toast.error('deu kao no back meu amigo!', {
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
