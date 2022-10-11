document.querySelector('#qzc').addEventListener('click',function(){

document.querySelector('.login-box').style.display='none'
document.querySelector('.zhuce-box').style.display='block'


})
document.querySelector('#qdl').addEventListener('click',function(){

    document.querySelector('.login-box').style.display='block'
    document.querySelector('.zhuce-box').style.display='none'

})
let layer=layui.layer

let form=layui.form
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      repwd:function(value){
      let pwd=  document.querySelector('#pwd').value
    if(pwd!==value){
        return'两次密码不一致'

    }  
    
    
    }

})


// 监听注册表单的提交事件
// $('#form_reg').on('submit', function(e) {
//     // 1. 阻止默认的提交行为
//     e.preventDefault()
//     // 2. 发起Ajax的POST请求
//     var data = {
//       username: $('#form_reg [name=username]').val(),
//       password: $('#form_reg [name=password]').val()
//     }
//     console.log(data)
//     $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
//       if (res.status !== 0) {
//         return layer.msg(res.message)
//       }
//       console.log(res)
//    layer.msg('注册成功，请登录！')
//       // 模拟人的点击行为
//       $('#link_login').click()
//     })
//   })

axios.defaults.baseURL = 'http://www.liulongbin.top:3007';

document.querySelector('#form_reg').addEventListener('submit',function(e)
{

e.preventDefault()
let data={
  username:document.querySelector('#usn').value,
  password:document.querySelector('#pwd').value
}



 axios({//转换数据的方法

transformRequest: [
  function(data) {
      let ret = '';
      for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
  }
],
//设置请求头
headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
}



,

 url:'/api/reguser',
method:'post',
    data,

   }).then(res=>{
 console.log(res)
if(res.data.status==0){
  document.querySelector('#qdl').click()
layer.msg(res.data.message);

}else{
  return layer.msg(res.data.message);
}


 
    });





})


  document.querySelector('.layui-form').addEventListener('submit',function(e){
    e.preventDefault()
    let data={
    username:document.querySelector('#form_login [name=username]').value,
    password:document.querySelector('#form_login [name=password]').value
    
    }
    
    
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
    },
     url:'/api/login',
    method:'post',
        data,
    
       }).then(res=>{
     console.log(res)
    if(!res.data.status==0){
    layer.msg(res.data.message)
    }else{
      layer.msg(res.data.message)
      //如果登录成功就存到本地一个token
      localStorage.setItem('token',res.data.token)
      location.href='./index.html'
    }
    
    
        });
    
    
    
    })


//登录的请求
