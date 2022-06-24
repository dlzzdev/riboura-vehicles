import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "./components/layout/Container";
import { Footer } from "./components/layout/Footer";
import { Message } from "./components/layout/Message";
import { Navbar } from "./components/layout/Navbar";
import { Login } from "./components/pages/Auth/Login";
import { Register } from "./components/pages/Auth/Register";
import { AddCar } from "./components/pages/Vehicle/AddVehicle";
import { CarDetails } from "./components/pages/Vehicle/VehicleDetails";
import { EditCar } from "./components/pages/Vehicle/EditVehicle";
import { MyCars } from "./components/pages/Vehicle/MyVehicles";
import { MyPurchases } from "./components/pages/Vehicle/MyPurchases";
import { Home } from "./components/pages/Home";
import { Profile } from "./components/pages/User/Profile";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/user/profile/" element={<Profile />} />
            <Route path="/vehicle/:id" element={<CarDetails />} />
            <Route path="/vehicle/myvehicles/" element={<MyCars />} />
            <Route path="/vehicle/mypurchases/" element={<MyPurchases />} />
            <Route path="/vehicle/add/" element={<AddCar />} />
            <Route path="/vehicle/edit/:id" element={<EditCar />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
