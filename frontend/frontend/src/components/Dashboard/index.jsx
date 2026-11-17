
export function Dashboard({ materiais }) {
  const totalDeMateriais = materiais.length

  const materiaisDisponiveis = materiais.filter(
    material => material.status === 'Disponível'
  ).length

  const materiaisEmprestados = materiais.filter(
    material => material.status === 'Emprestado'
  ).length

  const indicadores = [
    {
      titulo: 'Total de Materiais',
      quantidade: totalDeMateriais
    },
    {
      titulo: 'Disponíveis',
      quantidade: materiaisDisponiveis
    },
    {
      titulo: 'Emprestados',
      quantidade: materiaisEmprestados
    }
  ]

  return (
    <section className="dashboard">
      {indicadores.map(indicador => (
        <div className="card" key={indicador.titulo}>
          <h3>{indicador.titulo}</h3>
          <p>{indicador.quantidade}</p>
        </div>
      ))}
    </section>
  )
}
