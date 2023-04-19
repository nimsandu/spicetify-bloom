/* global Spicetify, FastAverageColor */
(function bloom() {
  function waitForElement(els, func, timeout = 100) {
    const queries = els.map((el) => document.querySelector(el));
    if (queries.every((a) => a)) {
      func();
    } else if (timeout > 0) {
      setTimeout(waitForElement, 300, els, func, timeout - 1);
    }
  }

  waitForElement([
    '.main-rootlist-rootlistItem',
  ], () => {
    const mainRootlistWrapper = document.getElementsByClassName('main-rootlist-wrapper')[0];
    mainRootlistWrapper.style.height = `${mainRootlistWrapper.offsetHeight * 2}px`;
    const cache = new Map();

    async function fetchPlaylistData(url) {
      const response = await Spicetify.CosmosAsync.get(url);
      const { items, next } = response;
      return [...items, ...(next ? await fetchPlaylistData(next) : [])];
    }

    async function addPlaylistIcons() {
      while (!Spicetify || !Spicetify.Platform || !Spicetify.CosmosAsync) {
        // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      async function updatePlaylistList(playlistData) {
        const playlistElements = await new Promise((resolve) => {
          const interval = setInterval(() => {
            const elements = document.querySelectorAll('#spicetify-playlist-list li a');
            if (elements.length > 0) {
              clearInterval(interval);
              resolve(Array.from(elements));
            }
          }, 100);
        });

        for (let i = 0; i < playlistElements.length; i += 1) {
          const [id] = playlistElements[i].href.split('/').slice(-1);
          const [type] = playlistElements[i].href.split('/').slice(-2, -1);
          let icon = cache.get(id);
          if (!icon) {
            switch (type) {
              case 'playlist': {
                const playlist = playlistData.find((p) => p.id === id);
                const image = playlist ? playlist.images[0] || {} : {};
                icon = {
                  src: image.url || 'https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_music_note_2_24_filled.svg',
                  size: '50px',
                };
                if (!image.url) {
                  icon.size = '45px';
                }
                cache.set(id, icon);
                break;
              }

              case 'folder':
                icon = {
                  src: 'https://cdn.jsdelivr.net/gh/nimsandu/spicetify-bloom@master/assets/fluentui-system-icons/ic_fluent_folder_24_filled.svg',
                };
                icon.size = '45px';
                cache.set(id, icon);
                break;

              default:
                break;
            }
          }

          if (icon.src) {
            playlistElements[i].style.backgroundImage = `url('${icon.src}')`;
            playlistElements[i].style.backgroundRepeat = 'no-repeat';
            playlistElements[i].style.backgroundSize = `${icon.size}`;
            playlistElements[i].style.backgroundPosition = 'center';
          }
        }
      }

      const playlistList = await new Promise((resolve) => {
        const interval = setInterval(() => {
          const element = document.querySelector('#spicetify-playlist-list');
          if (element) {
            clearInterval(interval);
            resolve(element);
          }
        }, 100);
      });

      const playlistData = await fetchPlaylistData('https://api.spotify.com/v1/me/playlists?limit=50');
      const observer = new MutationObserver(async () => {
        observer.disconnect();
        await updatePlaylistList(playlistData);
        observer.observe(playlistList, { childList: true, subtree: true });
      });
      await updatePlaylistList(playlistData);
      observer.observe(playlistList, { childList: true, subtree: true });
    }

    addPlaylistIcons();
  });

  waitForElement(['.main-navBar-navBarLink'], () => {
    const navBarItems = document.getElementsByClassName('main-navBar-navBarLink');
    for (let i = 0; i < navBarItems.length; i += 1) {
      const div = document.createElement('div');
      div.classList.add('navBar-navBarLink-accent');
      navBarItems[i].appendChild(div);
    }
  });

  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--spice-text');
  if (textColor === ' #000000') {
    document.documentElement.style.setProperty('--filter-brightness', 0);
  }

  const interval = setInterval(() => {
    if (
      typeof Spicetify.Platform === 'undefined' || (
        typeof Spicetify.Platform.Translations.play === 'undefined'
        && typeof Spicetify.Platform.Translations.pause === 'undefined'
      )
    ) return;
    clearInterval(interval);
    const playButtonStyle = document.createElement('style');

    function cleanLabel(label) {
      const cleanedLabel = label.replace(/[{0}{1}«»”“]/g, '').trim();
      return cleanedLabel;
    }

    let playlistPlayLabel = Spicetify.Platform.Translations['playlist.a11y.play'];
    playlistPlayLabel = cleanLabel(playlistPlayLabel);
    let playlistPauseLabel = Spicetify.Platform.Translations['playlist.a11y.pause'];
    playlistPauseLabel = cleanLabel(playlistPauseLabel);

    const tracklistPlayLabel = Spicetify.Platform.Translations['tracklist.a11y.play'];
    let tracklistPlayLabelOne;
    let tracklistPlayLabelTwo;
    // eslint-disable-next-line no-underscore-dangle
    if (['zh-CN', 'zh-TW', 'am', 'fi'].includes(Spicetify.Locale._locale)) {
      [tracklistPlayLabelOne, tracklistPlayLabelTwo] = tracklistPlayLabel.split('{1}');
    } else {
      [tracklistPlayLabelOne, tracklistPlayLabelTwo] = tracklistPlayLabel.split('{0}');
    }
    tracklistPlayLabelOne = cleanLabel(tracklistPlayLabelOne);
    tracklistPlayLabelTwo = cleanLabel(tracklistPlayLabelTwo);

    playButtonStyle.innerHTML = `
      .main-playButton-button[aria-label*="${Spicetify.Platform.Translations.play}"],
      .main-playButton-PlayButton>button[aria-label*="${Spicetify.Platform.Translations.play}"],
      .main-playPauseButton-button[aria-label="${Spicetify.Platform.Translations.play}"],
      .main-playPauseButton-button[aria-label="${Spicetify.Platform.Translations['playback-control.play']}"],
      .main-trackList-rowPlayPauseButton[aria-label*="${Spicetify.Platform.Translations.play}"],
      .main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabelOne}"][aria-label*="${tracklistPlayLabelTwo}"],
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
  }, 10);

  let fac;

  function loadFastAverageColor() {
    const facScript = document.createElement('script');
    facScript.src = 'https://unpkg.com/fast-average-color/dist/index.browser.min.js';
    facScript.defer = true;
    facScript.type = 'text/javascript';

    document.body.appendChild(facScript);

    facScript.onload = () => {
      fac = new FastAverageColor();
    };
  }

  waitForElement(['body'], loadFastAverageColor);

  function calculateNormalizedBrightness(image) {
    if (!fac) {
      return 100;
    }

    const averageColor = fac.getColor(image);
    let brightness = Math.max(...averageColor.value);
    brightness = Math.round((brightness / 255) * 100);

    return brightness > 60 ? 100 - (brightness - 60) : 100;
  }

  function updateLyricsBackdrop() {
    waitForElement(['#lyrics-backdrop'], () => {
      const lyricsBackdrop = document.getElementById('lyrics-backdrop');
      const context = lyricsBackdrop.getContext('2d');

      const lyricsBackdropImage = new Image();
      lyricsBackdropImage.src = Spicetify.Player.data.track.metadata.image_xlarge_url;

      lyricsBackdropImage.onload = () => {
        const normalizedBrightness = calculateNormalizedBrightness(lyricsBackdropImage);
        context.filter = `blur(20px) brightness(${normalizedBrightness}%)`;

        const centerX = lyricsBackdrop.width / 2;
        const centerY = lyricsBackdrop.height / 2;
        let radius = 0;
        const aspectRatio = lyricsBackdrop.width / lyricsBackdrop.height;
        const maxRadius = Math.min(lyricsBackdrop.width, lyricsBackdrop.height) / 1.75;

        function animate() {
          if (radius >= maxRadius) {
            return;
          }

          const dx = centerX - radius * aspectRatio;
          const dy = centerY - radius;
          const dWidth = 2 * radius * aspectRatio;
          const dHeight = 2 * radius;

          context.drawImage(lyricsBackdropImage, dx, dy, dWidth, dHeight);

          radius += 2.5;
          requestAnimationFrame(animate);
        }
        animate();
      };
    }, 10);
  }

  function pbRightCallback() {
    let lyricsBackdrop = document.querySelector('#lyrics-backdrop');
    const lyricsButton = document.querySelector('.ZMXGDTbwxKJhbmEDZlYy');
    if (lyricsButton != null) {
      const lyricsActive = lyricsButton.getAttribute('data-active');
      if (lyricsActive === 'true') {
        if (lyricsBackdrop == null) {
          waitForElement(['.main-view-container__scroll-node > div.os-padding'], () => {
            const osPadding = document.querySelector('.main-view-container__scroll-node > div.os-padding');

            lyricsBackdrop = document.createElement('canvas');
            lyricsBackdrop.id = 'lyrics-backdrop';

            osPadding.parentNode.insertBefore(lyricsBackdrop, osPadding);

            updateLyricsBackdrop();
          }, 10);
        } else {
          lyricsBackdrop.style.visibility = 'visible';
        }
      } else if (lyricsBackdrop != null) {
        lyricsBackdrop.style.visibility = 'hidden';
      }
    } else if (lyricsBackdrop != null) {
      lyricsBackdrop.style.visibility = 'hidden';
    }
  }

  function lyricsCinemaCallback(mutationsList) {
    let lyricsBackdrop = document.querySelector('#lyrics-backdrop');
    const lyricsCinema = mutationsList[0].target;
    if (lyricsCinema.classList.contains('AptbKyUcObu7QQ1sxqgb')) {
      if (lyricsBackdrop == null) {
        waitForElement(['.main-view-container__scroll-node > div.os-padding'], () => {
          lyricsBackdrop = document.createElement('canvas');
          lyricsBackdrop.id = 'lyrics-backdrop';

          const container = document.querySelector('.y7xcnM6yyOOrMwI77d5t');
          lyricsCinema.insertBefore(lyricsBackdrop, container);

          updateLyricsBackdrop();
        }, 10);
      } else {
        lyricsBackdrop.style.visibility = 'visible';
      }
    } else if (lyricsBackdrop != null) {
      lyricsBackdrop.style.visibility = 'hidden';
    }
  }

  waitForElement(['.mwpJrmCgLlVkJVtWjlI1'], () => {
    const features = JSON.parse(localStorage.getItem('spicetify-exp-features'));
    const rightSidebarLyricsEnabled = features.enableRightSidebarLyrics.value;
    const rightSidebarEnabled = features.enableRightSidebar.value;
    if (rightSidebarLyricsEnabled === false || rightSidebarEnabled === false) {
      const pbRight = document.querySelector('.mwpJrmCgLlVkJVtWjlI1');
      const pbRightObserver = new MutationObserver(pbRightCallback);
      const pbRightObserverConfig = {
        attributes: true,
        childList: true,
        subtree: true,
      };
      pbRightObserver.observe(pbRight, pbRightObserverConfig);
    } else {
      const lyricsCinema = document.querySelector('.Root__lyrics-cinema');
      const lyricsCinemaObserver = new MutationObserver(lyricsCinemaCallback);
      const lyricsCinemaObserverConfig = {
        attributes: true,
        attributeFilter: ['class'],
        childList: false,
        subtree: false,
      };
      lyricsCinemaObserver.observe(lyricsCinema, lyricsCinemaObserverConfig);
    }
  }, 100);

  Spicetify.Player.addEventListener('songchange', updateLyricsBackdrop);

  waitForElement(['main'], () => {
    function mainCallback() {
      waitForElement(['.x-categoryCard-image'], () => {
        const cards = document.querySelectorAll('.x-categoryCard-CategoryCard');
        const cardImages = document.querySelectorAll('.x-categoryCard-image');
        for (let i = 0; i < cards.length; i += 1) {
          let cardBackdrop = cardImages[i].previousSibling;
          if (cardBackdrop == null) {
            cardBackdrop = document.createElement('div');
            cardBackdrop.classList.add('x-categoryCard-backdrop');
            cardBackdrop.style.backgroundImage = `url(${cardImages[i].src})`;
            cardBackdrop.style.backgroundColor = `${cards[i].style.backgroundColor}`;
            cardImages[i].parentNode.insertBefore(cardBackdrop, cardImages[i]);
          }
        }
      }, 10);
    }

    const mainElement = document.querySelector('main');
    const mainObserver = new MutationObserver(mainCallback);
    const mainObserverConfig = {
      attributes: true,
      attributeFilter: ['aria-label'],
      childList: false,
      subtree: false,
    };
    mainObserver.observe(mainElement, mainObserverConfig);
  }, 10);
}());
