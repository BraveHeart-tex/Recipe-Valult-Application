import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'
// styles
import './Home.css'

//components
import RecipeList from '../../components/RecipeList'

const Home = () => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    //fetching documents from firebase
    const unsub = projectFirestore.collection('recipes').onSnapshot(
      //Attaches a listener for QuerySnapshot events.
      (snapshot) => {
        if (snapshot.empty) {
          setError('no recipes to load')
          setIsPending(false)
        } else {
          let results = []
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() })
          })
          setData(results)
          setIsPending(false)
        }
      },
      (err) => {
        setError(err.message)
        setIsPending(false)
      }
    )
    return () => unsub() //cleanup function
  }, [])

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

export default Home
