import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Nav from "@components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Router />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
