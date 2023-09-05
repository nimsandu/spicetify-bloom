export default async function bloom() {
  const textColor = getComputedStyle(document.documentElement).getPropertyValue("--spice-text");
  if (textColor === " #000000") {
    document.documentElement.style.setProperty("--filter-brightness", 0);
  }

  waitForElements([".main-yourLibraryX-navLink"], () => {
    const navLinks = document.getElementsByClassName("main-yourLibraryX-navLink");
    for (let i = 0; i < navLinks.length; i += 1) {
      const div = document.createElement("div");
      div.classList.add("main-yourLibraryX-navLink-accent");
      navLinks[i].appendChild(div);
    }
  });

  waitForAPIs(["Spicetify.Panel"], () => {
    Spicetify.Panel.subPanelState(updateLyricsPageProperties);
  });

  Spicetify.Player.addEventListener("songchange", updateLyricsBackdrop);

  function onPageChange() {
    const lyricsBackdropContainer = document.getElementById("lyrics-backdrop-container");

    if (Spicetify.Platform.History.location.pathname.includes("lyrics")) {
      if (lyricsBackdropContainer == null) {
        initLyricsBackdrop();
      } else {
        lyricsBackdropContainer.style.display = "unset";
        updateLyricsPageProperties();
      }
    } else {
      if (lyricsBackdropContainer != null) {
        lyricsBackdropContainer.style.display = "none";
      }
      if (Spicetify.Platform.History.location.pathname === "/search") {
        addCategoryCardBackdrop();
      }
    }
  }

  function lyricsCinemaCallback(mutationsList) {
    const lyricsBackdropContainer = document.getElementById("lyrics-backdrop-container");
    const lyricsCinema = mutationsList[0].target;

    if (lyricsCinema.classList.contains("main-lyricsCinema-lyricsCinemaVisible")) {
      if (lyricsBackdropContainer == null) {
        initLyricsBackdrop();
      } else {
        lyricsBackdropContainer.style.display = "unset";
        updateLyricsPageProperties();
      }
    } else if (
      lyricsBackdropContainer != null &&
      !Spicetify.Platform.History.location.pathname.includes("lyrics")
    ) {
      lyricsBackdropContainer.style.display = "none";
    }
  }

  waitForAPIs(["Spicetify.Platform.History"], () => {
    Spicetify.Platform.History.listen(onPageChange);
    onPageChange();

    waitForElements([".Root__lyrics-cinema"], () => {
      const lyricsCinema = document.getElementsByClassName("Root__lyrics-cinema")[0];
      const lyricsCinemaObserver = new MutationObserver(lyricsCinemaCallback);
      const lyricsCinemaObserverConfig = {
        attributes: true,
        attributeFilter: ["class"],
      };
      lyricsCinemaObserver.observe(lyricsCinema, lyricsCinemaObserverConfig);
    });
  });

  window.addEventListener("load", centerTopbar);

  function onResize() {
    centerTopbar();
    updateLyricsPageProperties();
  }
  window.onresize = onResize;

  const bodyObserver = new MutationObserver(moveTippies);
  const bodyObserverConfig = {
    childList: true,
    subtree: true,
  };
  bodyObserver.observe(document.body, bodyObserverConfig);

  setNoiseOpacity();
}
