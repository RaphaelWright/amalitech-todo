import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Details = () => {

  const {id} = useParams()
  const [details, setDetails] = useState("")

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`https://dummyjson.com/todos/${id}`)
            const data = await response.json()
            console.log(data.todo)
            setDetails(data.todo)

        }

        fetchDetails()
    }, [id])


  return (
    <div>
        {details}
    </div>
  )
}

export default Details