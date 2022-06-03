export default function Answer({
  setTrueAnswerId,
  counter,
  addAnswer,
  answers,
  isEdit,
  answerText,
  answerId,
  right,
}) {
  if (isEdit) {
    console.log(answerId, answerText);
    return (
      <label>
        <input
          className="edit-answer"
          id={answerId}
          type="text"
          placeholder="Введите ответ"
          defaultValue={answerText}
        />
        <label className="true-answ">
          {right ? (
            <input
              type="radio"
              name="addingAnswer"
              defaultChecked
              onChange={() => setTrueAnswerId(answerId)}
            ></input>
          ) : (
            <input
              type="radio"
              name="addingAnswer"
              onChange={() => setTrueAnswerId(answerId)}
            ></input>
          )}
        </label>
        <button
          className="minus"
          onClick={() => {
            if (answers.length > 0) {
              if (answers.length < 5) {
                document.querySelector(".plus").classList.remove("hidden");
              }
              addAnswer(answers.filter((answer) => answer.key !== counter));
            }
          }}
        >
          -
        </button>
      </label>
    );
  } else {
    // return to main Qpage
    // if (defaultChecked) setTrueAnswerId(counter);
    return (
      <label>
        <input
          className="inp-answer"
          id={counter}
          type="text"
          placeholder="Введите ответ"
        />
        <label className="true-answ">
          <input
            type="radio"
            name="addingAnswer"
            onChange={() => setTrueAnswerId(counter)}
          ></input>
        </label>
        {answers.length > 0 ? (
          <button
            className="minus"
            onClick={() => {
              if (answers.length > 0) {
                if (answers.length < 5) {
                  document.querySelector(".plus").classList.remove("hidden");
                }
                addAnswer(answers.filter((answer) => answer.key !== counter));
              }
            }}
          >
            -
          </button>
        ) : (
          <></>
        )}
      </label>
    );
  }
}
