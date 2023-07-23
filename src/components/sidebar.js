import React ,{useState}from 'react';
import '../App.css'; // Crie um arquivo CSS para estilizar a sidebar, se necessário.
import '../style/sidebar.css'

const Sidebar = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [showInput, setShowInput] = useState(false); 
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
       
        
      
      {showInput ? (
        <div>
          <input type="text"  className='testes' placeholder='Nomeie seu quadro'/>
          <button>C</button>
          <button>D</button>
          </div>
      ) : (
       <li></li>
        )}
       <li className='itemCriar' onClick={handleToggleInput} >Criar Quadro</li>
</ul>
      
    </div>
  );
};

export default Sidebar;