# e-Bridge Timetable to .ics file

### Basic Usage

1. Install deno
2. Download source code
3. Prepare the .html file of e-bridge timetable and rename it to `XJTLU e-Bridge.html`
4. `deno test -A tests.ts`
5. Check `test.ics` in the folder

or

1. Install deno
2. Download the source code
3. `deno run -A cli.ts`

Tip: `control + C` to force quit cli

### Advanced Usage

```typescript
import { DOMParser, genCalendar, parseTimetable } from "https://deno.land/x/ebridge_timetable_parser@1.1.2/mod.ts";

const document = new DOMParser().parseFromString(
  Deno.readTextFileSync('XJTLU e-Bridge.html').toString(),
  'text/html'
)!;

const lessons = parseTimetable(document);

console.table(lessons);

const calendar = genCalendar(lessons);

console.log(calendar.toLines());

Deno.writeTextFileSync('test.ics', calendar.toString());
```

### Build Docker Image & Run

build

```bash
docker build -t ebridge-timetable-api .
```

run

```bash
docker run -p 8000:8000 ebridge-timetable-api
```

Now api service will run on <http://localhost:8000>.
You can also use docker compose by typing `docker-compose up`.

### Api Test

```bash
curl -X POST -H "Content-Type: text/plain" --data-binary @"XJTLU e-Bridge.html" http://localhost:8000/parse-and-generate > result.json
```