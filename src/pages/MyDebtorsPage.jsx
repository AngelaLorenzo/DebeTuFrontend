import { useEffect, useState } from "react";
import Debts from "../components/Debts";
import DebtForm from "../components/DebtForm";

const MyDebtors = () => {
    const [debtors, setDebtors] = useState([])


    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchingDebtors = async () => {
          const request = await fetch(import.meta.env.VITE_BACKEND+'/connection/getMyDebtors',
          {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token,
            }
          })
          const arrayDeConexiones = await request.json()
          setDebtors(arrayDeConexiones)
        }
    
        fetchingDebtors()
      }, [])

    async function handleRemoveDebt(idConnection, idDebt){
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_BACKEND+`/connection/removeDebt/${idConnection}/${idDebt}`,
      {
        method:'DELETE',
        headers: {
          'Content-Type':'application/json',
          "Authorization": "bearer " + token,
        },
      })
      const data = await response.json()
      console.log(data)
      //TODO refrescar la lista
      const newDebtors = [...debtors]
      console.log(newDebtors)

      const debtorToRemoveDebt = newDebtors.find(e=>e._id === idConnection)
     console.log(debtorToRemoveDebt)
     debtorToRemoveDebt.debts = debtorToRemoveDebt.debts.filter(e=>e._id !== idDebt)
      setDebtors(newDebtors)
    }

    async function handleAddDebt(event, idConnection, debtData){
      event.preventDefault()
      let concept =event.target.concept
      let amount = event.target.amount



      const token = localStorage.getItem("token");
        const response = await fetch(import.meta.env.VITE_BACKEND+'/connection/addDebt/'+idConnection,
        {
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            "Authorization": "bearer " + token,
          },
          body: JSON.stringify( { amount, concept } )  
        })
    }

    const newDebtors = [...debtors]
    const debtorToRemoveDebt = newDebtors.find(e=>e._id === idConnection)
    debtorToAddDebts.debts.push({_id:data.debts[data.debts.lenght-1]._id, amount, concept})
    setDebtors(newDebtors)



    return <>
        <h1>Listado de mis deudores</h1>
        <ul>
        {debtors.map((debtor) => (
          <li key={debtor._id}>
            <h2>
              Deudor: {debtor.debtor.name} ({debtor.debtor.email})
            </h2>
            <Debts 
              handleRemove={(idDebt)=>handleRemoveDebt(debtor._id,idDebt)} 
              debts={debtor.debts}/>

            <DebtForm onSubmit={()=>handleAddDebt(e, debtor._id)} idConnection={debtor._id}/>
          </li>
        ))}
      </ul>
    </>
}

export default MyDebtors