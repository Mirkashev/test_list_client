import axios from "axios";
import { Link } from "react-router-dom";

export default function getChapters(setChapters) {
  function setToLocalStorage(chapterName, chapterId) {
    localStorage.setItem("chapterName", chapterName);
    localStorage.setItem("chapterId", chapterId);
  }
  axios.get(`${process.env.REACT_APP_ADDRESS}themes`).then((res) => {
    setChapters(
      res.data.map((el) => {
        return (
          <div className="list-el" key={el._id}>
            <Link
              to="/tests"
              onClick={() => setToLocalStorage(el.name, el._id)}
            >
              {el.name}
            </Link>
          </div>
        );
      })
    );
  });
}
