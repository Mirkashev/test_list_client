import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getChapters from "../../../../actions/chapters/getChapters";
import Nav from "../../generalComponents/nav";

export default function ChaptersPage() {
  const [chapters, setChapters] = useState("");
  // запрос

  useEffect(() => {
    getChapters(setChapters);
  }, []);

  return (
    <div className="page">
      <Nav route={"/editChapters"} pageType={"regular"} />
      <main className="main">
        <div className="container-756">
          <h1 className="text-header">Разделы</h1>
          <div className="render-list">{chapters}</div>
        </div>
      </main>
    </div>
  );
}
