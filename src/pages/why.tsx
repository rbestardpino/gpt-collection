import Metatags from "~/components/Metatags";
import Navbar from "~/components/Navbar";

const WhyPage = () => {
  return (
    <>
      <Metatags />
      <main className="mb-20">
        <Navbar />

        {/* HERO */}
        <div className="px-8 pt-5 text-center sm:px-16 sm:pt-10 md:px-32 lg:px-64">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-7xl">
            Why?
          </h1>
          <p className="text-l mb-6 leading-7 sm:text-xl md:text-2xl [&:not(:first-child)]:mt-6">
            The sudden rise of the AI industry has led to a lot of hype and
            excitement. And because of that and thanks to OpenAI's open models,
            a new AI-powered app gets created every morning (maybe two). It is
            hard to keep up with all of them, so I decided to create this
            website to help you find the best ones.
          </p>
          <p className="text-l mb-6 leading-7 sm:text-xl md:text-2xl [&:not(:first-child)]:mt-6">
            Basically, I was tired of seeing an interesting app on my Twitter
            feed and then not being able to find it again.
          </p>
        </div>
      </main>
    </>
  );
};

export default WhyPage;
