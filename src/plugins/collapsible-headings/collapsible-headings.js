document.addEventListener("DOMContentLoaded", () => {

  const headings = document.querySelectorAll(
    ".markdown-preview-view h1, .markdown-preview-view h2," +
    ".content h1, .content h2," +
    "main h1, main h2"
  );

  let firstH1Skipped = false;

  headings.forEach((heading) => {

    // Ignore le titre principal de la page
    if (heading.tagName === "H1" && !firstH1Skipped) {
      firstH1Skipped = true;
      return;
    }

    if (heading.classList.contains("collapsible-heading")) return;

    heading.classList.add("collapsible-heading");

    const currentLevel = parseInt(heading.tagName.substring(1));
    const elements = [];

    let next = heading.nextElementSibling;

    while (next) {

      if (/^H[1-6]$/.test(next.tagName)) {
        const nextLevel = parseInt(next.tagName.substring(1));

        if (nextLevel <= currentLevel) {
          break;
        }
      }

      elements.push(next);
      next = next.nextElementSibling;
    }

    if (elements.length === 0) return;

    heading.setAttribute("role", "button");
    heading.setAttribute("tabindex", "0");
    heading.setAttribute("aria-expanded", "true");

    const toggle = () => {

      const collapsed =
        heading.classList.toggle("is-collapsed");

      elements.forEach((element) => {
        element.style.display =
          collapsed ? "none" : "";
      });

      heading.setAttribute(
        "aria-expanded",
        collapsed ? "false" : "true"
      );
    };

    heading.addEventListener("click", toggle);

    heading.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });

  });

});
