interface Config {
	port: string | number;
	verifyToken: string;
}

const config: Config = {
	port: process.env.PORT || 3000,
	verifyToken: process.env.VERIFY_TOKEN || "",
};

export default config;
