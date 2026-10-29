// MathJax config for pymdownx.arithmatex (generic mode): inline \( \) and display \[ \].
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
  },
  // Typesetting is driven by typesetMath() below instead of MathJax's own page-ready pass, so it
  // does not depend on which of the two runs first (that order differs between browsers).
  startup: {
    typeset: false,
  },
};

// Typeset the formulas on the page that have not been rendered yet. Safe to call any number of
// times: already-rendered formulas contain an <mjx-container> and are skipped. If MathJax's script
// has not finished loading yet (slow connection), try again shortly.
function typesetMath(retries = 50) {
  const pending = [...document.querySelectorAll(".arithmatex")].filter(
    (el) => !el.querySelector("mjx-container")
  );
  if (!pending.length) return;
  if (!window.MathJax || !MathJax.startup || !MathJax.startup.promise) {
    if (retries > 0) setTimeout(() => typesetMath(retries - 1), 200);
    return;
  }
  MathJax.startup.promise
    .then(() => {
      // Forget the math items of the page we navigated away from.
      MathJax.typesetClear();
      return MathJax.typesetPromise(pending);
    })
    .catch((err) => console.error("MathJax typeset failed:", err));
}

// document$ fires on every page load, including instant navigation. "load" is a fallback for when
// MathJax's script finished loading after document$ fired.
document$.subscribe(() => typesetMath());
window.addEventListener("load", () => typesetMath());
