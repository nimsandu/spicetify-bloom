#!/bin/bash

set -e

if [ -z "$(which spotify)" ]; then
    echo "Spotify isn't installed or doesn't exist in your PATH."
    echo "Bloom is a Spotify theme, and so it's an essential."
    echo "Please install Spotify (https://spotify.com/download) and run this script again to continue."
    echo "If Spotify is already installed, add it to your PATH variable and rerun this script."
    echo "Example command for adding to PATH: export PATH=~/spotify:\$PATH"
    echo -e "\nAbort!"
    # b/126
    exit 3
fi

if [ -z "$(which spicetify)" ]; then
    echo "Spicetify isn't installed or doesn't exist in your PATH."
    echo "Bloom relies on it to work properly."
    echo "Please install Spicetify (https://spicetify.app) and run this script again to continue."
    echo "If Spicetify is already installed, add it to your PATH variable and rerun this script."
    echo "Example command for adding to PATH: export PATH=/opt/spicetify:\$PATH"
    echo -e "\nAbort!"
    # Exit approach seems to work better.
    # b/126
    exit 1
fi

echo "Beginning installation of spicetify-bloom"
echo "https://github.com/nimsandu/spicetify-bloom"

printf "\nPress any key to continue or Ctrl+C to cancel"
read -sn1 < /dev/tty
printf "\n\n"

# Check if $spicePath\Themes\bloom directory exists
spicePath="$(dirname "$(spicetify -c)")"
themePath="$spicePath/Themes/bloom"
if [ -d "$themePath" ]; then
    rm -rf "$themePath"
fi

# Remove old extension
spicetify config extensions bloom.js- -q
extensionPath="$spicePath/Extensions/bloom.js"
if [[ -e "$extensionPath" || -h "$extensionPath" ]]; then
  rm "$spicePath/Extensions/bloom.js"
fi

# Download latest master
zipUri="https://github.com/nimsandu/spicetify-bloom/archive/refs/heads/master.zip"
zipSavePath=`mktemp`
zipExtractPath=`mktemp -d`
echo "Downloading bloom-spicetify latest master..."
curl --fail --location --progress-bar "$zipUri" --output "$zipSavePath"

# Extract theme from .zip file
echo "Extracting..."
unzip -oq "$zipSavePath" -d "$zipExtractPath" < /dev/tty
mv "$zipExtractPath/spicetify-bloom-main/src/" "$themePath"

# Delete .zip file
echo "Deleting zip file..."
rm "$zipSavePath" -rf "$zipExtractPath"

# Apply the theme with spicetify config calls
spicetify config current_theme bloom
spicetify config color_scheme dark
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
echo "+ Configured Bloom theme"

# Patch the xpui.js for sidebar fixes
# credit: https://github.com/JulienMaille/dribbblish-dynamic-theme/blob/main/install.sh
PATCH='[Patch]
xpui.js_find_8008 = ,(\\w+=)32,
xpui.js_repl_8008 = ,\${1}58,'
if cat "$spicePath/config-xpui.ini" | grep -o '\[Patch\]'; then
    perl -i -0777 -pe "s/\[Patch\].*?($|(\r*\n){2})/$PATCH\n\n/s" "$spicePath/config-xpui.ini"
else
    echo -e "\n$PATCH" >> "$spicePath/config-xpui.ini"
fi
echo "+ Patched xpui.js for Sidebar fixes"

# We need to do function approach instead apparently.
function recover_from_failure() {
    echo "\? Spicetify failed! Attempt to recover!"
    spicetify backup apply
    if [ $? != 0 ]; then
        echo "\! Still failing! See output for more info!"
        # b/126
        exit 2
    fi
}

spicetify apply
if [ $? != 0 ]; then
    recover_from_failure
fi
echo "+ Applied Theme"
