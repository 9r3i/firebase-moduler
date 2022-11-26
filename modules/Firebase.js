import { MFirebase } from "./MFirebase/MFirebase.js";

;function Firebase(config){
const _mfb=new MFirebase;
_mfb.config(config);
this.MFirebase=_mfb;
this.download=function(path,filename){
  const storage=new _mfb.Storage(path);
  return new Promise(resolve=>{
    storage.get(filename,e=>{
      resolve(e);
    });
  });
};
this.upload=function(path,filename,blob){
  const storage=new _mfb.Storage(path);
  return new Promise(resolve=>{
    storage.set(filename,blob,e=>{
      resolve(e);
    });
  });
};
this.get=function(table,key){
  const dbase=new _mfb.Database(table);
  return new Promise(resolve=>{
    dbase.get(key,e=>{
      resolve(e);
    });
  });
};
this.set=function(table,key,value){
  const dbase=new _mfb.Database(table);
  return new Promise(resolve=>{
    dbase.set(key,value,e=>{
      resolve(e);
    });
  });
};
this.login=function(uname,upass){
  const auth=new _mfb.Auth;
  return new Promise(resolve=>{
    auth.signIn(uname,upass,e=>{
      resolve(e);
    });
  });
};
this.logout=function(){
  const auth=new _mfb.Auth;
  return new Promise(resolve=>{
    auth.signOut(e=>{
      resolve(e);
    });
  });
};
};

export { Firebase };
