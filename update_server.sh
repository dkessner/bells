#!/bin/bash
#
# update_server.sh
#
# Darren Kessner
# Marlborough School
#

if [ "$(hostname)" != "ip-172-31-29-98" ]
then
    echo Wrong hostname: are you trying to update the wrong machine?
    exit 1
fi

mydir=$(dirname $(readlink -f $BASH_SOURCE))
pushd $mydir

if [ ! -f ./update_server.sh ]
then
    echo I am lost.
    exit 1
fi

echo "Ready to update server (press return)."
read

echo "Updating from repository."
git pull

if [ $? ]
then
    sudo cp -r . /var/www/html/bells
    echo "Website updated."
else
    echo "Something's wrong."
fi

