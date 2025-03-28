import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectRoute";
import DefaultLayout from "./components/DefaultLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <DefaultLayout>
              <Login/>
            </DefaultLayout>
          }/>   
          <Route path="/cadastro" element={
            <DefaultLayout>
              <Cadastro/>
            </DefaultLayout>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <DefaultLayout>
                <ListUsers/>
              </DefaultLayout>
            </ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
