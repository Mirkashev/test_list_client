import { useState } from "react";
import Answers from "./answers";
export default function Questions({ questions, plusOneTrue }) {
  // function Comment({ comment }) {
  //   return <div>{comment}</div>;
  // }
  return questions.map((el) => {
    return (
      <div className="list-el" key={el._id}>
        <span style={{ display: "block", marginBottom: "15px" }}>
          {el.title}
        </span>
        <Answers
          questionId={el._id}
          comment={el.comment}
          type={"other"}
          questionAnswers={el.answers}
          plusOneTrue={plusOneTrue}
        />
        {/* {commentState} */}
      </div>
    );
  });
}
