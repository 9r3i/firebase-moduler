
[![Author](https://img.shields.io/badge/author-9r3i-lightgrey.svg)](https://github.com/9r3i)
[![License](https://img.shields.io/github/license/9r3i/firebase-moduler.svg)](https://github.com/9r3i/firebase-moduler/blob/master/license.txt)
[![Forks](https://img.shields.io/github/forks/9r3i/firebase-moduler.svg)](https://github.com/9r3i/firebase-moduler/network)
[![Stars](https://img.shields.io/github/stars/9r3i/firebase-moduler.svg)](https://github.com/9r3i/firebase-moduler/stargazers)
[![Issues](https://img.shields.io/github/issues/9r3i/firebase-moduler.svg)](https://github.com/9r3i/firebase-moduler/issues)
[![Release](https://img.shields.io/github/release/9r3i/firebase-moduler.svg)](https://github.com/9r3i/firebase-moduler/releases)
[![Package](https://img.shields.io/npm/v/firebase-moduler.svg?label=npm)](https://www.npmjs.com/package/firebase-moduler)
[![Donate](https://img.shields.io/badge/donate-paypal-orange.svg)](https://paypal.me/9r3i)


# firebase-moduler
Module for Firebase Web SDK


# Web Usage
```html
<script type="module" src="modules/moduler.js"></script>
```

# Testing (index.js)

```js
async function index(){

/* initialize */
const fb=new Firebase(config());
pre(fb);

/* login and logout */
const log=await fb.login('email@gmail.com','password');
//await fb.logout();
pre(log);

/* database set and get */
const post={
  id:100,
  title:'test posting lagi',
  content:'test content lagi',
  time:(new Date).getTime(),
};
const ins=await fb.set('posts',post.id,post);
pre(ins);

const sel=await fb.get('posts',post.id);
pre(sel);

/* storage upload and download */
const uid='<user_id>',
input=document.createElement('input');
input.type='file';
document.body.appendChild(input);

const dl=await fb.download('pictures',uid+'.png');
const img=new Image;
img.src=dl;
img.style.maxWidth='300px';
document.body.appendChild(img);
pre(dl);

input.onchange=async function(e){
  const up=await fb.upload('pictures',uid+'.png',this.files[0]);
  pre(up);
};
}

function config(){
  return {
    apiKey: "__API_KEY__",
    authDomain: "<your_app>.firebaseapp.com",
    databaseURL: "https://<your_app>-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "<your_app>",
    storageBucket: "<your_app>.appspot.com",
    messagingSenderId: "<your_app_sender_id>",
    appId: "<your_app_id>",
    measurementId: "<your_app_measurement_id>"
 };
}

function pre(s,l){
  console.log(s,l);
}

```

