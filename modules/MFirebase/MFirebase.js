import {
  initializeApp,
} from "./9.6.3/firebase-app.js";
import {
  getAnalytics,
  setUserProperties,
} from "./9.6.3/firebase-analytics.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "./9.6.3/firebase-storage.js";
import {
  getDatabase,
  ref as dbRef,
  set as dbSet,
  get as dbGet,
  child as dbChild,
} from "./9.6.3/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "./9.6.3/firebase-auth.js";


/* primitive way */
function MFirebase(){
this.version='1.3.0';
const _mfirebase={
  initializeApp:initializeApp,
  getAnalytics:getAnalytics,
  setUserProperties:setUserProperties,
  getStorage:getStorage,
  getDatabase:getDatabase,
  getAuth:getAuth,
  firebaseApp:null,
  config:function(config){
    this.firebaseApp=this.initializeApp(config);
    return this.getAnalytics(this.firebaseApp);
  },
  user:null,
  Auth:null,
  DB:null,
  Storage:null,
};
/* firebase auth */
_mfirebase.Auth=function(){
this.resource={
  auth:_mfirebase.getAuth(_mfirebase.firebaseApp),
  createUser:createUserWithEmailAndPassword,
  signIn:signInWithEmailAndPassword,
  signOut:signOut,
  analytics:_mfirebase.getAnalytics(_mfirebase.firebaseApp),
  setUserProperties:setUserProperties,
};
this.createUser=function(email,password,cb){
  cb=typeof cb==='function'?cb:function(){};
  var auth=this.resource.auth;
  this.resource.createUser(auth,email,password).then(r=>{
    return cb(r);
  }).catch(e=>{
    return cb(e);
  });
};
this.updateUser=function(key,value){
  var anal=this.resource.analytics;
  return this.resource.setUserProperties(anal,{key:value});
};
this.signOut=function(cb){
  cb=typeof cb==='function'?cb:function(){};
  var auth=this.resource.auth;
  this.resource.signOut(auth).then(r=>{
    return cb(r);
  }).catch(e=>{
    return cb(e);
  });
};
this.signIn=function(email,password,cb){
  cb=typeof cb==='function'?cb:function(){};
  var auth=this.resource.auth;
  this.resource.signIn(auth,email,password).then(r=>{
    _mfirebase.user=r.user;
    return cb(r);
  }).catch(e=>{
    return cb(e);
  });
};
};
/* firebase database */
_mfirebase.Database=function(dbname){
this.dbname=typeof dbname==='string'?dbname:'unknown';
this.resource={
  db:_mfirebase.getDatabase(_mfirebase.firebaseApp),
  ref:dbRef,
  set:dbSet,
  get:dbGet,
  child:dbChild,
};
this.get=function(k,cb){
  cb=typeof cb==='function'?cb:function(){};
  var ref=this.resource.ref(this.resource.db),
  loc=this.dbname+'/'+k,
  trap=this.resource.child(ref,loc);
  this.resource.get(trap).then(r=>{
    return cb(r.exists()?JSON.parse(r.val()):null);
  }).catch(e=>{
    return cb(null);
  });
};
this.set=function(k,v,cb){
  cb=typeof cb==='function'?cb:function(){};
  var ref=this.resource.ref(this.resource.db,this.dbname+'/'+k);
  this.resource.set(ref,JSON.stringify(v)).then(r=>{
    return cb(true,r);
  }).catch(e=>{
    return cb(false,e);
  });
};
};
/* firebase storage */
_mfirebase.Storage=function(path){
this.path=typeof path==='string'?path:'unknown';
this.resource={
  storage:_mfirebase.getStorage(_mfirebase.firebaseApp),
  ref:ref,
  uploadString:uploadString,
  getDownloadURL:getDownloadURL,
  uploadBytes:uploadBytes,
};
this.get=function(f,cb){
  cb=typeof cb==='function'?cb:function(){};
  var ref=this.resource.ref(this.resource.storage,this.path+'/'+f);
  this.resource.getDownloadURL(ref).then(url=>{
    return cb(url);
  }).catch(e=>{
    return cb(false,e);
  });
};
this.set=function(f,c,cb){
  cb=typeof cb==='function'?cb:function(){};
  var ref=this.resource.ref(this.resource.storage,this.path+'/'+f);
  this.resource.uploadBytes(ref,c).then(cb).catch(cb);
};
/* set string;c=base64-data, md=meta-data, up=upload-progress */
this.setString=function(f,c,cb,md,up){
  cb=typeof cb==='function'?cb:function(){};
  up=typeof up==='function'?up:function(){};
  md=typeof md==='object'&&md!==null?md:{};
  var ref=this.resource.ref(this.resource.storage,this.path+'/'+f);
  this.resource.uploadString(ref,c,'data_url',md).then(r=>{
    r.on('state_changed',e=>{
      return up({
        loaded:e.bytesTransferred,
        total:e.totalBytes,
        type:'upload',
      });
    },e=>{
      return false;
    });
    return cb(true,r);
  }).catch(e=>{
    return cb(false,e);
  });
};
};
/* return the object */
return _mfirebase;
}; /* end of exports */


/* export */
export {
  MFirebase,
};
