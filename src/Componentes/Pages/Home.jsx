import React from 'react'
import Navbar from '../Navbar/Navbar'
import LeftSide from '../LeftSideBar/LeftSide'

const Home = () => {
  return (
    <div className='w-full'>
      <div className='fixed top-0 z-10 w-full bg-white'>
        <Navbar></Navbar>
      </div>
        <div className=' flex bg-gray-100'>
          <div className='flex-auto w-[20%] fixed top-12'>
            <LeftSide></LeftSide>
          </div>
        </div>
    </div>
  )
}

export default Home