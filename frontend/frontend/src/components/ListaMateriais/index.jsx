import { useState } from 'react'
import { editarMaterial, excluirMaterial } from '../../services/api'
export function ListaMateriais({ materiais, aoAtualizar }) {

  const [materialEmEdicao, setMaterialEmEdicao] = useState(null)
  const [formularioEdicao, setFormularioEdicao] = useState({})
  const [mensagem, setMensagem] = useState('')
  const [processando, setProcessando] = useState(false)

  // Formatar data de cadastro
  function formatarData(dataCadastro) {
    if (!dataCadastro) {
      return '-'
    }

    const data = new Date(dataCadastro)

    if (Number.isNaN(data.getTime())) {
      return '-'
    }

    return data.toLocaleDateString('pt-BR')
  }

  // Abrir formulário de edição
  function iniciarEdicao(material) {

    console.log('Botão Editar clicado:', material)

    setMaterialEmEdicao(material.id)

    setFormularioEdicao({
      nome: material.nome || '',
      descricao: material.descricao || '',
      categoria: material.categoria || '',
      numero_serie: material.numero_serie || '',
      status: material.status || 'Disponível',
      responsavel: material.responsavel || ''
    })

    setMensagem('')
  }

  // Atualizar os campos da edição
  function alterarCampo(evento) {
    const { name, value } = evento.target

    setFormularioEdicao({
      ...formularioEdicao,
      [name]: value
    })
  }

  // Cancelar a edição
  function cancelarEdicao() {

    setMaterialEmEdicao(null)

    setFormularioEdicao({})

    setMensagem('')
  }

  // Salvar as alterações no banco
  async function salvarEdicao(evento) {
    evento.preventDefault()

    console.log('Salvando alterações:', formularioEdicao)

    if (
      formularioEdicao.status === 'Emprestado' &&
      !formularioEdicao.responsavel.trim()
    ) {
      setMensagem('Informe o responsável pelo empréstimo.')
      return
    }

    setProcessando(true)
    setMensagem('')

    try {

      await editarMaterial(materialEmEdicao, {
        ...formularioEdicao,
        responsavel:
          formularioEdicao.status === 'Emprestado'
            ? formularioEdicao.responsavel
            : null
      })

      await aoAtualizar()

      setMaterialEmEdicao(null)
      setFormularioEdicao({})

      setMensagem('Material atualizado com sucesso!')

    } catch (erro) {

      console.error('Erro ao editar material:', erro)

      setMensagem(erro.message)

    } finally {

      setProcessando(false)
    }
  }

  // Excluir um material
  async function confirmarExclusao(material) {

    console.log('Botão Excluir clicado:', material)

    const confirmacao = window.confirm(
      `Deseja realmente excluir o material "${material.nome}"?`
    )

    if (!confirmacao) {
      return
    }

    setProcessando(true)
    setMensagem('')

    try {

      await excluirMaterial(material.id)

      await aoAtualizar()

      if (materialEmEdicao === material.id) {
        setMaterialEmEdicao(null)
        setFormularioEdicao({})
      }

      setMensagem('Material excluído com sucesso!')

    } catch (erro) {

      console.error('Erro ao excluir material:', erro)

      setMensagem(erro.message)

    } finally {

      setProcessando(false)
    }
  }

  return (
    <section className="materiais">

      <h2>Materiais Cadastrados</h2>

      {mensagem && (
        <p className="mensagem">{mensagem}</p>
      )}

      <table>

        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Número de Série</th>
            <th>Data de Cadastro</th>
            <th>Status</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {materiais.length === 0 ? (

            <tr>
              <td colSpan="7">
                Nenhum material cadastrado.
              </td>
            </tr>

          ) : (

            materiais.map(material => (

              <tr key={material.id}>

                <td>{material.nome}</td>

                <td>{material.categoria || '-'}</td>

                <td>{material.numero_serie || '-'}</td>

                <td>
                  {formatarData(material.createdAt)}
                </td>

                <td>{material.status}</td>

                <td>{material.responsavel || '-'}</td>

                <td>

                  <div className="acoes-material">

                    <button
                      type="button"
                      className="botao-editar"
                      disabled={processando}
                      onClick={() => iniciarEdicao(material)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="botao-excluir"
                      disabled={processando}
                      onClick={() => confirmarExclusao(material)}
                    >
                      Excluir
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      {/* Formulário de edição */}

      {materialEmEdicao !== null && (

        <div className="painel-edicao">

          <h3>Editar Material</h3>

          <form onSubmit={salvarEdicao}>

            <div className="form-grid">

              <label>
                Nome do Material
                <input
                  type="text"
                  name="nome"
                  value={formularioEdicao.nome || ''}
                  onChange={alterarCampo}
                  required
                />
              </label>

              <label>
                Categoria
                <input
                  type="text"
                  name="categoria"
                  value={formularioEdicao.categoria || ''}
                  onChange={alterarCampo}
                />
              </label>

              <label>
                Número de Série
                <input
                  type="text"
                  name="numero_serie"
                  value={formularioEdicao.numero_serie || ''}
                  onChange={alterarCampo}
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={formularioEdicao.status || 'Disponível'}
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

              {formularioEdicao.status === 'Emprestado' && (

                <label>
                  Responsável pelo Empréstimo
                  <input
                    type="text"
                    name="responsavel"
                    value={formularioEdicao.responsavel || ''}
                    onChange={alterarCampo}
                    required
                  />
                </label>

              )}

            </div>

            <div className="botoes-edicao">

              <button
                type="submit"
                className="botao-salvar"
                disabled={processando}
              >
                {processando
                  ? 'Salvando...'
                  : 'Salvar Alterações'}
              </button>

              <button
                type="button"
                className="botao-cancelar"
                disabled={processando}
                onClick={cancelarEdicao}
              >
                Cancelar
              </button>

            </div>

          </form>

        </div>

      )}

    </section>
  )
}
