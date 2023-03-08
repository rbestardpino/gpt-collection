import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AppCard from "~/components/AppCard";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const AdminPage: NextPage = () => {
  const { data: sessionData } = useSession();
  const {
    data: apps,
    isLoading: isLoadingApps,
    error,
    refetch,
  } = api.apps.getNotApproved.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { mutateAsync: approveApp } = api.apps.approve.useMutation();

  const { mutateAsync: dismissApp } = api.apps.dismiss.useMutation();

  if (sessionData?.user?.role !== "ADMIN") {
    return <main>UNAUTHORIZED</main>;
  }

  if (isLoadingApps) return <main>Loading...</main>;

  if (error) return <main>{error.message}</main>;

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppCard app={app} key={app.id} onSuccess={refetch} adminControls />
        ))}
      </div>
    </main>
  );
};

export default AdminPage;

// TODO: add an edit functionality
