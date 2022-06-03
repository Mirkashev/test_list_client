import axios from "axios";

export default function addRequest(
  entity,
  title,
  answers,
  true_answer,
  comment
) {
  if (entity === "question") {
    console.log(entity, title, answers, true_answer, comment);
    const testId = localStorage.getItem("testId");
    axios
      .post(`${process.env.REACT_APP_ADDRESS}questions`, {
        title: title,
        test_id: testId,
        comment: comment,
      })
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          answers.forEach((element) => {
            if (true_answer === element) {
              axios
                .post(`${process.env.REACT_APP_ADDRESS}answers`, {
                  text: element,
                  question_id: res.data._id,
                  right: true,
                })
                .then((res) => {
                  console.log(res);
                  // window.location.reload();
                });
            } else {
              axios
                .post(`${process.env.REACT_APP_ADDRESS}answers`, {
                  text: element,
                  question_id: res.data._id,
                  right: false,
                })
                .then((res) => {
                  console.log(res);
                  // window.location.reload();
                });
            }
          });
        }
        // window.location.reload();
      });
  } else {
    // console.log(entity, title);
    if (entity === "chapter") {
      axios
        .post(`${process.env.REACT_APP_ADDRESS}theme`, { name: title })
        .then((res) => {
          // console.log(res);
          window.location.reload();
        });
    } else {
      const chapterId = localStorage.getItem("chapterId");
      axios
        .post(`${process.env.REACT_APP_ADDRESS}tests`, {
          name: title,
          theme_id: chapterId,
        })
        .then((res) => {
          // console.log(res);
          window.location.reload();
        });
    }
  }
}
