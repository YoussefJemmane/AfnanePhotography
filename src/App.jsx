import MonStyle from "./components/MonStyle.jsx";
import Navbar from "./components/Navbar.jsx";
import Sliders from "./components/Slider.jsx";
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
function App() {

  return (
    <>
<Navbar />

        <Sliders />
        

        <MonStyle />
          
    </>
  )
}

export default App
