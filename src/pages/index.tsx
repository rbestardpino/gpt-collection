import { type NextPage } from "next";
import { useState } from "react";
import AppCard from "~/components/AppCard";
import Metatags from "~/components/Metatags";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const TABS = ["top", "new"] as const;
type Tab = (typeof TABS)[number];

const HomePage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("top");

  const {
    data: apps,
    refetch,
    isLoading: isLoadingApps,
    error: errorApps,
  } = api.apps.getFirstTen.useQuery({
    orderBy: selectedTab === "top" ? "clicks" : "updatedAt",
    // limit: 10, until we have pagination
  });

  if (errorApps) {
    return <div>ERROR: {errorApps.message}</div>;
  }
  return (
    <>
      <Metatags />
      <main className="mb-20">
        <Navbar />

        {/* HERO */}
        <div className="px-8 pt-5 text-center sm:px-16 sm:pt-10 md:px-32 lg:px-64">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-7xl">
            A comprehensive list of <span className="text-primary">AI </span>
            powered apps
          </h1>
          <p className="text-l leading-7 sm:text-xl md:text-2xl [&:not(:first-child)]:mt-6">
            Say no to spending hours of going through your liked tweets to find
            that one app you wanted to try. Here you can find a curated list of
            all the AI-driven apps that we&apos;ve found.
          </p>
        </div>

        {/* APPS: TOP, NEW */}
        <div className="px-4 sm:px-8 md:px-16">
          <div className="tabs tabs-boxed mt-8 mb-4 w-fit justify-start">
            {TABS.map((tab) => {
              return (
                <a
                  className={`tab tab-lg ${
                    selectedTab === tab ? "tab-active" : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                  key={tab}
                >
                  {tab.toUpperCase()}
                </a>
              );
            })}
          </div>
          {isLoadingApps ? (
            <progress className="progress justify-center" />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <AppCard app={app} key={app.id} onSuccess={refetch} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
