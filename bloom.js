(function bloom() {

  function waitForElement(els, func, timeout = 100) {
    const queries = els.map(el => document.querySelector(el));
    if (queries.every(a => a)) {
      func();
    } else if (timeout > 0) {
      setTimeout(waitForElement, 300, els, func, timeout-1);
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
              size: "50px",
            };
            if (!image.url) {
              icon.size = "45px";
              }
            cache.set(id, icon);
            break;
          case "folder":
            icon = {
              src: "https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_folder_24_filled.svg",
            };
            icon.size = "45px";
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

  waitForElement([
    ".main-navBar-navBarLink",
    "[href='/collection'] > span"
  ], () => {
    const navBarItems = document.getElementsByClassName("main-navBar-navBarLink");
    for (const item of navBarItems) {
      let div = document.createElement("div");
      div.classList.add("navBar-navBarLink-accent");
      item.appendChild(div);
    }
    document.querySelector("[href='/collection'] > span").innerHTML = "Library";
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

    function cleanLabel (label) {
      label = label.replace(/[{0}{1}«»”“]/g, '').trim();
      return label;
    }

    var playlistPlayLabel = Spicetify.Platform.Translations['playlist.a11y.play'];
    playlistPlayLabel = cleanLabel(playlistPlayLabel);
    var playlistPauseLabel = Spicetify.Platform.Translations['playlist.a11y.pause'];
    playlistPauseLabel = cleanLabel(playlistPauseLabel);

    var tracklistPlayLabel = Spicetify.Platform.Translations['tracklist.a11y.play'];
    if (["zh-CN", "zh-TW", "am", "fi"].includes(Spicetify.Locale._locale)) {
      var tracklistPlayLabel_1 = tracklistPlayLabel.split("{1}")[0];
      var tracklistPlayLabel_2 = tracklistPlayLabel.split("{1}")[1];
    } else {
      var tracklistPlayLabel_1 = tracklistPlayLabel.split("{0}")[0];
      var tracklistPlayLabel_2 = tracklistPlayLabel.split("{0}")[1];
    }
    tracklistPlayLabel_1 = cleanLabel(tracklistPlayLabel_1);
    tracklistPlayLabel_2 = cleanLabel(tracklistPlayLabel_2);

    playButtonStyle.innerHTML = `
      .main-playButton-button[aria-label*="${Spicetify.Platform.Translations.play}"],
      .main-playButton-PlayButton>button[aria-label*="${Spicetify.Platform.Translations.play}"],
      .main-playPauseButton-button[aria-label="${Spicetify.Platform.Translations.play}"],
      .main-playPauseButton-button[aria-label="${Spicetify.Platform.Translations['playback-control.play']}"],
      .main-trackList-rowPlayPauseButton[aria-label*="${Spicetify.Platform.Translations.play}"],
      .main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabel_1}"][aria-label*="${tracklistPlayLabel_2}"],
      .main-playButton-PlayButton>button[aria-label*="${playlistPlayLabel}"] {
        background-color: var(--spice-text) !important;
        -webkit-mask-image: url('https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_play_24_filled.svg') !important;
      }
      .main-playButton-button[aria-label*="${Spicetify.Platform.Translations.pause}"],
      .main-playButton-PlayButton>button[aria-label*="${Spicetify.Platform.Translations.pause}"],
      .main-playPauseButton-button[aria-label*="${Spicetify.Platform.Translations.pause}"],
      .main-playPauseButton-button[aria-label="${Spicetify.Platform.Translations['playback-control.pause']}"],
      .main-trackList-rowPlayPauseButton[aria-label*="${Spicetify.Platform.Translations.pause}"],
      .main-trackList-rowImagePlayButton[aria-label*="${Spicetify.Platform.Translations.pause}"],
      .main-playButton-PlayButton>button[aria-label*="${playlistPauseLabel}"] {
        background-color: var(--spice-text) !important;
        -webkit-mask-image: url('https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_pause_16_filled.svg') !important;
      }`;
    document.getElementsByTagName('head')[0].appendChild(playButtonStyle);
  }, 10)

  function updateLyricsBackdrop () {
    waitForElement(["#lyrics-backdrop"], () => {
      const lyricsBackdrop = document.getElementById("lyrics-backdrop")
      const context = lyricsBackdrop.getContext("2d")

      const lyricsBackdropImage = new Image()
      lyricsBackdropImage.src = Spicetify.Player.data.track.metadata.image_xlarge_url

      lyricsBackdropImage.onload = () => {
        context.filter = "blur(20px)"
        const centerX = lyricsBackdrop.width / 2
        const centerY = lyricsBackdrop.height / 2
        let radius = 0
        const aspectRatio = lyricsBackdrop.width / lyricsBackdrop.height
        const maxRadius = Math.min(lyricsBackdrop.width, lyricsBackdrop.height) / 1.75
        function animate () {
          if (radius >= maxRadius) {
            return
          }
          context.drawImage(lyricsBackdropImage, centerX - radius * aspectRatio, centerY - radius, 2 * radius * aspectRatio, 2 * radius)
          radius += 2.5
          requestAnimationFrame(animate)
        }
        animate()
      }
    }, 10)
  }

  let activeLine

  function setActiveLine () {
    waitForElement([".lyrics-lyricsContent-lyric"], () => {
      activeLine = document.querySelector(".lyrics-lyricsContent-active")
      if (activeLine == null) {
        activeLine = document.querySelectorAll(".lyrics-lyricsContent-lyric")
        activeLine = activeLine[0]
      }
    }, 10)
  }

  function lyricsCallback (mutationsList, lyricsObserver) {
    for (const mutation of mutationsList) {
      if (mutation.target.className.includes("lyrics-lyricsContent-active") && mutation.target !== activeLine) {
        const previousActiveLine = activeLine
        activeLine = mutation.target
        previousActiveLine.classList.toggle("previous")
      } else if (Spicetify.Player.getProgress() < 200) {
        setActiveLine()
      }
    }
  }

  const lyricsObserver = new MutationObserver(lyricsCallback)

  function pbRightCallback (mutationsList, pbRightObserver) {
    let lyricsBackdrop = document.querySelector("#lyrics-backdrop")
    const lyricsButton = document.querySelector(".ZMXGDTbwxKJhbmEDZlYy")
    if (lyricsButton != null) {
      const lyricsActive = lyricsButton.getAttribute("data-active")
      if (lyricsActive === "true") {
        waitForElement([".lyrics-lyrics-container"], () => {
          const lyricsContainer = document.querySelector(".lyrics-lyrics-container")

          const lyricsObserverConfig = {
            attributes: true,
            attributeFilter: ["class"],
            childList: true,
            subtree: true
          }

          setActiveLine()

          lyricsObserver.observe(lyricsContainer, lyricsObserverConfig)
        }, 10)

        if (lyricsBackdrop == null) {
          waitForElement([".main-view-container__scroll-node > div.os-padding"], () => {
            const osPadding = document.querySelector(".main-view-container__scroll-node > div.os-padding")

            lyricsBackdrop = document.createElement("canvas")
            lyricsBackdrop.id = "lyrics-backdrop"

            osPadding.parentNode.insertBefore(lyricsBackdrop, osPadding)

            updateLyricsBackdrop()
          }, 10)
        } else {
          lyricsBackdrop.style.visibility = "visible"
        }
      } else if (lyricsBackdrop != null) {
        lyricsObserver.disconnect()
        lyricsBackdrop.style.visibility = "hidden"
      }
    } else if (lyricsBackdrop != null) {
      lyricsObserver.disconnect()
      lyricsBackdrop.style.visibility = "hidden"
    }
  }

  function lyricsCinemaCallback (mutationsList, lyricsCinemaObserver) {
    let lyricsBackdrop = document.querySelector("#lyrics-backdrop")
    const lyricsCinema = mutationsList[0].target
    if (lyricsCinema.classList.contains("AptbKyUcObu7QQ1sxqgb")) {
      waitForElement([".lyrics-lyrics-container"], () => {
        const lyricsContainer = document.querySelector(".lyrics-lyrics-container")

        const lyricsObserverConfig = {
          attributes: true,
          attributeFilter: ["class"],
          childList: true,
          subtree: true
        }

        setActiveLine()

        lyricsObserver.observe(lyricsContainer, lyricsObserverConfig)
      }, 10)

      if (lyricsBackdrop == null) {
        waitForElement([".main-view-container__scroll-node > div.os-padding"], () => {
          lyricsBackdrop = document.createElement("canvas")
          lyricsBackdrop.id = "lyrics-backdrop"

          const container = document.querySelector(".y7xcnM6yyOOrMwI77d5t")
          lyricsCinema.insertBefore(lyricsBackdrop, container)

          updateLyricsBackdrop()
        }, 10)
      } else {
        lyricsBackdrop.style.visibility = "visible"
      }
    } else if (lyricsBackdrop != null) {
      lyricsObserver.disconnect()
      lyricsBackdrop.style.visibility = "hidden"
    }
  }

  waitForElement([".mwpJrmCgLlVkJVtWjlI1"], () => {
    const features = JSON.parse(localStorage.getItem("spicetify-exp-features"))
    if (features.enableRightSidebarLyrics.value === false || features.enableRightSidebar.value === false) {
      const pbRight = document.querySelector(".mwpJrmCgLlVkJVtWjlI1")
      const pbRightObserver = new MutationObserver(pbRightCallback)
      const pbRightObserverConfig = {
        attributes: true,
        childList: true,
        subtree: true
      }
      pbRightObserver.observe(pbRight, pbRightObserverConfig)
    } else {
      const lyricsCinema = document.querySelector(".Root__lyrics-cinema")
      const lyricsCinemaObserver = new MutationObserver(lyricsCinemaCallback)
      const lyricsCinemaObserverConfig = {
        attributes: true,
        attributeFilter: ["class"],
        childList: false,
        subtree: false
      }
      lyricsCinemaObserver.observe(lyricsCinema, lyricsCinemaObserverConfig)
    }
  }, 100)

  Spicetify.Player.addEventListener("songchange", updateLyricsBackdrop)

  waitForElement(["main"], () => {
    const mainElement = document.querySelector("main")

    const mainObserver = new MutationObserver(mainCallback)
    const mainObserverConfig = {
      attributes: true,
      attributeFilter: ["aria-label"],
      childList: false
    }
    mainObserver.observe(mainElement, mainObserverConfig)

    function mainCallback (mutationsList, mainObserver) {
      waitForElement([".x-categoryCard-image"], () => {
        const cards = document.querySelectorAll(".x-categoryCard-CategoryCard")
        const cardImages = document.querySelectorAll(".x-categoryCard-image")
        for (let i = 0; i < cards.length; i++) {
          let cardBackdrop = cardImages[i].previousSibling
          if (cardBackdrop == null) {
            cardBackdrop = document.createElement("div")
            cardBackdrop.classList.add("x-categoryCard-backdrop")
            cardBackdrop.style.backgroundImage = `url(${cardImages[i].src})`
            cardBackdrop.style.backgroundColor = `${cards[i].style.backgroundColor}`
            cardImages[i].parentNode.insertBefore(cardBackdrop, cardImages[i])
          }
        }
      }, 10)
    }
  }, 10)
})()
