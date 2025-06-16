import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import PollCreation from "./Pages/PollCreation";
import DemoPoll from "./Pages/DemoPoll";
import About from "./Pages/About";
import DemoPollResult from "./Pages/DemoPollResult";
import ViewPolls from "./Pages/ViewPolls";
import PollVote from "./Pages/PollVote";
import PollResult from "./Pages/PollResult";
import RequireAuth from "./Pages/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route
          path="create"
          element={
            <RequireAuth>
              <PollCreation />
            </RequireAuth>
          }
        />
        <Route
          path="demo"
          element={
            <RequireAuth>
              <DemoPoll />
            </RequireAuth>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="results" element={<DemoPollResult />} />
        <Route path="polls" element={<ViewPolls />} />
        <Route path="/vote/:id" element={<PollVote />} />
        <Route path="/results/:id" element={<PollResult />} />
      </Route>
    </Routes>
  );
};

export default App;
