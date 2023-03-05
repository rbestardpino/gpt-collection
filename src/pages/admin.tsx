import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
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
        {apps.map((app) => {
          return (
            <div className="card bg-base-300" key={app.id}>
              <div className="card-body">
                <AppLink app={app} />
                <p>{app.description}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn-error btn"
                    type="button"
                    onClick={() => {
                      toast
                        .promise(
                          dismissApp({
                            id: app.id,
                          }),
                          {
                            loading: `Dismissing "${app.name}"`,
                            success: `Dismissed "${app.name}"`,
                            error: `Error dismissing "${app.name}"`,
                          }
                        )
                        .then(() => {
                          void refetch();
                        });
                    }}
                  >
                    Dismiss
                  </button>
                  <button
                    className="btn-primary btn"
                    type="button"
                    onClick={() => {
                      toast
                        .promise(
                          approveApp({
                            id: app.id,
                          }),
                          {
                            loading: `Approving "${app.name}"`,
                            success: `Approved "${app.name}"`,
                            error: `Error approving "${app.name}"`,
                          }
                        )
                        .then(() => {
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

// TODO: add an edit functionality
