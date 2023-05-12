
function TableColumn(user, index, color, deleteUser) {
    
    console.log(user)
    return (
        <tr className={`userColumn column-${index} ${color ? 'active' : '' }`}>
            <td>
              {user.user.picture && <img src={user.user.picture.medium} width='70' alt={user.user.name} />}
            </td>
            <td>
             {user.user.name.first} 
            </td>
            <td>
            {user.user.name.last}  
            </td>
            <td>
            {user.user.location.country}  
            </td>
            <td>
                <button onClick={()=> deleteUser(user.user.email) }> Borrar </button>
            </td>
         
        </tr>
      
    )
}

export default TableColumn
