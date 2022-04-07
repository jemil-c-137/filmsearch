# Filmsearch

link: https://filmsearch-web.herokuapp.com/

### TO START APPLICATION:

## Install dependencies and run _server_:

create a `.env` file in filmsearch/server directory and copy/past this text:

```
mongoUserName=******
mongoUserPassword=******
mongoDatabase=******
mongoCluster=*****
cloudinaryCloudName=******
cloudinaryApiKey==******
cloudinaryApiSecret==******
```

If you have mongodb database and cloudinary account replace _`******`_ with your keys, otherwise you can use my testing environment:

```
mongoUserName=filmsearchuser
mongoUserPassword=filmsearch123
mongoDatabase=filmsearch
mongoCluster=cluster0.bbltg.mongodb.net
cloudinaryCloudName=it-company-jem
cloudinaryApiKey=167748971964899
cloudinaryApiSecret=IQrIVG4O98sd5eLDTUNDO1jsIjs
```

(**Please do not fill it with an inappropriate content, respect other users 🙏**)

Now open a new terminal and run

```
cd server
npm install
npm start
```

The server will be running `localhost:4000/graphql`
You can navigate this address in browser and explore graphql playground

## Now you should start the _client_:

Open a new terminal and run

```
cd client
npm install
npm run dev
```

Open `localhost:3000` in the browser and start using the app
