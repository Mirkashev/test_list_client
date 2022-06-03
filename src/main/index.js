import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ChaptersPage from "./components/chapters/main";
import EditChaptersPage from "./components/chapters/edit";
import TestsPage from "./components/tests/main";
import EditTestsPage from "./components/tests/edit";
import QuestionsPage from "./components/questions/main";
import EditQuestionsPage from "./components/questions/edit";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChaptersPage />}></Route>
        <Route path="/tests" element={<TestsPage />}></Route>
        <Route path="/testQuestions" element={<QuestionsPage />}></Route>
        <Route path="/editChapters" element={<EditChaptersPage />}></Route>
        <Route path="/editTests" element={<EditTestsPage />}></Route>
        <Route path="/editQuestions" element={<EditQuestionsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default Main;
