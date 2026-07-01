const DEFAULTS = {
  enabled: true,
  height: 150,
  minDownPixels: 3
};

const enabled = document.querySelector("#enabled");
const height = document.querySelector("#height");
const heightValue = document.querySelector("#heightValue");
const minDownPixels = document.querySelector("#minDownPixels");
const sensitivityValue = document.querySelector("#sensitivityValue");
const openDemo = document.querySelector("#openDemo");

function render(values) {
  enabled.checked = values.enabled;
  height.value = values.height;
  heightValue.value = `${values.height}px`;
  minDownPixels.value = values.minDownPixels;
  sensitivityValue.value = `${values.minDownPixels}px`;
}

function savePatch(patch) {
  chrome.storage.sync.set(patch);
}

chrome.storage.sync.get(DEFAULTS, render);

enabled.addEventListener("change", () => {
  savePatch({ enabled: enabled.checked });
});

height.addEventListener("input", () => {
  const value = Number(height.value);
  heightValue.value = `${value}px`;
  savePatch({ height: value });
});

minDownPixels.addEventListener("input", () => {
  const value = Number(minDownPixels.value);
  sensitivityValue.value = `${value}px`;
  savePatch({ minDownPixels: value });
});

openDemo.addEventListener("click", () => {
  chrome.storage.sync.set({ enabled: true }, () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("demo.html") });
  });
});
