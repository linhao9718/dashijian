;(function(){
  getUserInfo()

  
//获取用户的信息

















let layer=layui.layer


document.querySelector('#tc').addEventListener('click',function(){

//eg1
layer.confirm('您是否要退出', {icon: 3, title:'提示'}, function(index){
    //do something



location.href='./login.html'

localStorage.removeItem('token')

    layer.close(index);
  });
 



})


})()

function getUserInfo(){
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.baseURL = 'http://www.liulongbin.top:3007';




  axios({
    url:'/my/userinfo',
   method:'get',
   // headers:{Authorization:localStorage.getItem('token')||''}
      }).then(res=>{
    console.log(res)
   
   
   if(res.data.status==0){
   xuanran(res)
   
   
   }
   
       })
   
}
function xuanran(res){
    console.log(res)
  let name=res.data.data.nickname||dres.data.data.username
  console.log(name)

  document.querySelector('.wilcome').innerText=`欢迎 ${name}`
  if(res.data.data.user_pic==null){
  //如果为空渲染字体头像
  
  let namePIC=name[0].toUpperCase();
  document.querySelector('.userinfo .layui-nav-img').style.display='none'
  document.querySelector('.layui-nav-item .layui-nav-img').style.display='none'
  
  document.querySelector('.userinfo .txone').innerText=namePIC
  document.querySelector('.layui-nav-item  .txone').innerText=namePIC
  
  }else{
  //渲染图片头像
  document.querySelector('.userinfo .txone').style.display='none'
  document.querySelector('.layui-nav-item  .txone').style.display='none'
  document.querySelector('.userinfo .layui-nav-img').src=res.data.data.user_pic
  document.querySelector('.layui-nav-item  .layui-nav-img').src=res.data.data.user_pic
  

  }
  
  
  }