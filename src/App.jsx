import { useState, useEffect, useRef, useMemo } from 'react'
import Table from './components/table'
import HeaderTable from './components/header-table'
import TableColumn from './components/tableColumn'
import './App.css'

function App() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [usersApi, setUsersApi] = useState([])
  const [colorRow, setColorRow] = useState(false)
  const [sort, setSort] = useState(null)
  const copyUsers = useRef()
  const [query, setQuery] = useState('')

  console.log(sort)


  const deleteUser = (email) => {
    const copyUsers = structuredClone(usersApi)
    setUsersApi(copyUsers.filter(user =>  user.email !=  email))

  }

  const restore = () => {  
    setUsersApi(copyUsers.current)    
  }

 const filtered = useMemo(() => {
    return query != null && query.length > 0
      ? usersApi.filter(user => {
        return user.location.country.toLowerCase().includes(query.toLowerCase())
      })
      : usersApi
  }, [usersApi, query])



  const sorted = useMemo(() => {
    // console.log('sorted')
    if(sort === 'country'){
     return filtered.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country))
    }
    else if(sort === 'name'){
       return filtered.toSorted(
       (a, b) => a.name.first.localeCompare(b.name.first))      
    }
    else if(sort === 'lastname'){
      return filtered.toSorted(
      (a, b) => a.name.last.localeCompare(b.name.last))      
   }
    
    return filtered

  }, [sort, filtered])

 
  const handleChangeFilter = (e) => {
    const value = e.target.value
    setQuery(value) 
  }

  function handleFilterCountry(){
    const sorted = sort === null ? 'country' : null
    setSort(sorted)
  }

  useEffect(()=>{
    
   setLoading(true)
   fetch('https://randomuser.me/api/?results=20')
      .then(res => res.json())
      .then(data => {
        copyUsers.current = data.results
        setUsersApi(data.results)    
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false)  )
    },[])


  return (
    <>
      <h1>Usuarios 🫶🏻</h1>
      <header className='buttons'>
        <button onClick={()=> setColorRow(!colorRow)}>{ colorRow ? "Eliminar BG" : "Colorear Filas" }</button>
        <button onClick={handleFilterCountry}>{ sort === 'country' ? 'No ordenar' : 'Ordenar por País' }</button>
       <button onClick={restore}>Restaurar Estado</button>
       <input value={query} type="text" placeholder='Colombia...' onChange={handleChangeFilter} />
      </header>
      <main>
      {loading && <div className='loading'> <img  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="" /> </div>  }
      {error &&  !loading && <h3> Ha ocurrido un error</h3>}
        { !error && !loading && usersApi.length === 0 && <h3>No tenemos usuarios</h3>}
        { !error && !loading && usersApi.length > 0 && 
          <Table>
          <HeaderTable setSort={setSort}/> 
          <tbody> 
           {sorted?.map((user, index) => <TableColumn key={user.email} color={colorRow} index={index} user={user} deleteUser={deleteUser}/> )} 
          </tbody>
        </Table>
        }
      </main>
     


    
    </>
  )
}

export default App
