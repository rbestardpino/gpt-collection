import Head from "next/head";

const Metatags = () => {
  const title = "GPT Collection";
  const desc =
    "A comprehensive list of AI powered apps. Say no to spending hours of going through your liked tweets to find that one app you wanted to try. Here you can find a curated list of all the AI-driven apps that we've found.";
  const image = "/logo.svg";
  const url = "http://gptcollection.tech/";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="icon" href="/logo.svg" />
      <meta
        name="keywords"
        content="ai, chat, chatgpt, gpt, dalle, image, collection, apps, ai apps, ai powered apps, ai powered, a, i, browse, best ai apps, best apps, ai applications, ai web, AI"
      />
      <meta name="author" content="Rodrigo Bestard Pino" />
      <meta name="copyright" content="BePi" />
      <meta name="robots" content="index" />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:site" content="@rbestardpino" />
      <meta name="twitter:creator" content="@rbestardpino" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Metatags;
