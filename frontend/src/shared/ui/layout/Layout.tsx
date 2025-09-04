import {Outlet} from "react-router";

export const Layout = () => {
  return (
    <div className="">
      <header className="">
        <h1 className="">Мое приложение</h1>
      </header>

      <main className="">
        <Outlet/>
      </main>

      <footer className="">
        <p>© {new Date().getFullYear()} Все права защищены</p>
      </footer>
    </div>
  )
}