export const restorePosition = (position) => {
  //定义大屏缩放比例
  const getScale=(w = 1920, h = 1080)=> {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
  }
  const scale = getScale();
  if(scale<1){
    position.x= position.x / scale
    position.y= position.y / scale
  }else{
    position.x= position.x * scale
    position.y= position.y * scale
  }
  return position;
};
