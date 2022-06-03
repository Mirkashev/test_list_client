import { useEffect, useState } from "react";
import getTests from "../../../../actions/tests/getTests";
import Nav from "../../generalComponents/nav";

export default function TestsPage() {
  const headerText = localStorage.getItem("chapterName");
  const [tests, setTests] = useState("");

  useEffect(() => {
    getTests(setTests);
  }, []);

  return (
    <div className="page">
      <Nav route={"/editChapters"} pageType={"regular"} />
      <main className="main">
        <div className="container-756">
          <h1 className="text-header">
            {headerText !== "" ? headerText : "Тесты раздела"}
          </h1>
          <div className="render-list">{tests}</div>
        </div>
      </main>
    </div>
  );
}
