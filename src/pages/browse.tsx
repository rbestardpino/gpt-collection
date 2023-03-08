import { type NextPage } from "next";
import { useState } from "react";
import AppCard from "~/components/AppCard";
import Metatags from "~/components/Metatags";
import Navbar from "~/components/Navbar";
import StatsShowcase from "~/components/StatsShowcase";
import { api } from "~/utils/api";

const TABS = ["top", "new"] as const;
type Tab = (typeof TABS)[number];

const BrowsePage: NextPage = () => {
  const [searchInput, setSearchInput] = useState("");

  const {
    data: apps,
    refetch,
    isLoading: isLoadingApps,
    error: errorApps,
  } = api.apps.getApproved.useQuery({
    // limit: 100, until we have pagination
    search: searchInput,
  });

  const { data: countApps } = api.apps.getAppStats.useQuery();

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
            Browse all apps
          </h1>
          <p className="text-l mb-6 leading-7 sm:text-xl md:text-2xl [&:not(:first-child)]:mt-6">
            Search within our collection to find the one you&apos;re looking
            for.
          </p>
          <StatsShowcase />
        </div>

        {/* APPS: TOP, NEW */}
        <div className="flex flex-col gap-6 px-4 sm:px-8 md:px-16">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Total apps: {countApps?.countTotalApps || "counting..."}
              </span>
            </label>
            <input
              value={searchInput} // conditional to prevent "uncontrolled to controlled" react warning
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              type="text"
              placeholder={"Search by name or description"}
              className="input-bordered input w-full"
            />
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

export default BrowsePage;
