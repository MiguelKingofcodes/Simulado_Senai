import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CadastroUsuario from './cadastroUsuario'
import CadastroLogin from './cadastroLogin'

function App() {

  // Pagina inicial (Login Usuario) -> "Login"
  const [pagina, setPagina] = useState("Login")

  return (
    <>
      {

        pagina === "Login" && (
          <CadastroUsuario ></CadastroUsuario>
        )

      }

      {

      pagina === "NovoLogin" && (
        <CadastroLogin></CadastroLogin>
      )

      }



     

    </>
  )
}

export default App
