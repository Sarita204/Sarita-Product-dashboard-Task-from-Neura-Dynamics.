import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import FavoritesPage from "./features/favorites/FavoritesPage";
import ProductListingPage from "./pages/ProductListing";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<FavoritesPage />}/>
      </Routes>
          <Footer />
    </BrowserRouter>
  );
}

export default App;




