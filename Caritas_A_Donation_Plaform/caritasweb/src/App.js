import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Firstpage from './Components/Firstpage';
import Donorlogin from './Components/Donorlogin';
import Donorsignup from './Components/Donorsignup';
import Organizationlogin from './Components/Organizationlogin';
import Organizationsignup from './Components/Organizationsignup';
import Slider from './Components/Slider';
import FirstPageDonor from './Components/FirstPageDonor';
import './App.css';
import DonatePage from "./Components/DonatePage";
import Money from "./Components/Money";
import OtherReq from "./Components/OtherReq";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Components/CheckoutForm";
import About from "./Components/About";
import OrganizationUpdate from "./Components/OrganizationUpdate";
import PaymentSuccessful from "./Components/PaymentSuccessful";
import UpdateSuccess from "./Components/UpdateSuccess";

const stripePromise = loadStripe(
  "pk_test_51NvkEVSDlK7Yxxw9Q2vaIsl1tx5R171H9VVaRxAwTkTqdpDrOaXNacQ46Ddbh4bUVvo2R60VUB88xnPHjJITkedQ00U4zXCD2Z"
);

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/Firstpage' element={<Firstpage />}></Route>
          <Route path='/donorlogin' element={<Donorlogin />}></Route>
          <Route path='/donorsignup' element={<Donorsignup />}></Route>
          <Route path='/Organizationlogin' element={<Organizationlogin />}></Route>
          <Route path='/Organizationsignup' element={<Organizationsignup />}></Route>
          <Route path ='/OrganizationUpdate/:registrationnumber' element={<OrganizationUpdate/>}></Route>
          <Route path='/' element={<Slider/>}></Route>
          <Route path='/FirstPageDonor' element={<FirstPageDonor />}></Route>
          <Route path='/DonatePage/:title/:requirements/:phoneNo' element={<DonatePage />}></Route>
          <Route path='/Money' element={<Money />}></Route>
          <Route path='/OtherReq/:title/:phoneNo/:value' element={<OtherReq />}></Route>
          <Route path='/About' element={<About />}></Route>
          <Route path="/CheckoutForm" element={<Elements stripe={stripePromise}><CheckoutForm /></Elements>} /> {/* Add this route */}
          <Route path='/PaymentSuccessful' element={<PaymentSuccessful/>}></Route>
          <Route path='/UpdateSuccess' element={<UpdateSuccess/>}></Route>
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
