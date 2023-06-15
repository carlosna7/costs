import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./components/pages/Home";
import { Projects } from "./components/pages/Projects";
import { NewProject } from "./components/pages/NewProject";
import { Company } from "./components/pages/Company";
import { Contact } from "./components/pages/Contact";

import { Container } from "./components/layout/Container";
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"

function App() {
  return (
    <Router>

      <Navbar />

      <Container customClass="minHeight" >

        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/newproject" element={<NewProject />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/contact" element={<Contact />} />
          
        </Routes>

      </Container>

      <Footer />

    </Router>
  );
}

export default App;
