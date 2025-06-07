import { Hono, type Context } from "hono";
import { cache } from "hono/cache";

type Bindings = {
	TOP_APP_URL: string;
	QUIZ_APP_URL: string;
	VIEWER_APP_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get(
	"*",
	cache({
		cacheName: "world-history-map",
		cacheControl: "public, max-age=0, s-maxage=600, must-revalidate",
	}),
);

app.get("/", async (c: Context) => {
	const res = await fetch(c.env.TOP_APP_URL);
	return res;
});

app.get("/top/*", async (c: Context) => {
	const path = c.req.path;
	const res = await fetch(`${c.env.TOP_APP_URL}${path}`);
	return res;
});

app.get("/quiz/*", async (c: Context) => {
	const path = c.req.path;
	const res = await fetch(`${c.env.QUIZ_APP_URL}${path}`);
	return res;
});

app.get("/viewer/*", async (c: Context) => {
	const path = c.req.path;
	const res = await fetch(`${c.env.VIEWER_APP_URL}${path}`);
	return res;
});

export default app;
