document.addEventListener("DOMContentLoaded", () => {

  const headings = document.querySelectorAll(".markdown-preview-view h2, .content h2, main h2");

  headings.forEach((heading) => {

    heading.classList.add("collapsible-heading");

    let next = heading.nextElementSibling;
    const elements = [];

    while (
      next &&
      next.tagName !== "H1" &&
      next.tagName !== "H2"
    ) {
      elements.push(next);
      next = next.nextElementSibling;
    }

    if (elements.length === 0) return;

    heading.setAttribute("aria-expanded", "true");

    heading.addEventListener("click", () => {

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

    });

  });

});
