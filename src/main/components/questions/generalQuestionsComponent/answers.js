import { useState } from "react";

export default function Answers({
  questionId,
  comment,
  type,
  questionAnswers,
  plusOneTrue,
  showCommentState,
}) {
  function disableInputsGroup(name) {
    const inputs = document.getElementsByName(name);
    inputs.forEach((el) => {
      el.disabled = true;
    });
  }
  function Comment({ comment, displayNone }) {
    return (
      <div className="comm" style={{ display: displayNone, marginTop: "10px" }}>
        Комментарий:
        {comment}
      </div>
    );
  }
  const [displayNone, setDisplayNone] = useState("none");
  return (
    <>
      {questionAnswers.map((answer) => {
        return (
          <label key={answer._id} id={answer._id} className="pointer">
            {type === "edit" ? (
              <input type="radio" name={"answers" + questionId} disabled />
            ) : (
              <input
                type="radio"
                name={"answers" + questionId}
                onClick={() => {
                  if (answer.right) {
                    document
                      .getElementById(answer._id)
                      .classList.add("true-answer");
                    disableInputsGroup("answers" + questionId);
                    plusOneTrue((el) => el + 1);
                    // disable by key
                  } else {
                    document
                      .getElementById(answer._id)
                      .classList.add("wrong-answer");
                    // alert(comment);
                    // showCommentState(<Comment comment={comment} />);
                    setDisplayNone("block");
                    disableInputsGroup("answers" + questionId);
                    // disable by key
                  }
                }}
              />
            )}
            <span>{answer.text}</span>
          </label>
        );
      })}
      {<Comment displayNone={displayNone} comment={comment} />}
    </>
  );
}
