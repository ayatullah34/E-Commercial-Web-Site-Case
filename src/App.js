import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Home from "./components/Home";
import Header from "./components/Header";
import './index.css'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  )
}