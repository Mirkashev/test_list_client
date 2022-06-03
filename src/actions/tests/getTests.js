import axios from "axios";
import { Link } from "react-router-dom";

export default function getTests(setTests) {
  function setToLocalStorage(testName, testId) {
    localStorage.setItem("testName", testName);
    localStorage.setItem("testId", testId);
  }
  const chapterId = localStorage.getItem("chapterId");
  // console.log(`http://192.168.0.2:3030/api/tests?theme=${chapterId}`);
  axios
    .get(`${process.env.REACT_APP_ADDRESS}tests?theme=${chapterId}`)
    .then((res) => {
      setTests(
        res.data.map((el) => {
          return (
            <div className="list-el" key={el._id}>
              <Link
                to="/testQuestions"
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
