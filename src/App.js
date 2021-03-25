import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <div className="container">
          <Route path="/search/:keyword" exact>
            <HomeScreen />
          </Route>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
