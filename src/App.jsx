import { useState } from "react";
import Loading from "./components/Loading.jsx";
import MonStyle from "./components/MonStyle.jsx";
import Navbar from "./components/Navbar.jsx";
import Sliders from "./components/Slider.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }
  , 2000);
  return (
    <>
    {
      loading ? <Loading /> : 
     <div>

       <Navbar />
 
       <Sliders />
 
 
       <MonStyle />
     </div> 
    }
      

    </>
  )
}

export default App
