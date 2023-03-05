import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import Form from "./Form";

const CreateAppSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z
    .string()
    .url()
    .transform((url) => {
      const _url = new URL(url);

      if (_url.protocol === "http:") {
        return `https://${_url.host}${_url.pathname}`;
      }

      return _url.origin + _url.pathname;
    }),
});

const AddAppButton = () => {
  const {
    mutateAsync: createApp,
    isLoading,
    error,
  } = api.apps.create.useMutation();

  const { reset } = useForm<z.infer<typeof CreateAppSchema>>();

  const onSubmit = (data: z.infer<typeof CreateAppSchema>) => {
    createApp(data)
      .then(() => {
        toast.success("App added successfully!");
        reset();
        // TODO: make reset work properyly
        // TODO: maybe close dialog after success
      })
      .catch((e) => {
        toast.error(errorMessage(e.message));
      });
  };

  function errorMessage(message: string) {
    if (message.includes("Unique constraint failed"))
      return "The app you are trying to add is already in the collection.";

    return "Something went wrong. Please try again later.";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn bg-primary">Add App</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new app</DialogTitle>
          <DialogDescription>
            Complete the form below to add a new app to the collection.
          </DialogDescription>
        </DialogHeader>
        <Form
          schema={CreateAppSchema}
          onSubmit={onSubmit}
          props={{
            name: {
              label: "Name",
              placeholder: "Name of the app",
            },
            description: {
              label: "Description",
              placeholder: "Description of the app",
            },
            url: {
              label: "URL",
              placeholder: "URL of the app",
            },
          }}
          renderAfter={() => {
            return (
              <DialogFooter className="mt-8">
                <button
                  type="submit"
                  className={"btn-primary btn" + (isLoading ? " loading" : "")}
                >
                  Add App
                </button>
              </DialogFooter>
            );
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddAppButton;
