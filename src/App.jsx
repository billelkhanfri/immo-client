import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import UserOffers from "./pages/UserOffers";
import CreateOffer from "./pages/forms/CreateOffer";
import Login from "./pages/forms/Login";
import CreateAccount from "./pages/forms/CreateAccount";
import Profil from "./pages/Profil";
import TermsOfService from "./pages/TermsOfService";
import { useSelector } from "react-redux";
import Offer from "./pages/Offer";
import Reseau from './pages/Reseau';
import Referrals from "./pages/Referrals";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Navigation />
      <main className="mt-8">
        <Routes>
          {/* Route Pages */}
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/se-connecter"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
       <Route
            path="/mon-reseau"
            element={user ? <Reseau/> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/referrals"
            element={user ? <Referrals/> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/mes-offres"
            element={user ? <UserOffers /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/creer-une-offre"
            element={user ? <CreateOffer /> : <Navigate to="/" />}
          ></Route>
           <Route
            path="/creer-une-offre/:id"
            element={user ? <CreateOffer /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/offre/:id"
            element={user ? <Offer /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/conditions-utilisation"
            element={<TermsOfService />}
          ></Route>
          {/* Route User */}
          <Route
            path="/inscription"
            element={!user ? <CreateAccount /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/mon-profil/:id"
            element={user ? <Profil /> : <Navigate to="/" />}
          ></Route>
          {/* Route Erreur */}
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
