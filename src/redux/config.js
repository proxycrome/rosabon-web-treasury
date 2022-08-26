const config = {
	rosobon:
		process.env.REACT_APP_TEST_URL ||
		"https://api-rosabon.optisoft.com.ng:8090/",
};

const url = config.testUrl;

export { url, config };
