
import { useState } from 'react'
import { cadastrarMaterial } from '../../services/api'

const formularioInicial = {
  nome: '',
  categoria: '',
  numero_serie: '',
  status: 'Disponível',
  responsavel: ''
}

export function CadastroMaterial({ aoCadastrar }) {

  const [formulario, setFormulario] = useState(formularioInicial)

  const [mensagem, setMensagem] = useState('')

  const [salvando, setSalvando] = useState(false)

  // Mostra a data atual no formato brasileiro
  const dataAtual = new Date().toLocaleDateString('pt-BR')

  // Atualiza os campos do formulário
  function alterarCampo(evento) {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  // Envia o cadastro para o backend
  async function enviarCadastro(evento) {
    evento.preventDefault()

    if (
      formulario.status === 'Emprestado' &&
      !formulario.responsavel.trim()
    ) {
      setMensagem('Informe o responsável pelo empréstimo.')
      return
    }

    setSalvando(true)
    setMensagem('')

    try {
      await cadastrarMaterial({
        ...formulario,
        descricao: '',
        responsavel:
          formulario.status === 'Emprestado'
            ? formulario.responsavel
            : null
      })

      setFormulario({ ...formularioInicial })

      await aoCadastrar()

      setMensagem('Material cadastrado com sucesso!')

    } catch (erro) {
      setMensagem(erro.message)

    } finally {
      setSalvando(false)
    }
  }

  return (
    <section className="cadastro">

      <h2>Cadastrar Material</h2>

      <form onSubmit={enviarCadastro}>

        <div className="form-grid">

          <label>
            Nome do Material
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={alterarCampo}
              required
            />
          </label>

          <label>
            Categoria
            <input
              type="text"
              name="categoria"
              value={formulario.categoria}
              onChange={alterarCampo}
            />
          </label>

          <label>
            Número de Série
            <input
              type="text"
              name="numero_serie"
              value={formulario.numero_serie}
              onChange={alterarCampo}
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formulario.status}
              onChange={alterarCampo}
            >
              <option value="Disponível">
                Disponível
              </option>

              <option value="Emprestado">
                Emprestado
              </option>
            </select>
          </label>

          {formulario.status === 'Emprestado' && (
            <label>
              Responsável pelo Empréstimo
              <input
                type="text"
                name="responsavel"
                value={formulario.responsavel}
                onChange={alterarCampo}
                required
              />
            </label>
          )}

          <label>
            Data de Cadastro
            <input
              type="text"
              value={dataAtual}
              readOnly
            />
          </label>

        </div>

        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : 'Cadastrar Material'}
        </button>

        {mensagem && (
          <p className="mensagem">
            {mensagem}
          </p>
        )}

      </form>

    </section>
  )
}
