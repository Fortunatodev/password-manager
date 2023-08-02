import React, { useState } from 'react';
import '../App.css';
import Swal from 'sweetalert2';

interface PasswordObject {
  newName: string;
  newLogin: string;
  newPassword: string;
  newUrl: string;
}

const validPassword = 'valid-password-check';
const invalidPassword = 'invalid-password-check';

type FormType = {
  formStatus: () => void;
  newPassword: (newPassword: PasswordObject) => void;
};

function Form({ formStatus, newPassword }: FormType) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function resetForm() {
    setName('');
    setLogin('');
    setPassword('');
    setUrl('');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newService: PasswordObject = {
      newName: name,
      newLogin: login,
      newPassword: password,
      newUrl: url,
    };
    newPassword(newService);
    resetForm();
    formStatus();
  }

  function isFormValid() {
    const button = document.getElementById('register') as HTMLInputElement | null;
    button?.setAttribute('disabled', '');
    if (name !== '' && login !== '' && isValidPassword(password)) {
      button?.removeAttribute('disabled');
    }
  }

  function handleName(event: any) {
    setName(event);
    isFormValid();
  }

  function handleLogin(event: any) {
    setLogin(event);
    isFormValid();
  }

  const isValidPassword = (element: string) => {
    const charRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    const numberRegex = /^(?=.*[@$!%*?&]).+$/;
    if (
      password.length > 7 &&
      password.length < 16 &&
      charRegex.test(element) &&
      numberRegex.test(element)
    ) {
      return true;
    }
  };

  function handlePassword(event: any) {
    setPassword(event);
    minCharValidation();
    maxCharValidation();
    charNumValidation();
    specialCharValidation();

    isFormValid();
  }

  function handleUrl(event: any) {
    setUrl(event);
    isFormValid();
  }

  function minCharValidation() {
    const toValid = document.getElementById('char8') as HTMLInputElement | null;
    if (password.length > 7) {
      toValid?.classList.remove(invalidPassword);
      toValid?.classList.add(validPassword);
    } else {
      toValid?.classList.remove(validPassword);
      toValid?.classList.add(invalidPassword);
    }
  }

  function maxCharValidation() {
    const toValid = document.getElementById('char16') as HTMLInputElement | null;
    if (password.length < 16) {
      toValid?.classList.remove(invalidPassword);
      toValid?.classList.add(validPassword);
    } else {
      toValid?.classList.remove(validPassword);
      toValid?.classList.add(invalidPassword);
    }
  }

  function charNumValidation() {
    const toValid = document.getElementById('charA1') as HTMLInputElement | null;
    const numberRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    if (numberRegex.test(password)) {
      toValid?.classList.remove(invalidPassword);
      toValid?.classList.add(validPassword);
    } else {
      toValid?.classList.remove(validPassword);
      toValid?.classList.add(invalidPassword);
    }
  }

  function specialCharValidation() {
    const toValid = document.getElementById('special') as HTMLInputElement | null;
    const numberRegex = /^(?=.*[@$!%*?&]).+$/;
    if (numberRegex.test(password)) {
      toValid?.classList.remove(invalidPassword);
      toValid?.classList.add(validPassword);
    } else {
      toValid?.classList.remove(validPassword);
      toValid?.classList.add(invalidPassword);
    }
  }

  function showPasswordToggle() {
    setShowPassword(!showPassword);
  }

  return (
    <form id="create-new-password" onSubmit={(event) => handleSubmit(event)}>
      <div className="form">
        <label>
          Nome do serviço
          <input
            type="text"
            name="nome-do-servico"
            value={name}
            onChange={({ target }) => handleName(target.value)}
          />
        </label>
        <div className="login">
          <label>
            Login
            <input
              type="text"
              name="login"
              value={login}
              onChange={({ target }) => handleLogin(target.value)}
            />
          </label>
          <label>
            Senha
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="senha"
                id="password"
                value={password}
                onChange={({ target }) => handlePassword(target.value)}
              />
              <button
                type="button"  // Adicionamos type="button" aqui
                id="password-input"
                data-testid="show-hide-form-password"
                onClick={showPasswordToggle}
              >
                {showPassword ? '🙊' : '🙈'}
              </button>
            </div>
          </label>
        </div>
        <label>
          URL
          <input
            type="text"
            name="URL"
            value={url}
            onChange={({ target }) => handleUrl(target.value)}
          />
        </label>
        <div className="form-actions">
          <button id="cancel" onClick={() => formStatus()}>Cancelar</button>
          <button id="register" disabled>Cadastrar</button>
        </div>
      </div>
      <div id='validacao'>
        <h3>Sua senha necessita de:</h3>
        <p id="char8" className={invalidPassword}>Possuir 8 ou mais caracteres</p>
        <p id="char16" className={invalidPassword}>Possuir até 16 caracteres</p>
        <p id="charA1" className={invalidPassword}>Possuir letras e números</p>
        <p id="special" className={invalidPassword}>Possuir algum caractere especial</p>
      </div>
    </form>
  );
}

export default Form;
