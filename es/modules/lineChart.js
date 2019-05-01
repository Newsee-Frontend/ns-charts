"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _echarts=_interopRequireDefault(require("echarts")),_tooltipStyle=_interopRequireDefault(require("../config/tooltipStyle"));function _default(e,t,o){for(var l=Object.assign({gridLeft:30,gridTop:60,gridRight:30,gridBottom:30,legendTop:10,legendName:[""],tooltipUnit:"",xAxisFontSize:12,xAxisMaxCharNum:8,xAxisFilter:"",yAxisUnit:"",yAxisSplitNum:5,dataZoomStyle:[0,100,!1],clickFn:null},o),r=[{color:"#15a3ff"},{color:"#ff6161"},{color:"#4ed552"},{color:"#ffc715"}],a=[{normal:{color:new _echarts.default.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#15a3ff"},{offset:1,color:"rgba(41,197,255,0.20)"}]),opacity:.3}},{normal:{color:new _echarts.default.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#ff6161"},{offset:1,color:"rgba(255,97,97,0.25)"}]),opacity:.3}},{normal:{color:new _echarts.default.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#4ed552"},{offset:1,color:"rgba(78,213,82,0.20)"}]),opacity:.3}},{normal:{color:new _echarts.default.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#ffc715"},{offset:1,color:"rgba(255,199,21,0.20)"}]),opacity:.3}}],i=[],n=[],c=[],s=0;s<e.length;s++){c.push([]);for(var f=0;f<e[s].length;f++){var d=e[s][f].date;5==d.length&&(d=d.slice(0,4)+"0"+d.slice(4)),0==s&&i.push(d.replace(l.xAxisFilter,"")),c[s].push(e[s][f].actualTarget)}n.push({type:"line",name:l.legendName[s],data:c[s],itemStyle:r[s],areaStyle:a[s]})}var u=_echarts.default.init(document.getElementById(t),"customed"),p=Object.assign({trigger:"axis",axisPointer:{type:"line",lineStyle:{color:"#ccc",width:1},label:{precision:2},z:0},formatter:function(e){for(var t=e[0].name,o=0;o<e.length;o++)t+="<br>"+e[o].marker+e[o].seriesName+"："+e[o].value+l.tooltipUnit;return t}},_tooltipStyle.default);u.setOption({tooltip:p,grid:{left:l.gridLeft,top:l.gridTop,right:l.gridRight,bottom:l.gridBottom,containLabel:!0},legend:{top:l.legendTop,data:l.legendName},xAxis:{boundaryGap:!1,data:i,axisLabel:{lineHeight:l.xAxisFontSize,fontSize:l.xAxisFontSize,formatter:function(e){for(var t="",o=l.xAxisMaxCharNum,r=Math.ceil(e.length/o),a=0;a<r;a++){var i=e.slice(a*o,(a+1)*o);0<r-1&&(i+="\n"),t+=i}return t}}},yAxis:{type:"value",splitNumber:l.yAxisSplitNum,axisLabel:{formatter:function(e){return e+l.yAxisUnit}}},dataZoom:[{type:"inside",xAxisIndex:0,start:l.dataZoomStyle[0],end:l.dataZoomStyle[1],zoomOnMouseWheel:!1},{type:"slider",xAxisIndex:0,start:l.dataZoomStyle[0],end:l.dataZoomStyle[1],show:l.dataZoomStyle[2],zoomLock:!0}],series:n}),l.clickFn&&u.on("click",l.clickFn)}