 import React from 'react';
 import Navbar from './components/Navbar';
 import styles from './App.module.css';
import Home from './components/Home';

 const App = () => {
   return (
     <div className={styles.app}>
      <Navbar/>
      <Home/>
       
     </div>
   )
 }
 
 export default App
 