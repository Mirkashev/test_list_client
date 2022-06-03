import { useEffect, useState } from "react";
import axios from "axios";
import EditContextMenu from "../../generalComponents/editContextMenu";
import Answer from "./components/answer";
import addRequest from "../../../../actions/general/addRequest";
import deleteById from "../../../../actions/general/deleteById";
import Answers from "../../questions/generalQuestionsComponent/answers";
import Nav from "../../generalComponents/nav";

export default function EditQuestionsPage() {
  const headerText = localStorage.getItem("testName");
  const testId = localStorage.getItem("testId");
  const [counter, setCounter] = useState(1);
  const [cMenu, openContextMenu] = useState();
  const [questionsTitle, setQuestionsTitle] = useState("");
  const [questionsComment, setQuestionsComment] = useState("");
  const [trueAnswerId, setTrueAnswerId] = useState("");
  const [answers, addAnswer] = useState([]);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ADDRESS}questions?test=${testId}`)
      .then((res) => {
        setQuestions(
          res.data.map((el) => {
            return (
              <div className="list-el list-el-chapters" key={el._id}>
                <div style={{ width: "80%" }}>
                  <span>{el.title}</span>
                  <div className="radio-buttons" id={el._id}>
                    <Answers
                      questionId={el._id}
                      comment={el.comment}
                      type={"edit"}
                      questionAnswers={el.answers}
                    />
                  </div>
                </div>

                <div className="el-actions">
                  <button
                    className="chapters-edit"
                    onClick={() => {
                      document
                        .querySelector("body")
                        .classList.toggle("context-menu-active");
                      let true_text;
                      el.answers.forEach((el) => {
                        if (el.right) {
                          true_text = el.text;
                        }
                      });
                      openContextMenu(
                        <EditContextMenu
                          openContextMenu={openContextMenu}
                          editType={"question"}
                          elementProps={{
                            id: el._id,
                            title: el.title,
                            answers: el.answers,
                            true_text: true_text,
                            comment: el.comment,
                          }}
                        />
                      );
                    }}
                  >
                    edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteById(el._id, "questions")}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })
        );
      });
    setCounter(counter + 1);
    addAnswer([
      <Answer
        key={counter}
        setTrueAnswerId={setTrueAnswerId}
        counter={counter}
        addAnswer={addAnswer}
        answers={answers}
      />,
    ]);
  }, []);

  return (
    <div className="page">
      {cMenu}
      <Nav route={"/"} pageType={"admin"} />
      <main className="main">
        <div className="container-756">
          <h1 className="text-header">
            {headerText !== ""
              ? "Тест " + "'" + headerText + "'"
              : "Управление тестом"}
          </h1>
          <div className="add-new-el">
            <div className="non-filed  hidden">
              <span className="non-filed-text">Заполните все поля!</span>
            </div>
            <div className="sended  hidden">
              <span className="sended-text">Вопрос создан!</span>
            </div>
            <span>Добавить вопрос:</span>
            <label>
              <input
                type="text"
                placeholder="Введите вопрос"
                value={questionsTitle}
                onChange={(event) => setQuestionsTitle(event.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Введите комментарий"
                value={questionsComment}
                onChange={(event) => setQuestionsComment(event.target.value)}
              ></input>
            </label>
            <div className="answers-add-place">{answers}</div>

            <button
              className="plus"
              onClick={() => {
                if (answers.length < 5) {
                  if (answers.length > 3) {
                    document.querySelector(".plus").classList.add("hidden");
                  }
                  setCounter(counter + 1);
                  addAnswer((answers) => [
                    ...answers,
                    <Answer
                      key={counter}
                      setTrueAnswerId={setTrueAnswerId}
                      counter={counter}
                      addAnswer={addAnswer}
                      answers={answers}
                    />,
                  ]);
                }
              }}
            >
              +
            </button>

            <button
              className="save"
              onClick={() => {
                console.log("onclicked");
                // переписать этот ужас
                document.getElementsByName("addingAnswer").forEach((elr) => {
                  let check = true;
                  let checkTwo = false;
                  let answersArray = [];
                  if (elr.checked) {
                    checkTwo = true;
                  }
                  document.querySelectorAll(".inp-answer").forEach((el) => {
                    if (el.value === "") {
                      check = false;
                    }
                    answersArray.push(el.value);
                  });
                  if (
                    questionsTitle !== "" &&
                    questionsComment !== "" &&
                    check &&
                    checkTwo
                  ) {
                    document
                      .querySelector(".non-filed")
                      .classList.add("hidden");
                    // console.log(trueAnswerId);

                    try {
                      addRequest(
                        "question",
                        questionsTitle,
                        answersArray,
                        document.getElementById(trueAnswerId).value,
                        questionsComment
                      );
                    } catch (error) {
                    } finally {
                      setQuestionsComment("");
                      setQuestionsTitle("");
                      document.querySelectorAll(".inp-answer").forEach((el) => {
                        el.value = "";
                      });
                    }
                  } else {
                    console.log("else");
                    document.querySelector(".sended").classList.add("hidden");
                    document
                      .querySelector(".non-filed")
                      .classList.remove("hidden");
                    setTimeout(() => {
                      document
                        .querySelector(".non-filed")
                        .classList.add("hidden");
                    }, 3000);
                  }
                  throw new Error("test error");
                });
              }}
            >
              Сохранить
            </button>
            <span>Вопросы:</span>
          </div>
          <div className="render-list">{questions}</div>
        </div>
      </main>
    </div>
  );
}
