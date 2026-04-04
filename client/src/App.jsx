import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Notes from './Pages/Notes'
import Pricing from './Pages/Pricing'
import History from './Pages/History'
import { useEffect } from 'react';
import { getCurrentUser } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
export const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);
  const {userData}=useSelector((state)=>state.user);
  
  return (
    <>
      <Routes>
        <Route path="/" element={userData? <Home/>:<Navigate to="/auth" replace/>} />
        <Route path="/auth" element={userData? <Navigate to="/" replace/>:<Auth/>} />

         <Route path='/history' element={userData? <History/> : <Navigate to="/auth" replace/>}/>
        <Route path='/notes' element={userData? <Notes/> : <Navigate to="/auth" replace/>}/>
      <Route path='/pricing' element={userData? <Pricing/> : <Navigate to="/auth" replace/>}/>
      </Routes>
    </>
  )
}

export default App
