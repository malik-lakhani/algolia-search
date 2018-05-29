# Algolia Search Demo

The aim of this project is to understand the use of algolia with some cool examples. I have used `express` framework to demonstrate examples.

## Algolia Setup

* Create an account in [algolia](https://www.algolia.com/). (Trial account would be fine for this project)
* Create an index and uplod `users.json` file located at root of the project.
* Now go to the Display tab and mark `age`, `city`, `gender`, `street`, `name` as `Attributes for faceting`
and make them searchable too.
* Go to the `ranking` tab and add all fields as `searchable attributes`.
* Now you are ready to play with this project

## Prerequisites
* [Node.js >= 4.3.x/NPM](http://nodejs.org/download/)
* Algolia Account.

## Setup

Clone project

```
git clone ssh://git@192.168.1.5:2222/malik_lakhani/algolia-search.git
```

Install all dependencies

```
npm install
```

Create .env file

```
Create .env file. (reference from example.env)
```

Start Server

```
npm start
```

* Import `algolia.postman_collection.json` into Postman and access the APIs.