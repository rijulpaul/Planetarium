import { useState } from 'react'

// import { RGBELoader } from '../node_modules/three/examples/jsm/loaders/RGBELoader.js'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { ReactThreeFiber } from '@react-three/fiber'
import { createRoot } from 'react-dom/client';
import Header from './layouts/header/header';
import Footer from './layouts/footer/footer';
import Space from './layouts/space/space';

function App() {


  return (
    <>
            <Header></Header>
            <Space></Space>
            <Footer></Footer>
    </>
  )
}

export default App
