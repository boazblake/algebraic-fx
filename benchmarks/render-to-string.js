// benchmarks/render-to-string.js
import { runBench, printResults } from "./util.js";
import { m } from "../dist/core/mithril-lite.js";
import { renderToString } from "../dist/core/render-to-string.js";

const makeTree = () =>
  m(
    "div",
    { class: "app", "data-id": "123" },
    m("header", null, "Title"),
    m(
      "section",
      null,
      ...Array.from({ length: 50 }).map((_, i) =>
        m(
          "article",
          { class: "card", "data-i": i },
          m("h2", null, `Card ${i}`),
          m("p", null, "Lorem ipsum dolor sit amet.")
        )
      )
    ),
    m("footer", null, "Footer")
  );

const vnode = makeTree();

const main = () => {
  const results = [
    runBench("renderToString 5k", 5000, () => {
      renderToString(vnode);
    }),
  ];

  printResults(results);
};

main();
