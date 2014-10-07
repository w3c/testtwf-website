#!/bin/sh
set -e

echo $PWD
SHA=`git rev-parse HEAD`
cd $DESTINATION
echo $SHA
git status
git add --all .
git commit -m 'Updating to $SHA'
git push -q origin HEAD:$DESTINATION_BRANCH
