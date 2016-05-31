# Dokumenta

A prototype build with [Neonode](https://empathia.github.io/neonode) to manage technical documents.

## Requirements

* Postgres
* Redis
* A Mailgun account

## Setup

* clone this repo
* run `npm install`
* run `createdb documenta_development`
* run `mv config/config.sample.js config/config.js`
* Edit `config.js`
* run `webpack -d`
* run `npm start`
