import './App.scss'

import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { useEffect, useContext } from 'react'
import { AppContext } from './ContexData/app.contex'
import { LocalStorageEventTarget } from './utils/auth'

const App = () => {
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return <RouterProvider router={routes} />
}

export default App
