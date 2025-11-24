import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx'
import Editor from './components/Editor.jsx'
import Home from './components/Home.jsx'
import Layout from './components/Layout.jsx'
import LinkPage from './components/LinkPage.jsx'
import Lounge from './components/Lounge.jsx'
import Missing from './components/Missing.jsx'
import Unauthorized from './components/Unauthorized.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/*public routes*/}
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='linkpage' element={<LinkPage/>}/>
        <Route path='unauthorized' element={<Unauthorized/>}/>

        {/*protected routes*/}
        <Route element = {<RequireAuth allowedRoles={[2001]}/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
        <Route element = {<RequireAuth allowedRoles={[1984]}/>}>
          <Route path='editor' element={<Editor/>}/>
        </Route>
        <Route element = {<RequireAuth allowedRoles={[5150]}/>}>
          <Route path='admin' element={<Admin/>}/>
        </Route>
        <Route element = {<RequireAuth allowedRoles={[5150, 1984]}/>}>
          <Route path='lounge' element={<Lounge/>}/>
        </Route>
        {/*catch all*/}
        <Route path ="*" element = {<Missing/>}/>
      </Route>
    </Routes>
  )
}

export default App
