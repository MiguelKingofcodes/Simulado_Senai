import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './cadastroUsuario.css'
import userIcon from './assets/usuario2.png'

function CadastroUsuario() {

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
            </div>

        </div>
    </div>
{/* <div id="login">

<div class="caixa">
    
    <img src="img/logo.jpg" alt="">
    <h1>LOGIN</h1>

    <div class="email">
        <input type="email" placeholder="E-mail">
    </div>

    <div class="senha">
        <input type="text" placeholder="Senha">
    </div>

    <div class="entrar">
        <p>Ainda não tem uma conta? <a href="cadastro.html">Crie uma.</a></p>
        <input type="submit" value="Entrar">
    </div>

</div>

</div> */}

    </div>
  )
}

export default CadastroUsuario