import axios from "axios";
import { Link } from "react-router-dom";
import EditContextMenu from "../../main/components/generalComponents/editContextMenu";
import deleteById from "../general/deleteById";

export default function getChaptersForEdit(setChapters, openContextMenu) {
  function setToLocalStorage(chapterName, chapterId) {
    localStorage.setItem("chapterName", chapterName);
    localStorage.setItem("chapterId", chapterId);
  }
  axios.get(`${process.env.REACT_APP_ADDRESS}themes`).then((res) => {
    setChapters(
      res.data.map((el) => {
        // console.log(el._id);
        return (
          <div className="list-el list-el-chapters" key={el._id}>
            <Link
              to="/editTests"
              onClick={() => setToLocalStorage(el.name, el._id)}
            >
              {el.name}
            </Link>
            <div className="el-actions">
              <button
                className="chapters-edit"
                onClick={() => {
                  document
                    .querySelector("body")
                    .classList.toggle("context-menu-active");
                  openContextMenu(
                    <EditContextMenu
                      openContextMenu={openContextMenu}
                      editType={"chapter"}
                      elementProps={{ id: el._id, title: el.name }}
                    />
                  );
                }}
              >
                edit
              </button>
              <button
                className="chapters-delete"
                onClick={() => deleteById(el._id, "themes")}
              >
                delete
              </button>
            </div>
          </div>
        );
      })
    );
  });
}
