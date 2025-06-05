import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthProvider } from "./context/auth";
import AppRoutes from './appRoutes';

function App() {
  return (
      <Router>
        <AppRoutes />
      </Router>
  );
}

export default App;
