
import { v4 } from "uuid"
import { db } from "../database/connection.js"

function validarMaterial(body) {
    if (body.status === "Emprestado" && !body.responsavel?.trim()) {
        throw new Error("É obrigatório informar o responsável!")
    }
}

export async function getAllMaterials() {
    const [materials] = await db.query("SELECT * FROM materiais")

    return materials
}

export async function getMaterialById(id) {
    const [materials] = await db.query("SELECT * FROM materiais WHERE id = ?", [id])

    return materials[0]
}

export async function postMaterial(body) {
    validarMaterial(body)

    const { nome, descricao, categoria, numero_serie, status, responsavel } = body
    const id = v4()

    await db.query(
        "INSERT INTO materiais (id, nome, descricao, categoria, numero_serie, status, responsavel, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id, nome, descricao, categoria, numero_serie, status, responsavel ?? null, new Date()]
    )

    return { id, ...body }
}

export async function deleteMaterialService(id) {
    const [result] = await db.query("DELETE FROM materiais WHERE id = ?", [id])

    if (result.affectedRows === 0) {
        return "Material não encontrado!"
    }

    return "Material excluído!"
}

export async function putMaterialService(id, body) {
    validarMaterial(body)

    const { nome, descricao, categoria, numero_serie, status, responsavel } = body

    const [result] = await db.query(
        "UPDATE materiais SET nome = ?, descricao = ?, categoria = ?, numero_serie = ?, status = ?, responsavel = ? WHERE id = ?",
        [nome, descricao, categoria, numero_serie, status, responsavel ?? null, id]
    )

    if (result.affectedRows === 0) {
        return "Material não encontrado!"
    }

    return "Material atualizado!"
}

export async function patchMaterialService(id, body) {
    const material = await getMaterialById(id)

    if (!material) {
        return "Material não encontrado!"
    }

    const materialAtualizado = { ...material, ...body }

    validarMaterial(materialAtualizado)

    const { nome, descricao, categoria, numero_serie, status, responsavel } = materialAtualizado

    await db.query(
        "UPDATE materiais SET nome = ?, descricao = ?, categoria = ?, numero_serie = ?, status = ?, responsavel = ? WHERE id = ?",
        [nome, descricao, categoria, numero_serie, status, responsavel ?? null, id]
    )

    return "Material atualizado!"
}
