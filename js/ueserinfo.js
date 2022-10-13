let form=layui.form
let layer=layui.layer
form.verify({
    nickname:function(value){
        
        if(value.length>=6){
          return  alert('不能大于六个字')

        }



    }
})
axios.defaults.baseURL = 'http://www.liulongbin.top:3007';
function inneruserinfo(){
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
        url:'/my/userinfo',
       method:'get',
       
          }).then(res=>{
        console.log(res)
        if(res.data.status==0){
       form.val('onesform',res.data.data)
    
       
        }
           });
}

inneruserinfo()

document.querySelector('#btn').addEventListener('click',function(e){
    e.preventDefault()
    inneruserinfo()
})


document.querySelector('.layui-form').addEventListener('submit',function(e){
 let data={}
   document.querySelectorAll('.layui-form input').forEach(item=>{
    data[item.name]=item.value
    
   })
console.log(data)

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
  'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.getItem('token')
},
 url:'/my/userinfo',
method:'post',
  data

   }).then(res=>{
 console.log(res)

window.parent.getUserInfo()
    });



})

