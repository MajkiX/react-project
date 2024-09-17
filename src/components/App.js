import '../App.scss'
import StoreProvider from '../store/StoreProvider';
import Header from './Header/Header'

function App() {
  return (
    <StoreProvider>
      <Header/>
    </StoreProvider>
  );
}

export default App;
