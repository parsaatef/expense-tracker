import "./App.css";
import Routes from "./routing/Routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Footer from "./components/footer/Footer";

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<main className="App">
					<Routes />
				</main>
				<Footer />
			</PersistGate>
		</Provider>
	);
};

export default App;
