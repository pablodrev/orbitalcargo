import {Outlet} from "react-router";
import Header from "../header/Header.tsx";
import Footer from "../footer/Footer.tsx";
import './Layout.scss';

export const Layout = () => {
  return (
    <div className="default-layout">

      <Header />

      <main className="default-layout__main">
        <Outlet/>
      </main>

      <Footer />
    </div>
  )
}