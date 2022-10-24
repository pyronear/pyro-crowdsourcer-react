#!/bin/bash

set -euo pipefail

which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
eval $(ssh-agent -s)
echo "$SERVER_PRIVATE_SSH_KEY" | tr -d '\r' | ssh-add - > /dev/null
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan $SERVER_IP >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts
