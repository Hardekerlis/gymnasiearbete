#!/usr/bin/env bash

cd "./mono/"
docker run -p 3000:3000 -t mono:latest
cd ".."
