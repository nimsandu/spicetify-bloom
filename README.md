<div align="center">
  <h1>Bloom</h1>

  [Spicetify](https://github.com/khanhas/spicetify-cli) theme inspired by Microsoft's [Fluent Design System](https://www.microsoft.com/design/fluent).  
  ### **Consider starring us, and suggest stuff by submitting a comment!**
</div>

<br>

![dark-1](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/bloom_cover.jpg)


<br>


![dark-1](https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/Dark-1.png)

<br>

## Dependencies

- [Spicetify](https://github.com/spicetify/spicetify-cli) version 2.11.1 or newer. Latest version recommended.
- [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI) font family, comes pre-installed on Windows Vista and newer.
  Segoe UI versions older than 5.37 (older than Windows 8.0) are not officially supported but may work.

## Automated Installation

### Windows (Powershell)

```powershell
Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install.ps1" | Invoke-Expression
```

### Linux/macOS (Bash)

```bash
curl -fsSL https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install.sh | sh
```

...or if you don't want to use shell commands, you can download the installation scripts within the repository.

### Spicetify Marketplace

You may also install the theme from the Spicetify Marketplace.
Simply install [spicetify-marketplace](https://github.com/spicetify/spicetify-marketplace) by following it's
installation instructions. Look for `Bloom` theme and install it.

## Manual Installation
Use this guide to install if you're having trouble using the shell commands/installation scripts.

### Step 1
- Download the theme [ZIP file](https://github.com/nimsandu/spicetify-bloom/archive/refs/heads/main.zip) via the GitHub repository page.

### Step 2
- Navigate to Spicetify's Theme directory.

| Platform            | Path                              |
| ------------------- | --------------------------------- |
| **Windows**         | `%appdata%\spicetify\Themes`      |
| **Linux**/**MacOS** | `~/.config/spicetify/Themes`      |

### Step 3
- In the directory, create a new folder called `Bloom`.

### Step 4
- Open the downloaded theme ZIP file, and extract the following files **highlighted in the screenshot below** to the Bloom folder you created.
![image](https://user-images.githubusercontent.com/51394649/186077104-ba2d5953-2746-407c-b30f-f854cbc6da21.png)

### Step 5
- Navigate to Spicetify's Extensions directory.

| Platform            | Path                              |
| ------------------- | --------------------------------- |
| **Windows**         | `%appdata%\spicetify\Extensions`      |
| **Linux**/**MacOS** | `~/.config/spicetify/Extensions`      |

### Step 6
- Go back to the downloaded ZIP file, and extract `bloom.js` to the Extensions directory.

### Step 7
- Open a terminal/command prompt window and type the following commands:
```bash
spicetify config current_theme Bloom
spicetify config color_scheme dark
spicetify config extensions bloom.js
```
...and then apply the theme by typing `spicetify apply`. And you should be done!

<br>

If you encounter any buggy artifacts after applying, type these following commands:
```sh
spicetify config inject_css 1
spicetify config replace_colors 1
spicetify config overwrite_assets 1
```
..then type `spicetify apply` to apply the theme.

## Important

For the sidebar playlists to show properly, ensure that these two lines are added in the Patch section of your `config-xpui.ini` file:

```ini
[Patch]
xpui.js_find_8008 = ,(\w+=)32,
xpui.js_repl_8008 = ,${1}56,
```

## Customization

The available color schemes are: `light` and `dark`. Apply one using the following commands:
```
spicetify config color_scheme <color scheme>
spicetify apply
```

### More Options

- You can change the accent color in the theme folder's color.ini file.  
- If you're using Windows, you can hide the window controls by adding the flag `--transparent-window-controls` after Spotify.exe in your Spotify shortcut.  

## Troubleshooting
<details>
  <summary><b>Experiencing issues after installing via Spicetify Marketplace?</b></summary>
<blockquote> If you're experiencing issues after installing the theme via the Spicetify Marketplace, reset it by going to the Spicetify Marketplace settings, then scroll all the way down until you see the "Reset Marketplace" button. After that, proceed to install the theme using the instation methods shown above. </blockquote>
</details>

<details>
  <summary><b>Theme is broken, some visual elements are missing, etc.</b></summary>
<blockquote> Spotify releases updates very frequently, and when that happens, it's common for things to break. Generally, we'll be able to fix these issues, but there are certain issues that are out of our control. If you experience such an issue, please report them via the repository's issues page.
</details>

<details>
  <summary><b>Uninstallation</b></summary>
  <blockquote>uninstallation
    
    
  1.  Restore spotify to original state
    ![image](https://user-images.githubusercontent.com/80559769/188782496-a38e4195-089d-4a73-80d7-eb7493db280e.png)
    
  2. Delete spicetify files in appdata. Local and roaming 
    ![image](https://user-images.githubusercontent.com/80559769/188782730-24c13c8a-3264-4fe9-808b-62b6beb0f7d7.png)
    ![image](https://user-images.githubusercontent.com/80559769/188782810-776ce017-de18-449d-b0b3-3523e3d02f45.png)

  3. Use powershell to install spicetify and bloom 
    ![image](https://user-images.githubusercontent.com/80559769/188782914-c5e9e66d-de83-4b83-9f35-f2b0d78a062b.png)

  4. Restart and apply to spotify
    ![image](https://user-images.githubusercontent.com/80559769/188783021-dd9e683a-c433-4d42-975a-e3c685d75f96.png)

#### credit [@Georgetheasian](https://github.com/Georgetheasian). for uninstallation guide

 </details>
 
## If you Uninstall BLOOM let us know why to shape our future

## Credits
- Based off [Fluent](https://github.com/williamckha/spicetify-fluent) by [williamckha](https://github.com/williamckha)  
- [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) by Microsoft Corporation  
- [Phosphor Icons](https://github.com/phosphor-icons/phosphor-icons) by Phosphor Icons

## License

[MIT License](LICENSE)
