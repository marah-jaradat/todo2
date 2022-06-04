import React from "react";
import "./App.css";
import ToDo from "./components/todo";
import Settings from "./context/settings";

import "./components/form.css";
import Auth from "./context/Auth";
function App() {
  return (
    <div className="App">
      <Auth>
        <Settings>
          <ToDo />
        </Settings>
      </Auth>
    </div>
  );
}
export default App;
