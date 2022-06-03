import axios from "axios";
import { Link } from "react-router-dom";

export default function getTestsForEdit(
  setTests,
  EditContextMenu,
  openContextMenu,
  deleteById
) {
  function setToLocalStorage(testName, testId) {
    localStorage.setItem("testName", testName);
    localStorage.setItem("testId", testId);
  }
  const chapterId = localStorage.getItem("chapterId");

  axios
    .get(`${process.env.REACT_APP_ADDRESS}tests?theme=${chapterId}`)
    .then((res) => {
      setTests(
        res.data.map((el) => {
          return (
            <div className="list-el list-el-chapters" key={el._id}>
              <Link
                to="/editQuestions"
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
                        editType={"other"}
                        elementProps={{ id: el._id, title: el.name }}
                      />
                    );
                  }}
                >
                  edit
                </button>
                <button
                  className="chapters-delete"
                  onClick={() => deleteById(el._id, "tests")}
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
