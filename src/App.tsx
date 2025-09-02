import "./App.css";
import { PostContainer } from "./components/postContainer";
import { PostContainer2 } from "./components/postContainer2";

function App() {
  return (
    <>
      <div>
        <div style={{display: "flex"}}>
          {/* Не смотря на то, что у нас 2 post container, они делают один и тот же запрос на сервер, RTK Query это понимает и кэширует данные.
            Таким образом, несмотря на то, что у нас 2 с точки зрения кода разных компонента делают запросы, выполняется все равно 1 запрос, а не 
            2
          */}
          <PostContainer />
          <PostContainer2 />
        </div>
        <h1>h1</h1>
      </div>
    </>
  );
}

export default App;
