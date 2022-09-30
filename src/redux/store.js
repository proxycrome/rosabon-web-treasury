import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

// const logger = createLogger()

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user_profile", "updateProfile"],
	blacklist: ["auth", "wallet"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk, logger];

const configureStore = () => {
	let store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(...middleware))
	);

	return store;
};

export default configureStore;
