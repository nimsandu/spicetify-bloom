(function bloom() {

  function waitForElement(els, func, timeout = 100) {
    const queries = els.map(el => document.querySelector(el));
    if (queries.every(a => a)) {
      func();
    } else if (timeout > 0) {
      setTimeout(waitForElement, 300, els, func, timeout--);
    }
  }
  waitForElement([
    ".main-rootlist-rootlistItem"
  ], function () {
    const mainRootlistWrapper = document.getElementsByClassName("main-rootlist-wrapper")[0];
mainRootlistWrapper.style.height = (mainRootlistWrapper.offsetHeight * 2) + "px";
    const cache = new Map();
    async function fetchPlaylistData(url) {
    const response = await Spicetify.CosmosAsync.get(url);
    const { items, next } = response;
    return [...items, ...(next ? await fetchPlaylistData(next) : [])];
    } 
  
    async function addPlaylistIcons() {
    while (!Spicetify || !Spicetify.Platform || !Spicetify.CosmosAsync) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  
    const playlistList = await new Promise((resolve) => {
      const interval = setInterval(() => {
        const element = document.querySelector("#spicetify-playlist-list");
        if (element) {
          clearInterval(interval);
          resolve(element);
        }
      }, 100);
    });
    const playlistData = await fetchPlaylistData("https://api.spotify.com/v1/me/playlists?limit=50");
    const observer = new MutationObserver(async () => {
      observer.disconnect();
      await updatePlaylistList(playlistData);
      observer.observe(playlistList, { childList: true, subtree: true });
    });
  
    await updatePlaylistList(playlistData);
    observer.observe(playlistList, { childList: true, subtree: true });
    }
  
    async function updatePlaylistList(playlistData) {
    const playlistElements = await new Promise((resolve) => {
      const interval = setInterval(() => {
        const elements = document.querySelectorAll("#spicetify-playlist-list li a");
        if (elements.length > 0) {
          clearInterval(interval);
          resolve(Array.from(elements));
        }
      }, 100);
    });
  
    for (const element of playlistElements) {
      const [id] = element.href.split("/").slice(-1);
      const [type] = element.href.split("/").slice(-2, -1);
      let icon = cache.get(id);
      if (!icon) {
        switch (type) {
          case "playlist":
            const playlist = playlistData.find((p) => p.id === id);
            const image = playlist ? playlist.images[0] || {} : {};
            console.log("image:"+ image)
            
            icon = {
              src: image.url || "https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_music_note_2_24_filled.svg",
              size: "65px",
            };
            if (!image.url) {
              icon.size = "50px";
              }
            cache.set(id, icon);
            break;
          case "folder":
            icon = {
              src: "https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_folder_24_filled.svg",
              size: "65x",
            };
            cache.set(id, icon);
            break;
        }
      }
  
      if (icon.src) {
        element.style.backgroundImage = `url('${icon.src}')`;
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundSize = `${icon.size}`;
        element.style.backgroundPosition = "center";
      }
    }
  
  }
  addPlaylistIcons();
  
});
  
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--spice-text');
  if (textColor == " #000000") {
    document.documentElement.style.setProperty('--filter-brightness', 0);
  }

  var interval = setInterval(function () {
    if (
      typeof Spicetify.Platform == 'undefined' || (
        typeof Spicetify.Platform.Translations.play == 'undefined' &&
        typeof Spicetify.Platform.Translations.pause == 'undefined'
      )
    ) return;
    clearInterval(interval);
    var playButtonStyle = document.createElement('style');
    playButtonStyle.innerHTML = `
      .main-playButton-button[aria-label="${Spicetify.Platform.Translations.play}"],
      .main-playButton-PlayButton>button[aria-label~="${Spicetify.Platform.Translations.play}"],
      .main-playPauseButton-button[aria-label="${Spicetify.Platform.Translations.play}"],
      .main-trackList-rowPlayPauseButton[aria-label="${Spicetify.Platform.Translations.play}"] {
        background-color: var(--spice-text) !important;
        -webkit-mask-image: url('https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_play_24_filled.svg') !important;
      }
      .main-playButton-button[aria-label="${Spicetify.Platform.Translations.pause}"],
      .main-playButton-PlayButton>button[aria-label~="${Spicetify.Platform.Translations.pause}"],
      .main-playPauseButton-button[aria-label="${Spicetify.Platform.Translations.pause}"],
      .main-trackList-rowPlayPauseButton[aria-label="${Spicetify.Platform.Translations.pause}"] {
        background-color: var(--spice-text) !important;
        -webkit-mask-image: url('https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_pause_16_filled.svg') !important;
      }`;
    document.getElementsByTagName('head')[0].appendChild(playButtonStyle);
  }, 10)

  waitForElement([".progress-bar__slider"], () => {
    const sliders = document.getElementsByClassName("progress-bar__slider");
    for (const slider of sliders) {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      slider.appendChild(dot);
    }
  }, 10);

  waitForElement([".ExtraControls"], () => {
    const element = document.querySelector(".ExtraControls");
    element.addEventListener("click", () => {
      waitForElement([".npv-main-container .progress-bar__slider"], () => {
        const sliders = document.getElementsByClassName("npv-main-container")[0].getElementsByClassName("progress-bar__slider");
        for (const slider of sliders) {
          if (slider.dataset.dot === "true") { continue; }
          slider.dataset.dot = "true";
          const dot = document.createElement("div");
          dot.classList.add("slider-dot");
          slider.appendChild(dot);
        }
      }, 10)
    })
  }, 10);
})();
