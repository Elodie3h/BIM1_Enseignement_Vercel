document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("article h2");

  headings.forEach((heading) => {
    heading.classList.add("collapsible-heading");

    const elements = [];
    let next = heading.nextElementSibling;

    while (next && next.tagName !== "H2" && next.tagName !== "H1") {
      elements.push(next);
      next = next.nextElementSibling;
    }

    if (!elements.length) return;

    heading.setAttribute("role", "button");
    heading.setAttribute("tabindex", "0");
    heading.setAttribute("aria-expanded", "true");

    const toggle = () => {
      const collapsed = heading.classList.toggle("is-collapsed");

      elements.forEach((element) => {
        element.hidden = collapsed;
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
