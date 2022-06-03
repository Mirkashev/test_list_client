import { useEffect, useState } from "react";
import getChaptersForEdit from "../../../../actions/chapters/getChaptersForEdit";
import addRequest from "../../../../actions/general/addRequest";
import Nav from "../../generalComponents/nav";

export default function EditChaptersPage() {
  const [cMenu, openContextMenu] = useState(<></>);
  const [chaptersTitle, setChaptersTitle] = useState("");

  const [chapters, setChapters] = useState("");
  // запрос
  useEffect(() => {
    getChaptersForEdit(setChapters, openContextMenu);
  }, []);
  return (
    <div className="page">
      {cMenu}
      <Nav route={"/"} pageType={"admin"} />
      <main className="main">
        <div className="container-756">
          <h1 className="text-header">Управление разделами</h1>
          <div className="add-new-el">
            <div className="non-filed  hidden">
              <span className="non-filed-text">Заполните все поля!</span>
            </div>
            <span>Добавить раздел:</span>
            <input
              type="text"
              placeholder="Введите название раздела"
              value={chaptersTitle}
              onChange={(event) => setChaptersTitle(event.target.value)}
            />
            <button
              className="save"
              onClick={() => {
                if (chaptersTitle !== "") {
                  document.querySelector(".non-filed").classList.add("hidden");
                  addRequest("chapter", chaptersTitle);
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
            <span>Разделы:</span>
          </div>

          <div className="render-list">{chapters}</div>
        </div>
      </main>
    </div>
  );
}
