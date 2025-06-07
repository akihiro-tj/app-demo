import { Hono, type Context } from "hono";

type Bindings = {
	TOP_APP_URL: string;
	QUIZ_APP_URL: string;
	VIEWER_APP_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/top/*", async (c: Context) => {
	const path = c.req.path;
	const response = await fetch(`${c.env.TOP_APP_URL}${path}`);
	return response;
});

app.get("/quiz/*", async (c: Context) => {
	const path = c.req.path;
	const response = await fetch(`${c.env.QUIZ_APP_URL}${path}`);
	return response;
});

app.get("/viewer/*", async (c: Context) => {
	const path = c.req.path;
	const response = await fetch(`${c.env.VIEWER_APP_URL}${path}`);
	return response;
});

export default app;
