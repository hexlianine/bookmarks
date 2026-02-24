(function () {
  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("bookmark-search-input");
    var status = document.getElementById("bookmark-search-status");
    var help = document.getElementById("bookmark-search-help");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".bookmark-card"));

    if (!input || !status || cards.length === 0) {
      return;
    }

    var sections = Array.prototype.slice.call(document.querySelectorAll(".category-section"));
    var totalCount = cards.length;
    var visibleCards = cards.slice();
    var activeIndex = -1;

    cards.forEach(function (card) {
      var details = card.querySelector("[data-search-text]");
      var searchText = details ? details.getAttribute("data-search-text") : card.getAttribute("data-name");
      card.setAttribute("data-search-index", normalize(searchText));
    });

    function setStatus(query) {
      var shown = visibleCards.length;
      if (!query) {
        status.textContent = "Showing " + shown + " of " + totalCount + " bookmarks";
        return;
      }

      if (shown === 0) {
        status.textContent = 'No bookmarks found for "' + query + '"';
        return;
      }

      status.textContent = 'Showing ' + shown + ' result' + (shown === 1 ? "" : "s") + ' for "' + query + '"';
    }

    function clearActive() {
      cards.forEach(function (card) {
        card.classList.remove("is-active");
      });
      activeIndex = -1;
    }

    function setActive(index) {
      clearActive();
      if (visibleCards.length === 0) {
        return;
      }

      var nextIndex = index;
      if (nextIndex < 0) {
        nextIndex = visibleCards.length - 1;
      }
      if (nextIndex >= visibleCards.length) {
        nextIndex = 0;
      }

      activeIndex = nextIndex;
      var activeCard = visibleCards[activeIndex];
      activeCard.classList.add("is-active");
      activeCard.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    function filterCards(rawQuery) {
      var query = normalize(rawQuery);
      clearActive();
      visibleCards = [];

      cards.forEach(function (card) {
        var searchIndex = card.getAttribute("data-search-index");
        var match = !query || (searchIndex && searchIndex.indexOf(query) !== -1);
        card.classList.toggle("is-filtered-out", !match);
        if (match) {
          visibleCards.push(card);
        }
      });

      sections.forEach(function (section) {
        var sectionCards = section.querySelectorAll(".bookmark-card:not(.is-filtered-out)");
        section.classList.toggle("is-filtered-out", sectionCards.length === 0);
      });

      setStatus(rawQuery.trim());
    }

    filterCards("");

    input.addEventListener("input", function (event) {
      filterCards(event.target.value);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive(activeIndex + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(activeIndex - 1);
      } else if (event.key === "Enter") {
        if (visibleCards.length === 0) {
          return;
        }
        event.preventDefault();
        var cardToOpen = activeIndex >= 0 ? visibleCards[activeIndex] : visibleCards[0];
        window.open(cardToOpen.href, "_blank", "noopener");
      } else if (event.key === "Escape") {
        event.preventDefault();
        input.value = "";
        filterCards("");
      }
    });

    document.addEventListener("keydown", function (event) {
      var target = event.target;
      var isTypingTarget =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "/" && !isTypingTarget) {
        event.preventDefault();
        input.focus();
        input.select();
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.focus();
        input.select();
      }

      if (event.key === "?" && help && !isTypingTarget) {
        event.preventDefault();
        help.open = !help.open;
      }
    });

    if (help) {
      document.addEventListener("click", function (event) {
        if (!help.open) {
          return;
        }
        if (!help.contains(event.target)) {
          help.open = false;
        }
      });
    }
  });
})();
