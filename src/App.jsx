import { useState } from "react";
import Loading from "./components/Loading.jsx";
import MonStyle from "./components/MonStyle.jsx";
import Navbar from "./components/Navbar.jsx";
import Sliders from "./components/Slider.jsx";
import Seances from "./components/Seances.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  
  return (
    <>
    
     <div>

       <Navbar />
 
       <Sliders />
 
 
       <MonStyle />

       <Seances />
     </div> 
     

    </>
  )
}

export default App
