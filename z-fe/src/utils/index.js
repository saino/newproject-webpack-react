import $ from 'jquery'
export function getUserInfo() {
    const userStr=localStorage.getItem('user')
    if(userStr){
        return JSON.parse(userStr)
    }
    return undefined
}
export function setUserInfo(user) {
    debugger;
    if(user){
        localStorage.setItem('user',JSON.stringify(user))
    }else{
        localStorage.removeItem('user')
    }

}
export function getServerJson(opt) {
    var user=getUserInfo();
    var header;
    if(user){
        header={
            loginToken:user.loginToken,
            userID:user.id
        }
    }
    if(header){
        $.ajax(Object.assign({type:"GET",dataType:'json'},opt,{headers:header}))
    }else{
        $.ajax(Object.assign({type:"GET",dataType:'json'},opt))
    }

}
export function postInfo(opt) {
    var user=getUserInfo();
    var header;
    if(user){
        header={
            'logintoken':user.loginToken,
            'userID':user.id
        }
    }
    // var tmp=
    if(header){
        $.ajax(Object.assign({type:"POST",dataType:'json'},opt,{headers:header}))
    }else{
        $.ajax(Object.assign({type:"POST",dataType:'json'},opt))
    }
}
export function removeEntity(opt) {
    var user=getUserInfo();
    var header;
    if(user){
        header={
            'logintoken':user.loginToken,
            'userID':user.id
        }
    }
    // var tmp=
    if(header){
        $.ajax(Object.assign({type:"DELETE",dataType:'json'},opt,{headers:header}))
    }else{
        opt.error("没有登录")
    }
}