#!/bin/bash
sudo echo "Deploying at $(date)" >> /var/log/deploy.log
sudo docker pull bwhite14/bwhiterepo:my-website
sudo docker compose -f /home/ubuntu/app/docker-compose.yml up -d