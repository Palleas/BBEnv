#!/bin/bash

echo "=============================="
echo "[         BUDDYBUILD         ]"
echo "=============================="
echo
echo "Here are the BUDDYBUILD environment variables available:"
echo

printenv | grep BUDDYBUILD_
