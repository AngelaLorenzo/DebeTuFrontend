import './App.css'
import Messages from './pages/MessagesPage'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Saludo from './pages/SaludoPage'
import Navbar from './components/Navbar'
import UserListOld from './pages/UserListPageOld'
import UserFormPageOld from './pages/UserFormPageOld'
import Login from './pages/LoginPage'
import Me from './pages/MePage'
import MyDebtors from './pages/MyDebtorsPage'
import MyCreditors from './pages/MyCreditorsPage'

function App() {

  return (
    <BrowserRouter>
        <Navbar/>
       <Routes>
        <Route path="/" element={<Saludo/>}></Route>
        <Route path="/chat" element={<Messages/>}></Route>
        <Route path="/userList" element={<UserListOld/>}></Route>
        <Route path="/register" element={<UserFormPageOld/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/me" element={<Me/>}></Route>
        <Route path="/myDebtors" element={<MyDebtors/>}></Route>
        <Route path="/myCreditors" element={<MyCreditors/>}></Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
