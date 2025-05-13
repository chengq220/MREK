import '../css/App.css';
import '../css/tailwind.css';
import PrefInput from './Pref';
import GridDefault  from './Card';

function App() {
  return (
      <div className="App">
        <div className="w-1/2 mx-auto">
            <PrefInput/>
            <GridDefault/>
        </div>
      </div>
  );
}

export default App;
