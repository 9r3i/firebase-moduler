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

