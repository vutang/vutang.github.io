// Colour table cells inside <div class="heatmap"> by their text.
const HEATMAP_LEVELS = {
  "thống trị": "lvl-4",
  "mạnh": "lvl-3",
  "đang lên": "lvl-2",
  "ngách": "lvl-1",
  "—": "lvl-0",
};

function colorHeatmaps() {
  document.querySelectorAll(".heatmap td").forEach((td) => {
    const level = HEATMAP_LEVELS[td.textContent.trim().toLowerCase()];
    if (level) td.classList.add("heat", level);
  });
}

// document$ re-fires on every page load, including instant navigation.
document$.subscribe(colorHeatmaps);
