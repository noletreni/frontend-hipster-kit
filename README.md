# KalJA - Kalasens Jättebra Anmälningssystem

Anmälningssystem för TF:s kalas.

Backend: https://github.com/noletreni/kalja-backend

Baserat på: https://github.com/FruitieX/frontend-hipster-kit

## Setup

[yarn](https://github.com/yarnpkg/yarn) 0.18+ must be present on your machine.

### Install dependencies
```
yarn
```

### Start

Run webpack-dev-server, get ready to code with hot reloading
```
yarn start
```

## Share

Share your localhost running app to anyone with an internet connection
```
yarn ngrok
```

### Build

Bundle your app. It will create `index.html`, `main.[hash].js`, `vendor.[hash].js` and `manifest.[hash].js`
```
yarn build
```

### Run your build
```
yarn prod
```

### Deploy

#### [Surge.sh](http://surge.sh)
```
surge ./dist -d subdomain.surge.sh
```

#### [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/)
```
mv dist docs
git add docs
git commit
git push upstream master
```

Then go to your repository, Settings -> Options -> Github Pages and select /docs folder

## Debugging

If you have not already done so, move to **Chrome** and install [react-developer-tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) & [redux-devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Thanks

* Thanks to [didierfranc](https://github.com/didierfranc),
  this template is based on his
  [redux-react-starter](https://github.com/didierfranc/redux-react-starter)
  template
