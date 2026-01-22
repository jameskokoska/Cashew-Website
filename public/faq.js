
document.addEventListener("DOMContentLoaded", function() {
  scrollToWebLocation()
  initializeDetailsElements(document.querySelectorAll("details"));
  initializeHeaderElements(document.querySelectorAll("details h4[id]"));
});

function scrollToWebLocation(){
  const id = window.location.hash.replace("#","");
  if (id) {
    const target = document.getElementById(id);
    if (target) {
      if (target?.tagName?.toLowerCase() === 'h4') {
        const details = target.closest('details'); 
        if (details) {
          details.open = true;

          const summary = details.querySelector('summary');
          const content = summary ? summary.nextElementSibling : null;
          if (content) {
            content.style.height = 'auto';
            content.style.opacity = '1';
            content.style.transition = '';
          }

          setTimeout(() => {target.scrollIntoView({ behavior: "instant" }); }, 150); 
          setTimeout(() => {target.scrollIntoView({ behavior: "instant" }); }, 250); 
          setTimeout(() => {target.scrollIntoView({ behavior: "instant" }); }, 350); 
          flashElement(target);
        }
      } else {
        try{
          target.open = true;
          const content = target.querySelector("summary ~ *");
          content.style.height = "auto";
          content.style.opacity = "1";
          content.style.transition = "";
          setTimeout(() => {target.scrollIntoView({ behavior: "instant" }); }, 10);
          setTimeout(() => {target.scrollIntoView({ behavior: "instant" }); }, 50);
          setTimeout(() => {target.scrollIntoView({ behavior: "instant" }); }, 100);
        }catch(e){
          console.log(e)
        }
      }
    }
  }
}

function initializeHeaderElements(headerElements){
  headerElements.forEach(h4 => {
    h4.style.cursor = 'pointer';

    h4.addEventListener('click', (e) => {
      e.stopPropagation();
      history.replaceState(null, '', `#${h4.id}`);
      h4.classList.add("pulse");
      setTimeout(() => {h4.classList.remove("pulse"); }, 1000);
    });
  });
}

function flashElement(el) {
  el.classList.add("flash");
  setTimeout(() => {el.classList.remove("flash"); }, 10000);
}


function initializeDetailsElements(detailsElements){
  detailsElements.forEach(details => {
    details.addEventListener("click", function(event) {
      if (event.target.tagName === "SUMMARY") {
        event.preventDefault();
        toggleDetails(details);
      }
    });

    // Create a MutationObserver to watch for changes to the open attribute
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === "attributes" && mutation.attributeName === "open") {
          animateDetails(details, true);
        }
      });
    });

    observer.observe(details, { attributes: true });
  });
}

function toggleDetails(details) {
  if (details.open) {
    animateDetails(details, false);
    setTimeout(() => { details.open = false; }, 250);
  } else {
    details.open = true;
    animateDetails(details, true);
  }

  if (details.id) {
    history.replaceState(null, '', `#${details.id}`);
  }
}

function animateDetails(details, open) {
  const content = details.querySelector("summary ~ *");

  if (open) {
    content.style.height = "auto";
    const height = content.scrollHeight + "px";
    content.style.height = "0px";
    setTimeout(() => {
      content.style.height = height;
      content.style.opacity = "1";
    }, 0);
  } else {
    content.style.height = content.scrollHeight + "px";
    setTimeout(() => {
      content.style.height = "0px";
      content.style.opacity = "0";
    }, 0);
  }

  content.addEventListener("transitionend", function handler() {
    content.style.height = open ? "auto" : "0px";
    content.removeEventListener("transitionend", handler);
  });
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function highlightText(html, search) {
  if (!search || !search.trim()) return html;
  const regex = buildSynonymRegex(search);
  if (!regex) return html;
  return html.replace(regex, match => `<span class="highlight">${match}</span>`);
}

function matchesSearch(contentText, search) {
  const cleanedSearch = cleanText(search);
  if (!cleanedSearch) return true;

  if (cleanText(contentText).includes(cleanedSearch)) return true;

  const regex = buildSynonymRegex(search);
  return regex ? regex.test(contentText) : false;
}

function searchAndHighlight() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const resultsContainer = document.getElementById("results");
  document.getElementById("results").innerHTML = "";
  document.getElementById("search-results-container").className = "";

  if(searchInput.trim().length <= 1) return

  const detailsElements = document.querySelectorAll("details");

  let found = false;

  detailsElements.forEach(details => {
      const summary = details.querySelector("summary");
      const div = details.querySelector(":scope > div");
      
      const cleanedSearchText = cleanText(summary.textContent + " " + div.textContent);
      const cleanedSearchInput = cleanText(searchInput);

      if (matchesSearch(cleanedSearchText, cleanedSearchInput)) {
        found = true;
        const clonedDetails = details.cloneNode(true)
        clonedDetails.querySelector("summary").innerHTML = highlightText(summary.innerHTML, searchInput);
        clonedDetails.querySelector(":scope > div").innerHTML = highlightText(div.innerHTML, searchInput);
        resultsContainer.appendChild(clonedDetails);
      }
  });

  document.getElementById("search-results-container").className = "results-found-container";

  if (!found) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.style.paddingTop = "8px"
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.textContent = "No results.";
    resultsContainer.appendChild(noResultsMessage);
  }

  initializeDetailsElements(document.getElementById("results").querySelectorAll("details"))
  initializeHeaderElements(document.getElementById("results").querySelectorAll("details h4[id]"));
}

function addDetailsCountToChips() {
  const chips = document.querySelectorAll(".chip-section a");

  chips.forEach((chip) => {
    const sectionId = chip.getAttribute("href").substring(1);
    const sectionHeader = document.querySelector(`#${sectionId} + .faq-header`); 
    let count = 0;

    if (sectionHeader) {
      let sibling = sectionHeader.nextElementSibling;

      while (sibling && sibling.tagName.toLowerCase() !== "h3") {
        if (sibling.tagName.toLowerCase() === "details") {
          count++;
        }
        sibling = sibling.nextElementSibling;
      }
    }

    const chipText = chip.querySelector("p");
    if (chipText) {
      chipText.textContent += ` (${count})`;
    }
  });
}

document.addEventListener("DOMContentLoaded", addDetailsCountToChips);


document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const href = a.getAttribute("href");
  if (!href || href === "#") return;

  const id = href.slice(1);
  if (!id) return;

  if (!document.getElementById(id)) return;
  e.preventDefault();
  history.pushState(null, "", href);

  scrollToWebLocation();
});
