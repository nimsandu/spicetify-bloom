#!/bin/bash

set -e

if [ -z "$(which spotify)" ]; then
    printf "\x1B[1;31m"
    echo "Spotify isn't installed or doesn't exist in your PATH."
    echo "Bloom is a Spotify theme, and so it's an essential."
    echo "Please install Spotify (https://spotify.com/download) and run this script again to continue."
    echo "If Spotify is already installed, add it to your PATH variable and rerun this script."
    echo "Example command for adding to PATH: export PATH=~/spotify:\$PATH"
    echo -e "\nAbort!"
    printf "\x1B[0m"
    # b/126
    exit 3
fi

if [ -z "$(which spicetify)" ]; then
    printf "\x1B[1;31m"
    echo "Spicetify isn't installed or doesn't exist in your PATH."
    echo "Bloom relies on it to work properly."
    echo "Please install Spicetify (https://spicetify.app) and run this script again to continue."
    echo "If Spicetify is already installed, add it to your PATH variable and rerun this script."
    echo "Example command for adding to PATH: export PATH=/opt/spicetify:\$PATH"
    echo -e "\nAbort!"
    printf "\x1B[0m"
    # Exit approach seems to work better.
    # b/126
    exit 1
fi

if [ -z "$(which mktemp)" ]; then
    printf "\x1B[1;31m"
    echo "mktemp isn't installed or doesn't exist in your PATH."
    echo "Mktemp is used to generate temporal paths to place the files, and so it's an essential."
    echo -e "\nAbort!"
    printf "\x1B[0m"
    # b/126
    exit 5
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

# Do we have dnf and spotify-client installed? (Fedora check)
# Also check if the spotify_path configuration is done or not
if [ ! -z "$(which dnf)" ] && [ ! -z "$(dnf list | grep spotify-client | grep command)" ] && [ -z "$(grep spotify_path ~/.config/spicetify/config-xpui.ini | sed 's/spotify_path.*= //')" ]; then
    sed -i '/spotify_path/ s/$/\/usr\/share\/spotify\-client/' ~/.config/spicetify/config-xpui.ini
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
rm -rf "$zipSavePath" "$zipExtractPath"

# Apply the theme with spicetify config calls
spicetify config current_theme bloom
spicetify config color_scheme dark
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
echo "+ Configured Bloom theme"

# Just straight up backup-apply, many users don't pre-configure their spicetify
spicetify backup apply
echo "+ Applied Theme"
