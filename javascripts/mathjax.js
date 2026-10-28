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
};

// document$ re-fires on every page load, including instant navigation.
document$.subscribe(() => {
  MathJax.startup.output.clear();
  MathJax.typesetClear();
  MathJax.texReset();
  MathJax.typesetPromise();
});
