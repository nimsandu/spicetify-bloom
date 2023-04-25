#!/usr/bin/bash

#
# Bloom theme for Debian and its derivatives
#
# Made with <3 by Beru "Stella" Hinode
#
# Copyright (C) Beru "Stella" Hinode (for Nimsandu Kottage)
#
# SPDX-License-Identifier: MIT
#

# Preliminary checks
echo "Checking your distribution as a safeguard..."
DISTRO_REL="$(grep '^ID=' /etc/os-release | sed 's/.*=//')"
# TODO: We really need to maintain a list for this and use it instead.
if [ -z "$DISTRO_REL" ]; then
    echo "Your distribution could not be determined."
    echo "Please check if you have /etc/os-release present."
    echo "If not, please see if there's a way to determine your distribution and open an issue."
    echo "This script is strictly for Debian and its derivatives, including Ubuntu and its derivatives."
    echo "If your distribution doesn't fall in this category this script was made for, please use generic installation instead."
    echo -e "\nAbort!"
    exit 3
elif [ "$DISTRO_REL" == "pardus" ]; then
    echo "Your distribution is Pardus, which is a derivative of Debian. Continue."
    echo -e "Distro author: TÜBİTAK ULAKBİLİM\n"
elif [ "$DISTRO_REL" == "linuxmint" ]; then
    echo "Your distribution is Linux Mint, which is a derivative of Debian. Continue."
    echo -e "Distro author: Linux Mark Institute\n"
elif [ "$DISTRO_REL" == "ubuntu" ]; then
    echo "Your distribution is Ubuntu, which is a derivative of Debian. Continue."
    echo -e "Distro author: Canonical\n"
elif [ "$DISTRO_REL" != "debian" ]; then
    echo "Your distribution doesn't seem to be Debian or its derivative."
    echo "If this is a mistake, please open a GitHub issue with the ID detected: $DISTRO_REL"
    echo -e "\nAbort!"
    exit -1
else
    echo "Your distribution is Debian. Continue."
    echo -e "Distro author: Software in the Public Interest, Inc.\n"
fi

# First, let's execute the main script as things are practically the
# same.
echo -e "Getting main script and running it...\n"
curl -fsSL https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install/install.sh | bash

# Let's see if an abortion occurred. If so, abort with it.
if [ $? != 0 ]; then
    exit $?
fi

# Now comes derp fixup.
echo -e "\nDebian derp! Spotify won't launch without this fix!"
echo "See: https://community.spotify.com/t5/Desktop-Linux/The-app-crashes-on-Debian-due-to-HW-acceleration/td-p/5049188"

# User might have already done the fix before on something else.
# Let's see if they really did.
FIXCHECK="$(grep '^Exec=' /usr/local/share/applications/spotify.desktop | grep '\-\-no-zygote')"
if [ ! -z "$FIXCHECK" ]; then
    # The user DID apply the fix, nothing to do.
    echo -e "\nYou already did apply the fix. Success!"
    exit 0
fi

echo "Now applying the fix suggested..."
# We need root access here because we can't write in /usr as regular
# user.
if [ "$USER" != "root" ]; then
    echo "Root access needed!"
    echo "Please enter your password so we can apply the fix properly!"
    # Doing exit here is safe, because it runs the command within
    # another shell, not on the shell this script is run within.
    sudo bash -c "exit"
fi

# We can do sudo even as root, no worries on that.
sudo sed -i '/^Exec=/ s/spotify/spotify --no-zygote/' /usr/local/share/applications/spotify.desktop
sudo sed -i '/^Exec=/ s/spotify/spotify --no-zygote/' /usr/share/applications/spotify.desktop
