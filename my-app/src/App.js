import logo from './logo.svg';
import './App.css';
import CreateTaskPage from "./components/CreateTaskPage"
import Tasks  from './components/Tasks';

function App() {
  return (
    <div className="App">
      <Tasks/>
      <CreateTaskPage/>
    </div>
  );
}

export default App;
