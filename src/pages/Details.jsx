import { useEffect } from "react"

const Details = () => {

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch('https://dummyjson.com/todos/{id}')
            const data = await response.json()
            console.log(data)
        }

        fetchDetails()
    }, [])


  return (
    <div>
        
    </div>
  )
}

export default Details