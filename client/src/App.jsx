import { useState } from "react";


import Input from "./components/input"; 
import Fullpageloader from "./components/Fullpageloader";


function App() {
  const [loading, setLoading] = useState(false )
  const handleInput = (inputValue) => {
    console.log(inputValue);
  };

  return (
    <>
    {loading && <Fullpageloader />}
      <Input cb={handleInput} />
    </>
  );
}

export default App;
