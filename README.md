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
  - Segoe UI Variable download link for Linux/macOS/Windows 10 users: [click me](https://aka.ms/SegoeUIVariable)

## Installation

### Spicetify Marketplace

Simply install [spicetify-marketplace](https://github.com/spicetify/spicetify-marketplace) by following it's
[installation instructions](https://github.com/spicetify/spicetify-marketplace/wiki/Installation). Then look for `Bloom` theme and click the install button.

### Scripts

#### Windows (Powershell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install/PowerShell/Bloom.ps1') }"
```

#### Linux/macOS (Bash)

```bash
curl -fsSL https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install/install.sh | bash
```

<details>
  <summary>Special script for Debian users</summary>
  <p>
    Replace `install.sh` in the above command with `install_debian.sh`. Spotify made a derp that it doesn't work on some Debian installations. Passing `--no-zygote` flag to it will fix this issue, which also means we also need to add it to launcher entry. `install_debian.sh` script's whole purpose is to run the `install.sh` as usual, then applying the fix. Issues about it are welcome!
  </p>
</details>

**credit for the Bash scripts: [windowz414](https://github.com/windowz414)**

### Manual Installation

Use this guide to install if you're having trouble using the shell commands/installation scripts:

1. Download this repo as [archive](https://codeload.github.com/nimsandu/spicetify-bloom/zip/refs/heads/main).
2. Navigate to the Spicetify's `Themes` directory. Use `spicetify path userdata` command to get the path.
3. In the directory, create a new folder called `Bloom`.
4. Open the downloaded repo archive, and move all of the files from the `src` subfolder to the `Bloom` folder you created.
5. Open a terminal/command prompt window and type the following commands:

   ```shell
    spicetify config current_theme Bloom color_scheme dark
    spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
    spicetify apply
    ```

## Customization

### Color Scheme

The `dark` color scheme is applied by default during the installation process. If you install Bloom via PowerShell the installed color scheme depends on your Windows settings.

The available color schemes are: `dark` `light` `darkmono` `darkgreen` `coffee` `comfy` . Apply one using the following commands:

```shell
spicetify config color_scheme <color scheme>
spicetify apply
```

If you installed Bloom from Marketplace you can change the color scheme on its page.

### Accent Color

1. Navigate to the Spicetify's `Themes` directory. Use `spicetify path userdata` command to get the path.
2. Open `Bloom` folder.
3. Edit your current color scheme in the `color.ini` file.
4. Use the `spicetify apply` command.

If you installed Bloom from Marketplace you can change the accent color using built-in `Color.ini Editor`.

## Updating

For those who used scripts and not Marketplace.

### Windows (PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install/PowerShell/Bloom.ps1') } -Action Update"
```

### Other OS

Use the [Bash installation script](#linuxmacos-bash) or [manually](#manual-installation) update the files.

## Uninstallation

For those who used scripts and not Marketplace.

### Automated (Windows PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install/PowerShell/Bloom.ps1') } -Action Uninstall"
```

### Manual Uninstallation

```shell
spicetify config color_scheme ' ' current_theme ' '
spicetify apply
```

**If you uninstall Bloom let us know how to shape our future!**

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

### Special Thanks

- Thomas Fitzpatrick [ohitstom](https://github.com/ohitstom) for implementing the new theme script feature
- Milky [Dilith-Dahanayake](https://github.com/Dilith-Dahanayake) for beta testing

### Long-term contributors

- Nam Anh [kyrie25](https://github.com/kyrie25)
- Beru Hinode [windowz414](https://github.com/windowz414)
- Grigory [SunsetTechuila](https://github.com/SunsetTechuila)

**And to every Contributor, Stargazer and Bloomer!**

## License

[MIT License](LICENSE)
