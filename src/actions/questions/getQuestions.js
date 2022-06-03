import axios from "axios";
import Questions from "../../main/components/questions/generalQuestionsComponent/questions";

export default function getQuestions(
  setQuestions,
  plusOneTrue,
  setQuestionCounter
) {
  const testId = localStorage.getItem("testId");
  axios
    .get(`${process.env.REACT_APP_ADDRESS}questions?test=${testId}`)
    .then((res) => {
      setQuestionCounter(res.data.length);
      setQuestions(
        <Questions questions={res.data} plusOneTrue={plusOneTrue} />
      );
    });
}
