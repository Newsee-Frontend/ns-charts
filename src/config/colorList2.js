import echarts from 'echarts';

//图形通用颜色列表
export default [
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
      { offset: 0, color: '#1595ff' },
      { offset: 1, color: '#8c53ca' },
    ]),
  },
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#ffa87a' },
      { offset: 1, color: '#ff6161' },
    ]),
  },
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#a5ec27' },
      { offset: 1, color: '#4ed552' },
    ]),
  },
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#11d6cb' },
      { offset: 1, color: '#23c8c4' },
    ]),
  },
];
