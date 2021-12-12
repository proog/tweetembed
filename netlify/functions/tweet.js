const axios = require("axios").default;

const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tweet</title>

    <!-- Primary Meta Tags -->
    <title>Tweet by {author}</title>
    <meta name="title" content="Tweet by {author}">
    <meta name="description" content="See what they said">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{url}">
    <meta property="og:title" content="Tweet by {author}">
    <meta property="og:description" content="See what they said">
    <meta property="og:image" content="">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{url}">
    <meta property="twitter:title" content="Tweet by {author}">
    <meta property="twitter:description" content="See what they said">
    <meta property="twitter:image" content="">
  </head>
  <body>{embed}</body>
</html>
`;

exports.handler = async function (event, context) {
  const pathParts = event.path.split("/");
  const user = pathParts[1];
  const id = pathParts[3];

  if (!user || !id) {
    return { statusCode: 404 };
  }

  const url = `https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F${user}%2Fstatus%2F${id}&dnt=true`;
  const oembed = await axios.get(url);
  const responseHtml = template
    .replace(/{author}/g, oembed.data.author_name)
    .replace(/{url}/g, event.rawUrl)
    .replace(/{embed}/g, oembed.data.html);

  return {
    statusCode: 200,
    body: responseHtml,
  };
};
