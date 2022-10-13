let form=layui.form
let layer=layui.layer
axios.defaults.baseURL = 'http://www.liulongbin.top:3007';
form.verify({
    password: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      repassword:function(value){
        let pwd=document.querySelector('#pwd').value
        if(pwd!==value){
            return  '两次密码不同'
        }
      },
      yypwd:function(value){
       let mm= document.querySelector('[name="oldPwd"]').value
        if(value==mm){
            return  '新旧密码不能一样'

        }
        
    }
}
)
document.querySelector('form').addEventListener('submit',function(e){
    let data={}
    document.querySelectorAll('form input').forEach(item=>{
data[item.name]=item.value
    })
e.preventDefault()
 axios({
 transformRequest: [
 function(data) {
 let ret = '';
 for (let it in data) {
 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
     }
    return ret;
  }
  ],
 headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
  ,Authorization:localStorage.getItem('token')
},
 url:'/my/updatepwd',
method:'post',
    data,

   }).then(res=>{
 console.log(res)

 if(res.data.status==1){
layer.msg(res.data.message)
 }else{
layer.msg(res.data.message)
document.querySelector('form').reset()
 }
    });




})