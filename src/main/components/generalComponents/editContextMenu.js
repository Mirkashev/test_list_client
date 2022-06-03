import { useEffect, useState } from "react";
import editRequest from "../../../actions/general/editRequest";
import Answer from "../questions/edit/components/answer";
function EditContextMenu({ openContextMenu, editType, elementProps }) {
  const [answers, addAnswer] = useState([]);
  const [counter, setCounter] = useState(999999);
  const [trueAnswerId, setTrueAnswerId] = useState(elementProps.true_text);
  // console.log(trueAnswerId);

  useEffect(() => {
    addAnswer([]);
    if (editType === "question") {
      // console.log(elementProps.answers);
      elementProps.answers.forEach((el, index) => {
        setCounter(index);
        addAnswer((answers) => [
          ...answers,
          <Answer
            key={index}
            isEdit={true}
            answerText={el.text}
            answerId={el._id}
            counter={counter}
            addAnswer={addAnswer}
            answers={answers}
            right={el.right}
            setTrueAnswerId={setTrueAnswerId}
          />,
        ]);
      });
    }
  }, []);

  return (
    <div className="context-menu">
      <div
        className="overlay"
        onClick={() => {
          document
            .querySelector("body")
            .classList.toggle("context-menu-active");
          openContextMenu();
        }}
      ></div>
      <div className="edit-list">
        <button
          className="close"
          onClick={() => {
            document
              .querySelector("body")
              .classList.toggle("context-menu-active");

            openContextMenu();
          }}
        >
          Назад
        </button>
        <label>
          <input
            key={elementProps.id}
            type="text"
            defaultValue={elementProps.title}
            className="edit-title"
          />
        </label>
        {editType === "question" ? (
          <label>
            <input
              type="text"
              className="edit-comment"
              defaultValue={elementProps.comment}
            />
          </label>
        ) : (
          <></>
        )}
        {answers}
        {editType === "question" ? (
          <button
            className="plus plus-context"
            onClick={() => {
              if (answers.length < 5) {
                if (answers.length > 3) {
                  document.querySelector(".plus").classList.add("hidden");
                }
                setCounter(counter + 1);
                addAnswer((answers) => [
                  ...answers,
                  <Answer
                    key={counter + 1}
                    isEdit={true}
                    counter={counter + 1}
                    setTrueAnswerId={setTrueAnswerId}
                    addAnswer={addAnswer}
                    answers={answers}
                    answerId={counter + 1}
                  />,
                ]);
              }
            }}
          >
            +
          </button>
        ) : (
          <></>
        )}
        {editType === "question" ? (
          <button
            className="save"
            onClick={() => {
              let tempAnswArr = [];
              let check = true;
              document.querySelectorAll(".edit-answer").forEach((element) => {
                if (element.value !== "") {
                  tempAnswArr.push(element.value);
                }
                if (element.value === "") {
                  check = false;
                }
              });
              if (
                document.querySelector(".edit-title").value !== "" &&
                document.querySelector(".edit-comment").value !== "" &&
                check
              ) {
                document
                  .querySelector("body")
                  .classList.toggle("context-menu-active");

                openContextMenu();
                // console.log(elementProps.answ
                // );
                // console.log(document.querySelector(".edit-title").value);
                editRequest(
                  editType,
                  elementProps.id,
                  document.querySelector(".edit-title").value,
                  tempAnswArr,
                  trueAnswerId,
                  document.querySelector(".edit-comment").value
                );
              } else {
                alert("Заполните все поля!");
              }
            }}
          >
            Сохранить
          </button>
        ) : (
          <button
            className="save"
            onClick={() => {
              if (document.querySelector(".edit-title").value !== "") {
                document
                  .querySelector("body")
                  .classList.toggle("context-menu-active");

                openContextMenu();
                editRequest(
                  editType,
                  elementProps.id,
                  document.querySelector(".edit-title").value
                );
              } else {
                alert("Заполните все поля!");
              }
            }}
          >
            Сохранить
          </button>
        )}
      </div>
    </div>
  );
}

export default EditContextMenu;
