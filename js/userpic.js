  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  axios.defaults.baseURL = 'http://www.liulongbin.top:3007';

  // 1.3 创建裁剪区域
  $image.cropper(options)
document.querySelector('#sc').addEventListener('click',function(){
document.querySelector('#tijiao').click()


   /*  1.文件预览 */
//(1) 给file表单注册onchange事件
document.querySelector('#tijiao').addEventListener('change',function(){
// this 
//(2)获取用户选择的文件
let file = this.files[0]
  //(3)将file文件转成url路径
let url = URL.createObjectURL(file)
//(4)把url路径设置给img标签src
$image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', url)  // 重新设置图片路径
   .cropper(options)     



})







})
document.querySelector('#sure').addEventListener('click',function(e){
  e.preventDefault()
  let fd=new FormData()
  fd.append('avatar',document.querySelector('#tijiao').files[0])
  console.log(document.querySelector('#tijiao').files[0])

  var dataURL = $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 100,
    height: 100
  })
  .toDataURL('image/png')  

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
   url:'/my/update/avatar',
  method:'post',
      data:{'avatar':dataURL},

     }).then(res=>{
console.log(res)
   window.parent.getUserInfo()
      });



})