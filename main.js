const sections = [
  ...document.getElementById("container").getElementsByTagName("section"),
];
const navSections = [
  ...document.getElementById("nav-links").getElementsByTagName("li"),
];

const getCurrentViewArea = scroll => {
  let currentSection;
  sections.forEach(section => {
    if (
      scroll + window.innerHeight / 2 >= section.offsetTop &&
      scroll + window.innerHeight / 2 < section.offsetTop + section.offsetHeight
    ) {
      currentSection = section;
    }
  });
  return currentSection;
};

const addCurrentViewClass = element => {
  navSections.forEach(item => {
    if (element.id === item.dataset.value) {
      item.classList.add("current-view");
    } else {
      item.classList.remove("current-view");
    }
  });
};

// Current view area calculation on every scroll
window.addEventListener("scroll", e => {
  const currentViewArea = getCurrentViewArea(window.pageYOffset);
  addCurrentViewClass(currentViewArea);
});

//Initial class calculation
window.addEventListener("ready", e => {
  runIntro();
  const currentViewArea = getCurrentViewArea(window.pageYOffset);
  addCurrentViewClass(currentViewArea);
});

//Smooth scrolling
navSections.forEach(navElelement => {
  navElelement.addEventListener("click", e => {
    e.preventDefault();
    const targetSection = sections.find(
      section => section.id === navElelement.dataset.value,
    );
    const distanceTo = targetSection.getBoundingClientRect().top;
    window.scrollBy({ top: distanceTo, left: 0, behavior: "smooth" });
  });
});

const callToAction = () => {
  const distanceTo = document.getElementById("about").getBoundingClientRect()
    .top;
  window.scrollBy({ top: distanceTo, left: 0, behavior: "smooth" });
};

const runIntro = () => {
  const intro = document.getElementById("intro");
  intro.setAttribute("style", "display: flex");
  const timer = document.getElementById("timer");
  let seconds = 5;
  const counter = () => {
    seconds--;
    timer.innerText = seconds;
  };
  setInterval(counter, 1000);
  setTimeout(() => intro.setAttribute("style", "display: none"), 5000);
};
