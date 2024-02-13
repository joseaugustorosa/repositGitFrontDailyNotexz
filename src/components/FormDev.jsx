import React, { useState } from 'react';

const FloatingFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode realizar qualquer lógica de submissão de formulário, como enviar os dados para o servidor
    console.log(formData);
    // Fechar o modal após enviar o formulário
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Formulário</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="question1">Pergunta 1:</label>
            <input type="text" id="question1" name="question1" value={formData.question1} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="question2">Pergunta 2:</label>
            <input type="text" id="question2" name="question2" value={formData.question2} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="question3">Pergunta 3:</label>
            <input type="text" id="question3" name="question3" value={formData.question3} onChange={handleChange} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default FloatingFormModal;