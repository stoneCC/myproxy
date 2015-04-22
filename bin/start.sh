#!/bin/bash
nohup supervisor -w conf -e json bin/proxy.js &

