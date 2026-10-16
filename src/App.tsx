import {BrowserRouter, Routes, Route} from "react-router-dom"
  
  import Employees from "./pages/Employees"
import AddEmployee from "./pages/AddEmployee"
import EditEmployee from "./pages/EditEmployee"

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element = {<Employees/>}/>
    <Route path="/add-employee" element = {<AddEmployee/>}/>
    <Route path="/edit-employee/:id" element = {<EditEmployee/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default App
