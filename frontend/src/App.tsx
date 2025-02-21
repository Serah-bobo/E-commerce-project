import { Route } from "react-router-dom"
import { createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Layout from "./Components/Layout"
const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
   <Route index  element={<Home/>}/>
   <Route path="about" element={<About/>}/>    
    </Route>
    
  ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App
