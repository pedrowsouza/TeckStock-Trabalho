import { deleteMaterialService, getAllMaterials, getMaterialById, patchMaterialService, postMaterial, putMaterialService } from "../services/materials-services.js"

export async function listAllMaterials(request, response) {
    const materials = await getAllMaterials()

    return response.code(200).send(materials)
}

export async function listMaterialById(request, response) {
    const material = await getMaterialById(request.params.id)

    if (!material) {
        return response.code(404).send({ message: "Material não encontrado!" })
    }

    return response.code(200).send(material)
}

export async function createMaterial(request, response) {
    const newMaterial = await postMaterial(request.body)

    return response.code(201).send(newMaterial)
}

export async function deleteMaterial(request, response) {
    const message = await deleteMaterialService(request.params.id)

    return response.code(202).send({ message: message })
}

export async function putMaterial(request, response) {
    const message = await putMaterialService(request.params.id, request.body)

    return response.code(200).send({ message: message })
}

export async function patchMaterial(request, response) {
    const message = await patchMaterialService(request.params.id, request.body)

    return response.code(200).send({ message: message })
}
