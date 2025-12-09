import { FakeDocument } from "./fake-dom.js";
import { runBench, printResults } from "./util.js";
import { m } from "../dist/core/mithril-lite.js";
import { render } from "../dist/core/mithril-lite.js";

const makeList = (n, offset) =>
  m(
    "ul",
    null,
    ...Array.from({ length: n }).map((_, i) =>
      m("li", { key: i }, `Item ${i + offset}`)
    )
  );

const main = () => {
  const doc = new FakeDocument();
  const root = doc.getElementById("root");

  let vnode = makeList(200, 0);
  render(root, vnode);

  const results = [
    runBench("vdom.update list 200", 5000, () => {
      vnode = makeList(200, 1);
      render(root, vnode);
      vnode = makeList(200, 0);
      render(root, vnode);
    }),
  ];

  printResults(results);
};

main();
