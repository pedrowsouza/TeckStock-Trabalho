import { createMaterial, deleteMaterial, listAllMaterials, listMaterialById, patchMaterial, putMaterial } from '../controllers/materials-controller.js'

export async function materialsRoutes(app) {
    // Listar
    app.get('/', listAllMaterials)
    // Consultar
    app.get('/:id', listMaterialById)
    // Cadastrar
    app.post('/', createMaterial)
    // Excluir
    app.delete('/:id', deleteMaterial)
    // Atualizar 
    app.put('/:id', putMaterial)
    // Atualizar parcialmente
    app.patch('/:id', patchMaterial)
}
