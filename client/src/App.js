import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from './GlobalState'
import Routes from './Routes';
import { toast } from 'react-toastify';

toast.configure()
function App() {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
}

export default App;
