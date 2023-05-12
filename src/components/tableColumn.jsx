
function TableColumn({user, index, color, deleteUser}) {
    
    console.log(user)
    return (
        <tr className={`userColumn column-${index} ${color ? 'active' : '' }`}>
            <td>
              {user.picture && <img src={user.picture.medium} width='70' alt={user.name} />}
            </td>
            <td>
             {user.name.first} 
            </td>
            <td>
            {user.name.last}  
            </td>
            <td>
            {user.location.country}  
            </td>
            <td>
                <button onClick={()=> deleteUser(user.email) }> Borrar </button>
            </td>
         
        </tr>
      
    )
}

export default TableColumn
