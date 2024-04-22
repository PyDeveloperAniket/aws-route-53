import React from 'react'
import Header from '../Components/Header'
import Dashboard from '../Components/Dashboard'
import HostingZoneDashboard from '../Components/HostingZoneDashboard.jsx'
import Login from './Login.jsx'

function Home() {
  return (
    <div>
      {/* Render the Header component at the top */}
      <Header/>
      
      {/* Render the HostingZoneDashboard component */}
      <HostingZoneDashboard />
      
      {/* 
        Uncomment the Login component below to include it in the Home page.
        Make sure to import the Login component at the top.
      */}
      {/* <Login/> */}
    </div>
  )
}

export default Home
