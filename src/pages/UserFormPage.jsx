import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const UserForm = () => {
    const INITIAL_STATE={
        name:'pepe',
        email:'',
        password:''
    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState({INITIAL_STATE})

    const navigate = useNavigate();
    const [error, setError] = useState(null)

    function handleChange(e){
        setUser({...user, [e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch('http://localhost:3000/user',
        {
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            // 'Authorization': 'bearer xxxxxxx'
          },
          body: JSON.stringify( { name, email,  password } )  
        })
        if(!response.ok){
            console.log('error en la peticion:')
        }else{
            //TODO mostrar un mensaje tipo toast
            navigate('/userList')
        }

    }
    //validacion del formulario (soo del nombre)
    useEffect( ()=> {
        //TODO no mostrar el nombre la primera vez o actualices la página
        if(!name){
        setError('El nombre no puede estar vacío')
        return
        }
        if(name.length < 3){
        setError('La longitus del nombre tiene que ser mayor que 2')
        return
        }
        setError(null)

    }, [name] )

    //formulario
    return <>
        <h1>Formulario registro</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={user.name} 
                onChange={handleChange}/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={user.email} 
                onChange={handleChange}/>
        
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={user.password} 
                onChange={handleChange}/>

            <button type="submit">Registro</button>
        </form>
        
        {error && <p style={{color:'red'}}>{error}</p>}
    </>
}

export default UserForm