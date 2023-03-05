import type { App } from "@prisma/client";
import Link from "next/link";
import { api } from "~/utils/api";

interface Props {
  app: App;
  onSuccess?: () => unknown;
}
const AppLink = ({ app, onSuccess }: Props) => {
  const { mutateAsync: registerClick } = api.apps.registerClick.useMutation();

  return (
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
  );
};

export default AppLink;
