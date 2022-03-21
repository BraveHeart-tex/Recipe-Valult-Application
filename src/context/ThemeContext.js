import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

// ilk once createContext() ile context olustur
// sonrasinda provider adinda bir component olusturmak icin function olustur ve children parametresi ilet
// children ilerde ThemeProvider ile sarabilecegimiz componentleri temsil ediyor.
// return edecegimiz value / template ise childrenlari saracak contextProvider olacak
// ThemeProvideri alip index.js icerisinde app componentimizi sariyoruz.

const themeReducer = (state, action) => {
  //current state ve action aliyor = dispatch icerisinde koydugumuz obje
  switch (action.type) {
    case 'CHANGE_COLOR':
      // inital state properties and the one we want to override
      return { ...state, color: action.payload }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  // 1. reducer function to update the state
  // 2. inital value for the state, current state
  const [state, dispatch] = useReducer(themeReducer, {
    color: '#58249c',
    mode: 'light',
  })

  const changeColor = (color) => {
    dispatch({ type: 'CHANGE_COLOR', payload: color })
  } // dispatch fonksiyonu action objesi alir ve bu aksiyon objesinin 2 tane propertysi olur type: ve payload seklinde. type genellikle UPPERCASE olur ve  payload : any data we want to base the state change on. bu fonksiyonu kullandigimiz zaman react bu fonksiyonun hangi reducer fonksiyonu ile iliskilendirildigine bakar ve themeReducer fonksiyonunu bulur sonra icerisinde state degisikligi yapmak icin o fonksiyonu calistirir

  const changeMode = (mode) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode })
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
