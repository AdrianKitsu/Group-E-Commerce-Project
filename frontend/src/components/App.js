import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import ItemPage from "./ItemPage";
import CartPage from "./CartPage"

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:item" element={<ItemPage />} />
         <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};
// function App() {
//   const [bacon, setBacon] = useState(null);

//   useEffect(() => {
//     fetch("/bacon")
//       .then((res) => res.json())
//       .then((data) => setBacon(data));
//   }, []);

//   return <div>{bacon ? bacon : `...where's my stuff?...`}</div>;
// }

export default App;
