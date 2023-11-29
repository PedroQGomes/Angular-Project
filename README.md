# RedditApp

Full stack application of a Reddit clone made in **Typescript** with **React** for the frontend and for the BackEnd **Node Js** with a **Graphql Api** .

## Server 

### Install postgresql 
```
sudo apt install postgresql postgresql-contrib
```

```
sudo -u postgres psql
```

```
ALTER USER postgres PASSWORD 'postgres';
```

```
sudo -u postgres createdb lireddit2
```


### Install all project dependencies and run server
```
yarn install
```

To compile the tsc code into js code
```
yarn watch
```

To start the server in dev mod watching for code changes
```
yarn dev
```

To start the server
```
yarn start
```


### Install and compile the client

Install all project dependencies 
```
yarn dev
```
