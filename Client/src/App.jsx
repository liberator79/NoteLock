
import { RouterProvider} from "react-router-dom"
import router from "./router/router"

const App = () => {
  
  return (
    
      <div className="bg-slate-800 h-[100%] min-h-[100vh] w-[100%] font-sans">
        <RouterProvider router={router}/>
      </div>
  )
}

export default App
