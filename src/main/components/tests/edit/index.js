import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EditContextMenu from "../../generalComponents/editContextMenu";
import addRequest from "../../../../actions/general/addRequest";
import deleteById from "../../../../actions/general/deleteById";
import getTestsForEdit from "../../../../actions/tests/getTestsForEdit";
import Nav from "../../generalComponents/nav";

export default function EditTestsPage() {
  const [cMenu, openContextMenu] = useState(<></>);
  const [testsTitle, setTestsTitle] = useState("");
  const headerText = localStorage.getItem("chapterName");

  const [tests, setTests] = useState("");
  useEffect(() => {
    getTestsForEdit(setTests, EditContextMenu, openContextMenu, deleteById);
  }, []);

  return (
    <div className="page">
      {cMenu}
      <Nav route={"/"} pageType={"admin"} />
      <nav className="nav-top">
        <div className="container-1532">
          <span className="logo">Цифровая грамматика</span>
          <Link to="/">
            <button className="goto-admin pointer">На главную</button>
          </Link>
        </div>
      </nav>
      <main className="main">
        <div className="container-756">
          <h1 className="text-header">
            {headerText !== ""
              ? "Управление разделом '" + headerText + "'"
              : "Управление тестами"}
          </h1>
          <div className="add-new-el">
            <div className="non-filed  hidden">
              <span className="non-filed-text">Заполните все поля!</span>
            </div>
            <span>Добавить тест:</span>
            <input
              type="text"
              placeholder="Введите название теста"
              value={testsTitle}
              onChange={(event) => setTestsTitle(event.target.value)}
            />
            <button
              className="save"
              onClick={() => {
                if (testsTitle !== "") {
                  addRequest("other", testsTitle);
                  document.querySelector(".non-filed").classList.add("hidden");
                } else {
                  document
                    .querySelector(".non-filed")
                    .classList.remove("hidden");
                  setTimeout(() => {
                    document
                      .querySelector(".non-filed")
                      .classList.add("hidden");
                  }, 3000);
                }
              }}
            >
              Сохранить
            </button>
            <span>Тесты:</span>
          </div>
          <div className="render-list">{tests}</div>
        </div>
      </main>
    </div>
  );
}
