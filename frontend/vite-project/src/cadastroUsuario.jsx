import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './cadastroUsuario.css'
import userIcon from './assets/usuario2.png'

function CadastroUsuario(props) {

  return (
    <div className="body">


    <div className="login">
        <div className="caixa">
        <img src={userIcon}></img>
            <h1>Login</h1>

            <div className="email">
                <input type="email" placeholder='E-mail' />
            </div>

            <div className="senha">
                <input type="password" placeholder='Senha' />
            </div>

            <div className="entrar">
                <input type="submit" placeholder='Entrar' />
                <p>Ainda não tem um login? <a onClick={() => props.changePage("NovoLogin")}>Crie um.</a></p>
            </div>

        </div>
    </div>
    </div>
  )
}

export default CadastroUsuario