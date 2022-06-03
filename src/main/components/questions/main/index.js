import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import getQuestions from "../../../../actions/questions/getQuestions";
import Nav from "../../generalComponents/nav";

export default function QuestionsPage() {
  const headerText = localStorage.getItem("testName");
  const [trueAnswersCounter, plusOneTrue] = useState(0);
  const [questions, setQuestions] = useState("");
  const [questionCounter, setQuestionCounter] = useState("");

  useEffect(() => {
    getQuestions(setQuestions, plusOneTrue, setQuestionCounter);
  }, []);

  return (
    <div className="page">
      <Nav route={"/editChapters"} pageType={"regular"} />
      <div className="score hidden">
        <div>Счёт: {trueAnswersCounter + "/" + questionCounter}</div>
        <Link to="/">
          <button style={{ width: "120px", height: "40px", marginTop: "15px" }}>
            Ок
          </button>
        </Link>
      </div>
      <main className="main">
        <div className="container-756">
          <h1 className="text-header">
            {headerText !== "" ? headerText : "Тест"}
          </h1>
          <button
            className="end-test pointer"
            onClick={() => {
              // alert(trueAnswersCounter + "/" + questionCounter);
              document.querySelector(".score").classList.remove("hidden");
            }}
          >
            Завершить
          </button>

          <div style={{ marginTop: "30px" }} className="render-list">
            {questions}
          </div>
        </div>
      </main>
    </div>
  );
}
