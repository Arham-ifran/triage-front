import { useNavigate, useParams, Route, Routes } from "react-router-dom";
import routes from './routes'
import Path from "../src/assets/images/top-path.svg"
import Bottom from "../src/assets/images/banner-bottom.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props) {
  const navigate = useNavigate()
  const params = useParams()
  return (
    <>
        {/* <div className="path">
                <img src={Path} alt="" />
            </div>
            <div className="bottom-end">
                <img src={Bottom} alt="" />
            </div> */}
        <Routes>
          {
            routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  element={
                    <route.layout {...props} title={route.title} customBg={route.customBg}>
                      <route.component {...props} navigate={navigate} params={params} />
                    </route.layout>
                  }
                />
              )
            })
          }
        </Routes>
      </>
  );
}

export default App;
