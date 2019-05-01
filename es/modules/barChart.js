"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _echarts=_interopRequireDefault(require("echarts")),_tooltipStyle=_interopRequireDefault(require("../config/tooltipStyle"));function _default(t,e,i){for(var r=Object.assign({gridLeft:30,gridTop:30,gridRight:30,gridBottom:30,tooltipUnit:"",yAxisUnit:"",yAxisFontSize:12,yAxisFilter:"",clickFn:null},i),o=[],a=[],l=0;l<t[0].length;l++)o.push(t[0][t[0].length-1-l].departmentName.replace(r.yAxisFilter,"")),a.push(t[0][t[0].length-1-l].actualTarget);var s=_echarts.default.init(document.getElementById(e),"customed"),n=Object.assign({trigger:"item",formatter:"{b0}<br>{c0}"+r.tooltipUnit},_tooltipStyle.default);s.setOption({tooltip:n,grid:{left:r.gridLeft,top:r.gridTop,right:r.gridRight,bottom:r.gridBottom,containLabel:!0},xAxis:{type:"value",show:!1},yAxis:{data:o,axisLabel:{fontSize:r.yAxisFontSize}},series:[{type:"bar",data:a,barWidth:14,barGap:10,smooth:!0,label:{show:!0,position:"right",offset:[5,1],textStyle:{color:"#000",fontSize:13},formatter:"{c}"+r.yAxisUnit},itemStyle:{color:new _echarts.default.graphic.LinearGradient(0,0,.5,1,[{offset:0,color:"#1595ff"},{offset:1,color:"#12edff"}])}}]})}