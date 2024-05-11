import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MasterLayout from './Shared/MasterLayout/MasterLayout'
import NotFound from './Shared/NotFound/NotFound'
import Home from './Components/Home/Home'
import Users from './Components/Users/Users'
import Category from './Components/Category/Category'
import Recipes from './Components/Recipes/Recipes'
import AuthLayout from './Shared/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import Rigester from './Components/Rigester/Rigester'
import RequsetResetPass from './Components/RequsetResetPass/RequsetResetPass'
import RestPassword from './Components/RestPassword/RestPassword'
import Verify from './Components/Verify/Verify'
import { ToastContainer } from 'react-toastify'

function App() {

  const routes = createBrowserRouter([

    {
      path : "dashboard",
      element : <MasterLayout/> ,
      errorElement : <NotFound/> ,
      children : [
        {index : true , element: <Home/> },
        {path : "users" , element: <Users/> },
        {path : "categories" , element: <Category/> },
        {path : "recipes" , element: <Recipes/> },
      ]
    },

    {
      path : "/",
      element : <AuthLayout/> ,
      errorElement : <NotFound/> ,
      children : [
        {index: true, element: <Login/> },
        {path : "login", element: <Login/> },
        {path : "register", element: <Rigester/> },
        {path : "requsetRestPass", element: <RequsetResetPass/> },
        {path : "restPassword", element: <RestPassword/> },
        {path : "verify", element: <Verify/> },
      ]
    }

  ])

  return (
    <>
      
      <ToastContainer
        theme='colored'
        autoClose={1000}
        position='top-left'
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      <RouterProvider router={routes} />

    </>
  )
}

export default App
