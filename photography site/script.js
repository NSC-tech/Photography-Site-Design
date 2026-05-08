const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    const target =
      document.querySelector(
        link.getAttribute("href")
      );

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});

//about me function
function showTab(tabId) {

  // hide all panels
  const panels = document.querySelectorAll(".tab-panel");
  panels.forEach(panel => {
    panel.classList.remove("active");
  });

  // remove active from buttons
  const buttons = document.querySelectorAll(".tab");
  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  // show selected panel
  document.getElementById(tabId).classList.add("active");

  // highlight clicked button
  event.target.classList.add("active");
}