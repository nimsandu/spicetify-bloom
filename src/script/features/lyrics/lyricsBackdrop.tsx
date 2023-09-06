import { gsap } from "gsap";
import React from "react";

export default class lyricsBackdrop extends React.Component {
public static blurValue:number;

public static saturation:number;

public static brightness:number;

protected static _previousAlbumUri:string;

async updateLyricsBackdrop() {


  }


// necessary because backdrop edges become transparent due to blurring


  async updateFilters(canvas, image) {
      const [brightnessCoefficient, saturationCoefficient] = await Promise.all([
        calculateBrightnessCoefficient(canvas),
        calculateSaturationCoefficient(image, canvas),
      ]);
      // eslint-disable-next-line no-param-reassign
      canvas.style.filter = `saturate(${saturationCoefficient}) brightness(${brightnessCoefficient})`;

  }

  waitForElements(['#lyrics-backdrop'], () => {
    if (previousAlbumUri === Spicetify.Player.data.track.metadata.album_uri) {
      updateLyricsPageProperties();
      return;
    }
    previousAlbumUri = Spicetify.Player.data.track.metadata.album_uri;



    };
  });
}

 initLyricsBackdrop() {
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


}
