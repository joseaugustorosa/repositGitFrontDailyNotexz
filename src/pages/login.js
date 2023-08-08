import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'
function Login() {
  const urlBackend = 'https://backenddailynotexz.onrender.com'//'https://backenddailynotes.onrender.com'
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
    <div className='min-h-screen min-w-full bg-darkmode_bg py-32'>
        <div className="w-1/2 h-auto bg-white mx-auto my-auto py-5 rounded-lg text-center">
                <h1 className="text-black-500 text-4xl">DAILY NOTEXZ</h1>
                <div className="w-11/12 mx-auto py-3 mt-4">
                    <input type="text" className="w-full h-10 border border-gray_input	rounded-lg  box-border p-4 focus:border-blue_input_focus focus:outline-none " placeholder="Usuário" value={email} onChange={(e)=> SetEmail(e.target.value)}/>
                </div>
                <div className="w-11/12 mx-auto py-2">
                    <input type="password" className="w-full h-10  border border-gray_input	rounded-lg  box-border p-4 focus:border-blue_input_focus focus:outline-none" placeholder="Senha" value={password} onChange={(e)=> Setpassword(e.target.value)}/>
                </div>
                <div className="">
                <button className="bg-green text-white rounded-lg py-2 px-4 mt-4" onClick={login}>Entrar</button>
                </div>   
        </div>
</div>
  );
}
export default Login;
