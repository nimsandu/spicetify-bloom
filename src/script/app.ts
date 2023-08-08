(async function bloom() {








  function fillCanvas(canvas) {
    const context = canvas.getContext('2d');
    const rootStyles = getComputedStyle(document.documentElement);
    const spiceRgbMain = rootStyles.getPropertyValue('--spice-rgb-main').split(',');
    context.fillStyle = `rgb(
      ${spiceRgbMain[0].trim()},
      ${spiceRgbMain[1]},
      ${spiceRgbMain[2]}
      )`;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }



  // fixes container shifting & active line clipping
  function updateLyricsPageProperties() {
    function calculateLyricsMaxWidth(textDirection, lyricsWrapper, lyricsContainer) {
      let offset;
      let maxWidth;

      if (textDirection === 'rtl') {
        offset =
          lyricsWrapper.offsetRight +
          parseInt(window.getComputedStyle(lyricsWrapper).marginRight, 10);
        maxWidth = Math.round(0.95 * (lyricsContainer.clientWidth - offset));
      } else {
        offset =
          lyricsWrapper.offsetLeft +
          parseInt(window.getComputedStyle(lyricsWrapper).marginLeft, 10);
        maxWidth = Math.round(0.95 * (lyricsContainer.clientWidth - offset));
      }

      return maxWidth;
    }

    function revealLyricsLines() {
      const lyricsLines = document.getElementsByClassName('lyrics-lyricsContent-lyric');
      let positionIndex = 0;

      for (let i = 0, max = lyricsLines.length; i < max; i += 1) {
        const { style } = lyricsLines[i];

        // stop if the lyrics has been already revealed
        if (style.animationName === 'reveal') {
          return;
        }

        if (lyricsLines[i].innerHTML !== '') {
          positionIndex += 1;
        }

        let animationDelay = 50 + positionIndex * 10;
        if (animationDelay > 1000) {
          animationDelay = 1000;
        }

        let animationDuration = 200 + positionIndex * 100;
        if (animationDuration > 1000) {
          animationDuration = 1000;
        }

        style.animationDelay = `${animationDelay}ms`;
        style.animationDuration = `${animationDuration}ms`;
        style.animationTimingFunction = 'ease';
        style.animationName = 'reveal';
      }
    }

    function setLyricsPageProperties() {
      waitForElements(['lyrics-lyrics-contentWrapper'], () => {
        const lyricsWrapper = document.getElementsByClassName('lyrics-lyrics-contentWrapper')[0];
        const lyricsContainer = document.getElementsByClassName(
          'lyrics-lyrics-contentContainer'
        )[0];
        const lyricsWrapperStyle = lyricsWrapper.style;

        lyricsWrapperStyle.maxWidth = '';
        lyricsWrapperStyle.width = '';

        const lyricsTextDirection = detectTextDirection();
        if (lyricsTextDirection === 'rtl') {
          document.documentElement.style.setProperty('--lyrics-text-direction', 'right');
        } else {
          document.documentElement.style.setProperty('--lyrics-text-direction', 'left');
        }

        const lyricsMaxWidth = calculateLyricsMaxWidth(
          lyricsTextDirection,
          lyricsWrapper,
          lyricsContainer
        );
        lyricsWrapperStyle.setProperty('--lyrics-active-max-width', `${lyricsMaxWidth}px`);

        const lyricsWrapperWidth = lyricsWrapper.getBoundingClientRect().width;
        lyricsWrapperStyle.maxWidth = `${lyricsWrapperWidth}px`;
        lyricsWrapperStyle.width = `${lyricsWrapperWidth}px`;
      });
    }

    function lyricsCallback(mutationsList) {
      mutationsList.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.classList?.contains('lyrics-lyricsContent-provider')) {
            setLyricsPageProperties();
            revealLyricsLines();
          }
        });
      });
    }

    waitForElements(['.lyrics-lyricsContent-provider'], () => {
      setLyricsPageProperties();
      revealLyricsLines();
    });

    // eslint-disable-next-line no-undef
    if (typeof lyricsObserver === 'undefined') {
      waitForElements(['.lyrics-lyrics-contentWrapper'], () => {
        const lyricsContentWrapper = document.getElementsByClassName(
          'lyrics-lyrics-contentWrapper'
        )[0];
        const lyricsObserver = new MutationObserver(lyricsCallback);
        const lyricsObserverConfig = { childList: true };
        lyricsObserver.observe(lyricsContentWrapper, lyricsObserverConfig);
      });
      // eslint-disable-next-line no-undef
    } else if (lyricsObserver == null) {
      // eslint-disable-next-line no-undef
      lyricsObserver.observe(lyricsContentWrapper, lyricsObserverConfig);
    }
  }

  const blur = 20;
  let previousAlbumUri;
  async function updateLyricsBackdrop() {
    async function calculateBrightnessCoefficient(image) {
      const fac = new FastAverageColor();

      // ignore colors darker than 50% by HSB, because 0.5 is the brightness threshold
      const averageColor = await fac.getColorAsync(image, {
        ignoredColor: [0, 0, 0, 255, 125],
      });

      fac.destroy();

      // slice(0, 3) - remove alpha channel value
      let brightness = Math.max(...averageColor.value.slice(0, 3));
      brightness = (brightness / 255).toFixed(1);

      return brightness > 0.5 ? 1 - (brightness - 0.5) : 1;
    }

    async function calculateSaturationCoefficient(originalImage, canvasImage) {
      function getSaturation(color) {
        const { value } = color;
        const max = Math.max(...value.slice(0, 3));
        const min = Math.min(...value.slice(0, 3));
        const delta = max - min;
        return max !== 0 ? delta / max : 0;
      }

      const fac = new FastAverageColor();

      const [averageOriginalColor, averageCanvasColor] = await Promise.all([
        fac.getColorAsync(originalImage, {
          ignoredColor: [0, 0, 0, 255, 10],
        }),
        fac.getColorAsync(canvasImage),
        { ignoredColor: [0, 0, 0, 255, 10] },
      ]);

      fac.destroy();

      const [averageOriginalSaturation, averageCanvasSaturation] = [
        getSaturation(averageOriginalColor),
        getSaturation(averageCanvasColor),
      ];

      let saturationCoefficient;

      if (averageCanvasSaturation < averageOriginalSaturation) {
        saturationCoefficient = averageOriginalSaturation / averageCanvasSaturation;
      } else {
        saturationCoefficient = 1;
      }

      const finalSaturation = (averageCanvasSaturation * saturationCoefficient).toFixed(1);

      if (finalSaturation > 0.8) {
        saturationCoefficient = 1 - (finalSaturation - 0.8);
      }

      if (finalSaturation < 0.5 && averageOriginalSaturation > 0.05) {
        saturationCoefficient += 0.5 - finalSaturation;
      }

      if (saturationCoefficient > 1.7) {
        saturationCoefficient = 1.7;
      }

      return saturationCoefficient.toFixed(1);
    }

    // necessary because backdrop edges become transparent due to blurring
    async function calculateContextDrawValues(canvas) {
      const drawWidth = canvas.width + blur * 2;
      const drawHeight = canvas.height + blur * 2;
      const drawX = 0 - blur;
      const drawY = 0 - blur;
      return [drawWidth, drawHeight, drawX, drawY];
    }

    async function getImageFromCanvas(canvas) {
      const image = new Image();
      image.src = canvas.toDataURL();
      return image;
    }

    async function updateFilters(canvas, image) {
      waitForAPIs(['FastAverageColor'], async () => {
        const canvasImage = await getImageFromCanvas(canvas);
        const [brightnessCoefficient, saturationCoefficient] = await Promise.all([
          calculateBrightnessCoefficient(canvasImage),
          calculateSaturationCoefficient(image, canvasImage),
        ]);
        // eslint-disable-next-line no-param-reassign
        canvas.style.filter = `saturate(${saturationCoefficient}) brightness(${brightnessCoefficient})`;
      });
    }

    waitForElements(['#lyrics-backdrop'], () => {
      if (previousAlbumUri === Spicetify.Player.data.track.metadata.album_uri) {
        updateLyricsPageProperties();
        return;
      }
      previousAlbumUri = Spicetify.Player.data.track.metadata.album_uri;

      const lyricsBackdropPrevious = document.getElementById('lyrics-backdrop');
      const contextPrevious = lyricsBackdropPrevious.getContext('2d');
      contextPrevious.globalCompositeOperation = 'destination-out';
      contextPrevious.filter = `blur(${blur}px)`;

      const lyricsBackdrop = document.createElement('canvas');
      lyricsBackdrop.id = 'lyrics-backdrop';
      fillCanvas(lyricsBackdrop);
      lyricsBackdropPrevious.insertAdjacentElement('beforebegin', lyricsBackdrop);
      const context = lyricsBackdrop.getContext('2d');
      context.imageSmoothingEnabled = false;
      context.filter = `blur(${blur}px)`;

      const lyricsBackdropImage = new Image();
      lyricsBackdropImage.src = Spicetify.Player.data.track.metadata.image_xlarge_url;

      lyricsBackdropImage.onload = async () => {
        const [drawWidth, drawHeight, drawX, drawY] = await calculateContextDrawValues(
          lyricsBackdrop
        );
        context.drawImage(lyricsBackdropImage, drawX, drawY, drawWidth, drawHeight);
        updateFilters(lyricsBackdrop, lyricsBackdropImage);

        const maxRadius = Math.ceil(
          Math.sqrt(lyricsBackdropPrevious.width ** 2 + lyricsBackdropPrevious.height ** 2) / 2
        );
        const centerX = lyricsBackdropPrevious.width / 2;
        const centerY = lyricsBackdropPrevious.height / 2;
        const radius = { value: 0 };

        waitForAPIs(['gsap'], () => {
          gsap.to(radius, {
            duration: 0.8,
            value: maxRadius,
            onUpdate: () => {
              contextPrevious.beginPath();
              contextPrevious.arc(centerX, centerY, radius.value, 0, Math.PI * 2);
              contextPrevious.closePath();
              contextPrevious.fill();
            },
            onComplete: () => {
              updateLyricsPageProperties();
              lyricsBackdropPrevious.remove();
            },
            ease: 'sine.out',
          });
        });
      };
    });
  }

  function initLyricsBackdrop() {
    waitForElements(['.under-main-view'], () => {
      const underMainView = document.querySelector('.under-main-view');
      const lyricsBackdropContainer = document.createElement('div');
      lyricsBackdropContainer.id = 'lyrics-backdrop-container';
      underMainView.prepend(lyricsBackdropContainer);

      const lyricsBackdrop = document.createElement('canvas');
      lyricsBackdrop.id = 'lyrics-backdrop';
      lyricsBackdropContainer.appendChild(lyricsBackdrop);

      fillCanvas(lyricsBackdrop);
      updateLyricsBackdrop();
    });
  }

  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--spice-text');
  if (textColor === ' #000000') {
    document.documentElement.style.setProperty('--filter-brightness', 0);
  }

  waitForElements(['.main-yourLibraryX-navLink'], () => {
    const navLinks = document.getElementsByClassName('main-yourLibraryX-navLink');
    for (let i = 0; i < navLinks.length; i += 1) {
      const div = document.createElement('div');
      div.classList.add('main-yourLibraryX-navLink-accent');
      navLinks[i].appendChild(div);
    }
  });

  waitForAPIs(['Spicetify.Panel'], () => {
    Spicetify.Panel.subPanelState(updateLyricsPageProperties);
  });

  Spicetify.Player.addEventListener('songchange', updateLyricsBackdrop);

  function onPageChange() {
    const lyricsBackdropContainer = document.getElementById('lyrics-backdrop-container');

    if (Spicetify.Platform.History.location.pathname.includes('lyrics')) {
      if (lyricsBackdropContainer == null) {
        initLyricsBackdrop();
      } else {
        lyricsBackdropContainer.style.display = 'unset';
        updateLyricsPageProperties();
      }
    } else {
      if (lyricsBackdropContainer != null) {
        lyricsBackdropContainer.style.display = 'none';
      }
      if (Spicetify.Platform.History.location.pathname === '/search') {
        addCategoryCardBackdrop();
      }
    }
  }

  function lyricsCinemaCallback(mutationsList) {
    const lyricsBackdropContainer = document.getElementById('lyrics-backdrop-container');
    const lyricsCinema = mutationsList[0].target;

    if (lyricsCinema.classList.contains('main-lyricsCinema-lyricsCinemaVisible')) {
      if (lyricsBackdropContainer == null) {
        initLyricsBackdrop();
      } else {
        lyricsBackdropContainer.style.display = 'unset';
        updateLyricsPageProperties();
      }
    } else if (
      lyricsBackdropContainer != null &&
      !Spicetify.Platform.History.location.pathname.includes('lyrics')
    ) {
      lyricsBackdropContainer.style.display = 'none';
    }
  }

  waitForAPIs(['Spicetify.Platform.History'], () => {
    Spicetify.Platform.History.listen(onPageChange);
    onPageChange();

    waitForElements(['.Root__lyrics-cinema'], () => {
      const lyricsCinema = document.getElementsByClassName('Root__lyrics-cinema')[0];
      const lyricsCinemaObserver = new MutationObserver(lyricsCinemaCallback);
      const lyricsCinemaObserverConfig = {
        attributes: true,
        attributeFilter: ['class'],
      };
      lyricsCinemaObserver.observe(lyricsCinema, lyricsCinemaObserverConfig);
    });
  });

  window.addEventListener('load', centerTopbar);

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

