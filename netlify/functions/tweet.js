const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const pathParts = event.path.split("/");
  const user = pathParts[1];
  const id = pathParts[3];
  const url = `https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F${user}%2Fstatus%2F${id}&align=center&theme=light&dnt=true`;

  try {
    const oembed = await fetch(url).then((res) => res.json());

    return {
      statusCode: 200,
      body: renderTweetPage(oembed.author_name, oembed.rawUrl, oembed.html),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: renderNotFoundPage(),
    };
  }
};

function renderTweetPage(author, url, embedHtml) {
  const title = `Tweet by ${author}`;
  const description = "See what they said";

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />

        <!-- Primary Meta Tags -->
        <title>${title}</title>
        <meta name="title" content="${title}">
        <meta name="description" content="${description}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${url}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="">
      </head>
      <body>
        <main>
          <section>${embedHtml}</section>
        </main>
      </body>
    </html>`;
}

function renderNotFoundPage() {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
        <title>Not found</title>
      </head>
      <body>
        <main>
          <section>
            <h1>Not found</h1>
          </section>
        </main>
      </body>
    </html>`;
}
