/*
*  在vant ui中图片压缩的使用
*  let img = new Image();
*  this.dwimg=file.content;
*  img.src = file.content;
*  img.onload=function(){
*    在这写请求上传图片接口的代码
*  }
*/
ontpys(img){
  let originWidth = img.width, // 压缩后的宽
  originHeight=img.height,
  maxWidth = 400, maxHeight = 400,
  quality = 0.7, // 压缩质量
  canvas = document.createElement('canvas'),
  drawer = canvas.getContext("2d");
  canvas.width = maxWidth;
  canvas.height = originHeight/originWidth*maxWidth;
  drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
  let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
  let file = this.dataURLtoFile(base64,Date.parse(Date())+'.jpg');
  console.log(file);//压缩后的file
  return file;//返回压缩后的图片，此变量为表单对象
  }
dataURLtoFile(dataurl,filename){
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr],filename,{type:mime});
  }