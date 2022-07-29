import { useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:item" element={<ItemPage />} />
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
