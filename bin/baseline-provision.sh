#!/bin/bash
sudo apt-get update
sudo apt-get install build-essential git python libssl-dev fontconfig libfreetype6 -y

if [ ! -d /tmp/src/node ]; then
    mkdir -p /tmp/src
    cd /tmp/src/
    git clone git://github.com/joyent/node.git
fi

# always update the business
cd /tmp/src/node
git fetch

# most recent tag in the 0.10.x series
TAG=`git tag -l | grep v0.10. | sort -t. -k 1,1n -k 2,2n -k 3,3n -k 4,4n | tail -1`
git checkout $TAG

# build it
./configure
make
sudo make install

# set up node stuff
cd /vagrant

# these install best globally
sudo npm install -g grunt-cli phantomjs

# windows ruins it for everyone
# http://www.conroyp.com/2013/04/13/symlink-shenanigans-nodejs-npm-express-vagrant/
npm install --no-bin-link