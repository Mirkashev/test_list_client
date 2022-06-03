import axios from "axios";

export default function editRequest(
  entity,
  id,
  title,
  answers,
  true_text,
  comment
) {
  if (entity === "question") {
    // console.log(answers, true_text);

    const answersWithRight = answers.map((el) => ({
      text: el,
      right: el === document.getElementById(true_text).value,
    }));
    // console.log(entity, id, title, answersWithRight, comment);
    axios
      .patch(`${process.env.REACT_APP_ADDRESS}qa/${id}`, {
        question: { title, comment },
        answers: answersWithRight,
      })
      .then((res) => {
        window.location.reload();
      });
  } else if (entity === "chapter") {
    console.log(entity, id, title);
    axios
      .patch(`${process.env.REACT_APP_ADDRESS}themes/${id}`, { name: title })
      .then((res) => {
        window.location.reload();
      });
  } else {
    console.log(entity, id, title);
    axios
      .patch(`${process.env.REACT_APP_ADDRESS}tests/${id}`, { name: title })
      .then((res) => {
        window.location.reload();
      });
  }
}
