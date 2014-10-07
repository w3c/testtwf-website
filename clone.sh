#!/bin/sh
set -e

echo "Cloning GH repository"
echo $DESTINATION
echo $DESTINATION_BRANCH
echo https://$GIT_NAME@github.com/$USERNAME/$REPO.git
git clone -q https://$GIT_NAME:$GH_TOKEN@github.com/$USERNAME/$REPO.git $DESTINATION
ls $DESTINATION
cd $DESTINATION
git branch
git checkout $DESTINATION_BRANCH
git rev-parse master
git rev-parse origin/master
git rev-parse HEAD
echo "Clone succeeded"
