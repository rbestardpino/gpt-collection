import { inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import toast from "react-hot-toast";
import { AppRouter } from "~/server/api/root";
import { api } from "~/utils/api";

interface Props {
  app: inferProcedureOutput<AppRouter["apps"]["getFirstTen"]>[number];
  onSuccess?: () => unknown;
  adminControls?: boolean;
}
const AppCard = ({ app, onSuccess, adminControls = false }: Props) => {
  const { mutateAsync: registerClick } = api.apps.registerClick.useMutation();

  const { mutateAsync: approveApp } = api.apps.approve.useMutation();
  const { mutateAsync: dismissApp } = api.apps.dismiss.useMutation();

  return (
    <div className="card bg-base-300" key={app.id}>
      <div className="card-body">
        {app.categories?.map((c) => (
          <div className="badge-primary badge-outline badge">{c.name}</div>
        ))}
        <Link
          href={app.url + "?ref=https://gtpcollection.tech/"}
          className="link card-title"
          target="_blank"
          role="h2"
          onClick={() => {
            void registerClick({
              appId: app.id,
            }).then(() => {
              if (onSuccess) void onSuccess();
            });
          }}
        >
          {app.name}
        </Link>
        <p>{app.title}</p>
        <p className="text-sm italic">{app.description}</p>
        {/* <div className="card-actions">
          <div className="stats">
            <div className="stat">
              <div className="stat-title">Total Page Clicks</div>
              <div className="stat-value text-primary">{app._count.clicks}</div>
            </div>
          </div>
        </div> */}
        {adminControls && (
          <div className="card-actions justify-end">
            <button
              className="btn-error btn"
              type="button"
              onClick={() => {
                void toast
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
                    if (onSuccess) void onSuccess();
                  });
              }}
            >
              Dismiss
            </button>
            <button
              className="btn-primary btn"
              type="button"
              onClick={() => {
                void toast
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
                    if (onSuccess) void onSuccess();
                  });
              }}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppCard;
