// benchmarks/vdom.create.js
import { runBench, printResults } from "./util.js";
import { m } from "../dist/core/mithril-lite.js";

const makeTree = () =>
  m(
    "div",
    { class: "app" },
    m("header", null, "Title"),
    m(
      "main",
      null,
      m(
        "ul",
        null,
        ...Array.from({ length: 50 }).map((_, i) =>
          m(
            "li",
            { key: i, class: "item" },
            m("span", null, `Item ${i}`),
            m("button", { onclick: () => {} }, "Click")
          )
        )
      )
    ),
    m("footer", null, "Footer")
  );

const main = () => {
  const results = [
    runBench("vdom.create 10k", 10000, () => {
      makeTree();
    }),
  ];

  printResults(results);
};

main();
