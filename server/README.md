
# Install and compile the server

Install postgresql 
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


Install all project dependencies 
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

