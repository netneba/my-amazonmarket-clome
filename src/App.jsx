
import amazonLogo from '/Amazon_icon.svg'
import './App.css'
import Header from './components/Header/Header.jsx'
import Lowerheader from './components/Header/Lowerheader.jsx' 
import AmCarousel from './components/Carousel/AmCarousel.jsx'
import Category from './components/Categories/Category.jsx'


function App() {
  return (
    <>
      <Header />
      <Lowerheader />
      <AmCarousel />
      <Category/>
      </>
  )
}

export default App
