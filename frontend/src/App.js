import './App.css';
import EntryRoute from './routes/app.routes';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <EntryRoute/>
      </PersistGate>
    </Provider>
  );
}

export default App;
