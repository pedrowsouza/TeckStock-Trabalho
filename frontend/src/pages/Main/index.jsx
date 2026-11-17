
import { useEffect, useState } from 'react'
import { Dashboard } from '../../components/Dashboard'
import { CadastroMaterial } from '../../components/CadastroMaterial'
import { ListaMateriais } from '../../components/ListaMateriais'
import { buscarMateriais } from '../../services/api'

export function Main() {
  const [materiais, setMateriais] = useState([])
  const [erro, setErro] = useState('')

  async function carregarMateriais() {
    try {
      const dados = await buscarMateriais()
      setMateriais(dados)
      setErro('')
    } catch (erro) {
      setErro('Não foi possível carregar os materiais.')
      throw erro
    }
  }

  useEffect(() => {
    carregarMateriais().catch(console.error)
  }, [])

  return (
    <div className="app">
      <header>
        <h1> 🧰 TechStock 🧰 </h1>
        <p>Sistema de Gerenciamento de Materiais da TechSolutions</p>
      </header>

      <main>
        <h2>Painel de Controle</h2>

        <Dashboard materiais={materiais} />

        <CadastroMaterial aoCadastrar={carregarMateriais} />

        {erro && <p className="mensagem">{erro}</p>}

        <ListaMateriais
          materiais={materiais}
          aoAtualizar={carregarMateriais}
        />
      </main>
    </div>
  )
}

export default Main
