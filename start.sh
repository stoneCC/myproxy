#!/bin/bash
nohup supervisor -w conf -e json bin/proxy.js &
nohup supervisor -w conf -e json server.js &
