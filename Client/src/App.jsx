import "./App.css";
import Navbar from "./componants/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import CreateTicket from "./componants/CreateTicket";
import MyTickets from "./componants/MyTickets";
import View from "./componants/View";

const socket = io.connect("http://localhost:3200/");

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateTicket socket={socket} />} />
          <Route path="/mytickets" element={<MyTickets socket={socket} />} />
          <Route path="/view/:name" element={<View socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
