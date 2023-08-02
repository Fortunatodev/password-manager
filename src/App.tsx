import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';

type PasswordObject = {
  newName: string;
  newLogin: string;
  newPassword: string;
  newUrl: string;
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [passwordList, setPasswordList] = useState<Array<PasswordObject>>([]);
  const [hidePasswords, setHidePasswords] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const addPassword = (newPassword: PasswordObject) => {
    setPasswordList([...passwordList, newPassword]);
    showSuccessAlert('Senha cadastrada com sucesso!');
  };

  function erasePassword(name: string) {
    const updatedList = passwordList.filter((service) => service.newName !== name);
    setPasswordList(updatedList);
    showSuccessAlert('Senha apagada com sucesso!');
  }

  function handleHidePasswords() {
    setHidePasswords(!hidePasswords);
  }

  function toggleDarkMode() {
    setIsAnimating(true);
    setTimeout(() => {
      setDarkMode((prevMode) => !prevMode);
      setIsAnimating(false);
    }, 1000);
    // Ajuste o tempo da animação conforme desejado (em milissegundos)
  }

  // Function to show a SweetAlert2 success message
  const showSuccessAlert = (message: string) => {
    Swal.fire({
      title: 'Sucesso!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#4caf50',
      timer: 5000, // Auto close after 5 seconds
      timerProgressBar: true,
    });

    
  };

  // Function to show a SweetAlert2 error message
  const showErrorAlert = (message: string) => {
    Swal.fire({
      title: 'Erro!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#f44336',
      timer: 5000, // Auto close after 5 seconds
      timerProgressBar: true,
    });
  };

  // Bind the erasePassword function to service.newName outside of the JSX
  const handleErasePassword = (name: string) => {
    return erasePassword.bind(null, name);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <header className="App-header">
        <div className="darkmode">
          <div className={`toggle-button`} onClick={toggleDarkMode}>
            <div className={`toggle-ball ${darkMode ? 'move-ball-animation' : ''}`}></div>
          </div>
        </div>
         <h1>Gerenciador <strong><span>*</span></strong>de<strong><span>*</span></strong>Senhas</h1>

        {showForm ? (
          <Form formStatus={() => setShowForm(false)} newPassword={addPassword} />
        ) : (
          <button onClick={() => setShowForm(true)}>Cadastrar nova senha</button>
        )}
        <hr />

        {passwordList.length === 0 ? (
          <div className="checkBoxAlert">
            <p data-testid="no-passwords-message">Não há nenhuma senha cadastrada...</p>
          </div>
        ) : (
          <ul className="card-container">
            {passwordList.map((service) => (
              <li key={service.newName} className="card">
                <a id="href" href={service.newUrl} target="_blank" rel="noopener noreferrer">
                  {service.newName}
                </a>
                <span>Login: </span>
                <span>{service.newLogin}</span>
                <p>Senha: {hidePasswords ? '******' : service.newPassword}</p>
                <button
                  id="clean"
                  data-testid="remove-btn"
                  onClick={() => {
                    handleErasePassword(service.newName)();
                  }}
                >
                  Apagar Senha
                </button>
              </li>
            ))}
          </ul>
        )}
        
        <label id="checkbox">
      <span role="img" aria-label={hidePasswords ? 'Cadeado Fechado' : 'Cadeado Aberto'}>
        {hidePasswords ? '🔒' : '🔓'}
      </span>
      <input
        id="check"
        type="checkbox"
        checked={hidePasswords}
        onChange={handleHidePasswords}
      />
    </label>
      </header>
    </div>
  );
}

export default App;
