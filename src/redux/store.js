import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

const logger = createLogger();

const persistConfig = {
	key: "root",
	storage,
	whitelist: [ ],
	blacklist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const configureStore = () => {
	let store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(...middleware, logger))
	);

	return store;
};

export default configureStore;