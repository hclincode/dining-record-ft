#!/usr/bin/bash

scriptDir=$(dirname "$(readlink -f $0)")
cd $scriptDir/..

npm run build && cp -rf build/* ~/html/
