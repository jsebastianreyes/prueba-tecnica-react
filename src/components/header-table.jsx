
function HeaderTable({setSort}) {
    return (
        <thead className="headerTable">
            <tr>
                <th>Foto</th>
                <th onClick={()=> setSort('name')}>Nombre</th>
                <th onClick={()=> setSort('lastname')}>Apellido</th>
                <th onClick={()=> setSort('country')}>País</th>
                <th>Acciones</th>
            </tr>
          
        </thead>
    )
}

export default HeaderTable
