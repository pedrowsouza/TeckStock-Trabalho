
const enderecoAPI = 'http://localhost:3000/materials/'

// Buscar todos os materiais
export async function buscarMateriais() {
  const resposta = await fetch(enderecoAPI)

  if (!resposta.ok) {
    throw new Error('Erro ao buscar materiais.')
  }

  return resposta.json()
}

// Cadastrar um novo material
export async function cadastrarMaterial(material) {
  const resposta = await fetch(enderecoAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(material)
  })

  if (!resposta.ok) {
    throw new Error('Erro ao cadastrar material.')
  }

  return resposta.json()
}

// Editar um material existente
export async function editarMaterial(identificador, dadosAtualizados) {
  const resposta = await fetch(
    `${enderecoAPI}${identificador}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    }
  )

  if (!resposta.ok) {
    throw new Error('Não foi possível editar o material.')
  }

  if (resposta.status === 204) {
    return null
  }

  return resposta.json()
}

// Excluir um material
export async function excluirMaterial(identificador) {
  const resposta = await fetch(
    `${enderecoAPI}${identificador}`,
    {
      method: 'DELETE'
    }
  )

  if (!resposta.ok) {
    throw new Error('Não foi possível excluir o material.')
  }

  if (resposta.status === 204) {
    return null
  }

  const conteudo = await resposta.text()

  return conteudo ? JSON.parse(conteudo) : null
}
