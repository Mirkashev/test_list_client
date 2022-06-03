import axios from "axios";

export default function deleteById(elementId, route) {
  // console.log(elementId);
  axios
    .delete(`${process.env.REACT_APP_ADDRESS}${route}/${elementId}`)
    .then((res) => {
      // setChapters(JSON.parse(res.data));
      window.location.reload();
    });
}
