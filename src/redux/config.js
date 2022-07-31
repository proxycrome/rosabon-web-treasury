const config = {
	rosobon:
		process.env.REACT_APP_TEST_URL ||
		"http://localhost:8000/api/"
		// "http://134.209.64.28:8090/",
};

const url = config.testUrl;

export { url, config };
