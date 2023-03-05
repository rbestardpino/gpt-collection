import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AppLink from "~/components/AppLink";
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

  const { mutateAsync: approveApp, isLoading: isLoadingMutation } =
    api.apps.approve.useMutation();

  if (sessionData?.user?.role !== "ADMIN") {
    return <main>UNAUTHORIZED</main>;
  }

  if (isLoadingApps) return <main>Loading...</main>;

  if (error) return <main>{error.message}</main>;

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => {
          return (
            <div className="card bg-base-300" key={app.id}>
              <div className="card-body">
                <AppLink app={app} />
                <p>{app.description}</p>
                <div className="card-actions justify-end">
                  <button
                    className={
                      "btn-primary btn" + (isLoadingMutation ? " loading" : "")
                    }
                    type="button"
                    onClick={() => {
                      void approveApp({
                        id: app.id,
                      }).then(() => {
                        void refetch();
                      });
                    }}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default AdminPage;
