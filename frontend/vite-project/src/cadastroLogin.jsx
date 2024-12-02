import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './cadastroLogin.css'
import userIcon from './assets/usuario2.png'

function CadastroLogin() {

  return (
    <div className="body">


    <div className="login">
        <div className="caixa">
        <img src={userIcon}></img>
            <h1>Cadastre um novo Login</h1>
            <p>Preencha os campos abaixo</p>

            <div className="email">
                <input type="email" placeholder='E-mail' />
            </div>

            <div className="senha">
                <input type="password" placeholder='Senha' />
            </div>

            <div className="entrar">
                <input type="submit" placeholder='Cadastrar' />
            </div>

        </div>
    </div>
    </div>
  )
}

export default CadastroLogin