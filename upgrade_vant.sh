#!/bin/bash

VANT_DIR="/Users/tianyu/vant-weapp"

cd "$VANT_DIR"
git checkout master
git pull origin master

cd -
cp -r $VANT_DIR/dist/* vant/
cd -
