
import { useState } from 'react'
import { cadastrarMaterial } from '../../services/api'

const formularioInicial = {
  nome: '',
  categoria: '',
  numero_serie: '',
  status: 'Disponível',
  responsavel: '',
  data_cadastro: ''
}

export function CadastroMaterial({ aoCadastrar }) {

  const [formulario, setFormulario] = useState(formularioInicial)

  const [mensagem, setMensagem] = useState('')

  const [salvando, setSalvando] = useState(false)

  // Atualiza os campos do formulário
  function alterarCampo(evento) {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  // Envia o material para o backend
  async function enviarCadastro(evento) {
    evento.preventDefault()

    if (
      formulario.status === 'Emprestado' &&
      !formulario.responsavel.trim()
    ) {
      setMensagem('Informe o Funcionario Responsavel.')
      return
    }

    setSalvando(true)
    setMensagem('')

    try {
      await cadastrarMaterial({
        nome: formulario.nome,
        descricao: '',
        categoria: formulario.categoria,
        numero_serie: formulario.numero_serie,
        status: formulario.status,
        responsavel:
          formulario.status === 'Emprestado'
            ? formulario.responsavel
            : null,
        data_cadastro: formulario.data_cadastro
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
              onChange={alterCampo}
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
              type="date"
              name="data_cadastro"
              value={formulario.data_cadastro}
              onChange={alterarCampo}
              required
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
