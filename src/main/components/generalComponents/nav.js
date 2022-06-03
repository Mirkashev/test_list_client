import { Link } from "react-router-dom";
export default function Nav({ route, pageType }) {
  return (
    <nav className="nav-top">
      <div className="container-1532">
        <span className="logo">Цифровая грамматика</span>
        <Link to={route}>
          <button className="goto-admin pointer">
            {pageType === "regular" ? "Админ Панель" : "На главную"}
          </button>
        </Link>
      </div>
    </nav>
  );
}
