import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

//firebase
import { projectFirestore } from '../../firebase/config'

//styles
import './Recipe.css'

const Recipe = () => {
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  const { id } = useParams()
  const { mode } = useTheme()

  useEffect(() => {
    setIsPending(true)

    //fetch from firestore
    const unsub = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false)
          setRecipe(doc.data()) //.data() Retrieves all fields in the document as an Object. Returns 'undefined' if the document doesn't exist.
        } else {
          setIsPending(false)
          setError('Could not find that recipe')
        }
      })

    return () => unsub() //cleanup function when component unmounts
  }, [id])

  // const handleClick = () => {
  // update the title
  //   projectFirestore.collection('recipes').doc(id).update({
  //     title: 'Something different',
  //   })
  // }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          {/* <button onClick={handleClick}>Update me</button> */}
        </>
      )}
    </div>
  )
}

export default Recipe
