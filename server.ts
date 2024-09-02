import { Application, Router } from "./deps.ts";
import { DOMParser, genCalendar, parseTimetable } from "./mod.ts";

const app = new Application();
const router = new Router();

router.post("/calendar-parse", async (ctx) => {
  const body = ctx.request.body();

  if (body.type !== "text") {
    ctx.response.status = 400;
    ctx.response.body = { error: "请求体必须是文本格式的HTML" };
    return;
  }

  const htmlContent = await body.value;

  const parser = new DOMParser();
  const document = parser.parseFromString(htmlContent, "text/html");

  if (!document) {
    ctx.response.status = 400;
    ctx.response.body = { error: "无法解析HTML内容" };
    return;
  }

  try {
    const lessons = parseTimetable(document);
    const calendar = genCalendar(lessons);

    ctx.response.body = {
      lessons: lessons,
      ics: calendar.toString(),
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "处理课程表时出错: " + error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("服务器运行在 http://localhost:8000");
await app.listen({ port: 8000 });