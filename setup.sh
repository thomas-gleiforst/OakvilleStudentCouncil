#!/usr/bin/env bash

echo "STARTING SETUP"
npm instll -g yarn
cd Frontend
yarn install
cd ../
cd api
yarn install
echo "Dependencies installed for api, now set up your Postgre with the .sql file"

