import { Route, Routes } from 'react-router-dom'
import PlayGroundContainer from './PlayGroundContainer'
import ViteLandingPage from './ViteLandingPage'

function App() {

  /*
  Observations about routes
  //1. Index always has the highest priority comparing  "/" and "index"
  //2. Different element with same path , render the 1st element with that path
  //3. Routes with path or index will not get rendered
  //4. we can do chaining of routes - check web dev simplified router video in youtube for more info on this.
  //5. comparing "/*" and "/landingPage", "/landingPage" has higher priority
  */

  return (
    <div>
      <Routes>
        <Route path="/playground" element={<PlayGroundContainer/>} />
        {/* <Route path="/" element={<ViteLandingPage/>} /> */}
        <Route index element={<ViteLandingPage/>} />

      </Routes>
    </div>
  )
}

export default App
