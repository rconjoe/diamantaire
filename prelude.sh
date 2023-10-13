#!/usr/bin/env bash

set -euo pipefail

export NX_LIST="../node_modules/.bin/nx"

fail() {
    whiptail --title "Error" --msgbox "$1" 8 78
    exit 1
}

alert() {
  whiptail --title "Alert" --msgbox "$1" 8 78
}

os_detection() {
    OS=$(uname -s)
    if [ "$OS" = "Linux" ]; then
        whiptail --title "OS Detection" --msgbox "You are using Linux." 8 78
    elif [ "$OS" = "Darwin" ]; then
        whiptail --title "OS Detection" --msgbox "You are using macOS." 8 78
    else
        whiptail --title "OS Detection" --msgbox "Your OS is not recognized." 8 78
    fi
}

yn_prompt() {
  if (whiptail --title "Yes/No Prompt" --yesno "Are you sure?" 8 78); then
    echo "User selected Yes."
  else
    echo "User selected No."
  fi
}

input_prompt() {
    USER_INPUT=$(whiptail --title "Input Prompt" --inputbox "What is your name?" 8 78 3>&1 1>&2 2>&3)
    exitstatus=$?
    if [ $exitstatus = 0 ]; then
        echo "User entered: $USER_INPUT"
    else
        echo "User chose Cancel."
    fi
}

password_prompt() {
    PASSWORD=$(whiptail --title "Password Prompt" --passwordbox "Enter your password" 8 78 3>&1 1>&2 2>&3)
    exitstatus=$?
    if [ $exitstatus = 0 ]; then
        echo "User entered: $PASSWORD"
    else
        echo "User chose Cancel."
    fi
}

menu() {
    OPTION=$(whiptail --title "Menu" --menu "Choose an option" 15 60 4 \
    "1" "Option 1" \
    "2" "Option 2" \
    "3" "Option 3" 3>&1 1>&2 2>&3)

    exitstatus=$?
    if [ $exitstatus = 0 ]; then
        echo "User chose: $OPTION"
    else
        echo "User chose Cancel."
    fi
}

export -f fail alert os_detection yn_prompt input_prompt password_prompt menu

