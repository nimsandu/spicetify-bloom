<div align="center">
  <h1>Bloom</h1>
  
  [Spicetify](https://github.com/spicetify/spicetify-cli) theme inspired by Microsoft's [Fluent Design System](https://www.microsoft.com/design/fluent).  
  
  **Consider starring us and suggest stuff by submitting a comment!**
</div>

![main-cover](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/images/main-cover.png)

## First Look

### **Dark**

![dark](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/images/dark.png)

### **Light**

![light](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/images/light.png)

### **Dark Mono**

![darkmono](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/images/darkmono.png)
by [SunsetTechuila](https://github.com/SunsetTechuila)

### **Dark Green**

![darkgreen](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/images/darkgreen.png)
by [stpnwf](https://github.com/stpnwf)

### **Coffee**

![coffee](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/images/coffee.png)
by [yumegenso](https://github.com/yumegenso)

### **Comfy**

![comfy](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/images/comfy.png)

## Dependencies

- Latest version of [Spicetify](https://github.com/spicetify/spicetify-cli).
- Latest version of [Spotify](https://www.spotify.com/download).
- [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI) font family, comes pre-installed on Windows.
  - Segoe UI Variable download link for Linux/macOS/Windows 8-10 users: [click me](https://aka.ms/SegoeUIVariable)

## Troubleshooting

### Issues when installing from Spicetify Marketplace

```sh
spicetify config current_theme marketplace color_scheme marketplace
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify apply
```

### With the latest Spotify/Spicetify the theme is broken, some visual elements are missing, etc

Spotify releases updates very frequently, and when that happens, it's common for things to break. Generally, we'll be able to fix these issues, but there are certain issues that are out of our control. If you experience such an issue, please report them via the repository's issues page.

### There isn't any blur at all

Open Spotify settings and turn on `Enable hardware acceleration`.

### Some custom app on the left navbar has a wrong icon

Please report about that via the repository's issues page.

### Theme doesn't work correctly with Spotify version less than 1.2.23

In Spotify version 1.2.14, not only has the classic UI been cut, but also the indication that a new UI is active. Since it is now problematic to identify the active UI, only Library X support remains.
If you want to keep using the classic UI with Bloom - use the [legacy branch](https://github.com/nimsandu/spicetify-bloom/tree/legacy) (unsupported). Otherwise - update your Spotify or enable `Library X view` in the Spotify experimental settings.
In Spotify version 1.2.23 the main app grid has been revamped and the top bar has become part of the main view. Since it is problematic to support both grid variants, only the current variant support remains.

## Credits

- Based on [Fluent](https://github.com/williamckha/spicetify-fluent) by [williamckha](https://github.com/williamckha)  
- [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) by Microsoft Corporation  
- [Phosphor Icons](https://github.com/phosphor-icons/phosphor-icons) by Phosphor Icons

## Special Thanks

- Thomas Fitzpatrick [ohitstom](https://github.com/ohitstom) for implementing the new theme script feature
- Milky [Dilith-Dahanayake](https://github.com/Dilith-Dahanayake) for beta testing

### Long-term contributors

- Nam Anh [kyrie25](https://github.com/kyrie25)
- Beru Hinode [windowz414](https://github.com/windowz414)
- Grigory [SunsetTechuila](https://github.com/SunsetTechuila)

**And to every Contributor, Stargazer and Bloomer!**

## License

[MIT License](LICENSE)
