import { div, h1, button, p, ul, li, section } from "../renderer";
import type { Model, Msg, Resource,EnvResources } from "../model/types";

const ResourceList = (key: string, res: Resource<any>, dispatch: (msg: Msg) => void) =>
  section({ className: "p-4 border rounded" }, [
    h1({ className: "text-lg font-bold mb-2 capitalize" }, key),
    button(
      {
        className: "bg-blue-600 text-white px-3 py-1 rounded mb-3",
        onclick: () => dispatch({ type: "FETCH_RESOURCE", key:key as keyof EnvResources }),
      },
      res.loading ? "Loading..." : "Fetch"
    ),
    res.error && p({ className: "text-red-600" }, `Error: ${res.error}`),
    ul(
      { className: "text-sm space-y-1" },
      res.data.slice(0, 5).map((item: any) =>
        li({ className: "border-b pb-1" }, JSON.stringify(item))
      )
    ),
  ]);

export const ResourcePanel = (m: Model, dispatch: (msg: Msg) => void) =>
  div({ className: "grid grid-cols-2 gap-4" }, [
    ResourceList("posts", m.posts, dispatch),
    ResourceList("comments", m.comments, dispatch),
    ResourceList("albums", m.albums, dispatch),
    ResourceList("photos", m.photos, dispatch),
    ResourceList("todos", m.todos, dispatch),
    ResourceList("users", m.users, dispatch),
  ]);
