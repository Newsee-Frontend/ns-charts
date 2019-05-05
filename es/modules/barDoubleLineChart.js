"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _echarts=_interopRequireDefault(require("echarts")),_tooltipStyle=_interopRequireDefault(require("../config/tooltipStyle"));function _default(e,t,i){for(var l=Object.assign({gridLeft:30,gridTop:60,gridRight:30,gridBottom:30,legendTop:10,legendName:["","",""],tooltipUnit:"",xAxisFontSize:12,xAxisMaxCharNum:2,xAxisFilter:"",yAxisUnit:"",yAxisSplitNum:5,dataZoomStyle:[0,100,!1],showPlan:!1,clickFn:null},i),r=[],a=[],o=[],n=[],s=[],u=0;u<e[0].length;u++)r.push(e[0][u].departmentName.replace(l.xAxisFilter,"")),a.push(e[0][u].actualTarget);s.push({type:"bar",name:l.legendName[0],data:a,barMaxWidth:20,itemStyle:{color:new _echarts.default.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#1595ff"},{offset:1,color:"#8c53ca"}])}});for(var p=0;p<e[1].length;p++)o.push(e[1][p].actualTarget);s.push({type:"line",name:l.legendName[1],data:o,itemStyle:{color:"#4ED552"}});for(var c=0;c<e[2].length;c++)n.push(e[2][c].actualTarget);s.push({type:"line",name:l.legendName[2],data:n,itemStyle:{color:"#ff6161"}});var d=_echarts.default.init(document.getElementById(t),"customed"),g=Object.assign({trigger:"axis",axisPointer:{type:"line",lineStyle:{color:"#ccc",width:1},label:{precision:2},z:0},formatter:function(e){for(var t=e[0].name,i=0;i<e.length;i++){t+="<br>"+('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+(e[i].color.colorStops?e[i].color.colorStops[0].color:e[i].color)+';"></span>')+e[i].seriesName+"："+e[i].value+l.tooltipUnit}return t}},_tooltipStyle.default);d.setOption({tooltip:g,grid:{left:l.gridLeft,top:l.gridTop,right:l.gridRight,bottom:l.gridBottom,containLabel:!0},legend:{top:l.legendTop,data:l.legendName},xAxis:{data:r,axisLabel:{lineHeight:l.xAxisFontSize,fontSize:l.xAxisFontSize,formatter:function(e){for(var t="",i=l.xAxisMaxCharNum,r=Math.ceil(e.length/i),a=0;a<r;a++){var o=e.slice(a*i,(a+1)*i);0<r-1&&(o+="\n"),t+=o}return t}}},yAxis:{type:"value",splitNumber:l.yAxisSplitNum,axisLabel:{formatter:function(e){return e+l.yAxisUnit}}},series:s})}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFyRG91YmxlTGluZUNoYXJ0LmpzIl0sIm5hbWVzIjpbIl9lY2hhcnRzIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfdG9vbHRpcFN0eWxlIiwiX2RlZmF1bHQiLCJkYXRhIiwiY2hhcnRJRCIsIm9wdGlvbnMiLCJncmlkQm90dG9tIiwiT2JqZWN0IiwiYXNzaWduIiwiZ3JpZExlZnQiLCJncmlkVG9wIiwiZ3JpZFJpZ2h0IiwibGVnZW5kVG9wIiwibGVnZW5kTmFtZSIsInRvb2x0aXBVbml0IiwieEF4aXNGb250U2l6ZSIsInhBeGlzTWF4Q2hhck51bSIsImRlZmF1bHRPcHRzIiwieUF4aXNTcGxpdE51bSIsInNob3dQbGFuIiwic2VyaWVzRGF0YTEiLCJzZXJpZXNEYXRhMyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZGVwYXJ0bWVudE5hbWUiLCJyZXBsYWNlIiwib3B0cyIsInhBeGlzRmlsdGVyIiwiYWN0dWFsVGFyZ2V0Iiwic2VyaWVzIiwibmFtZSIsInlBeGlzVW5pdCIsImJhck1heFdpZHRoIiwiY29sb3IiLCJlY2hhcnRzIiwiZ3JhcGhpYyIsIkxpbmVhckdyYWRpZW50IiwiZGF0YVpvb21TdHlsZSIsIm9mZnNldCIsInhBeGlzTmFtZXMiLCJqIiwic2VyaWVzRGF0YTIiLCJrIiwiaXRlbVN0eWxlIiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0b29sdGlwIiwidHJpZ2dlciIsImF4aXNQb2ludGVyIiwidHlwZSIsImxpbmVTdHlsZSIsIndpZHRoIiwibGFiZWwiLCJwcmVjaXNpb24iLCJmb3JtYXR0ZXIiLCJyZXN1bHQiLCJyZXR1cm5WYWwiLCJjb2xvclN0b3BzIiwic2VyaWVzTmFtZSIsInZhbHVlIiwidG9vbHRpcFN0eWxlIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwiY29udGFpbkxhYmVsIiwiYXhpc0xhYmVsIiwibGluZUhlaWdodCIsInN0ciIsIm1heExlbmd0aCIsInJvd051bSIsIk1hdGgiLCJwYXJ0Iiwic2xpY2UiLCJ5QXhpcyIsInNwbGl0TnVtYmVyIiwic2V0T3B0aW9uIl0sIm1hcHBpbmdzIjoiZ0xBQUEsSUFBQUEsU0FBQUMsdUJBQUFDLFFBQUEsWUFDQUMsY0FBQUYsdUJBQUFDLFFBQUEsMkJBR2UsU0FBQUUsU0FBVUMsRUFBTUMsRUFBU0MsR0FRQSxJQVBwQyxJQUlJQyxFQUFVQyxPQUpJQyxPQUFBLENBQ2RDLFNBQVUsR0FDVkMsUUFBUyxHQUNUQyxVQUFXLEdBUm5CTCxXQUFBLEdBVVFNLFVBQVcsR0FUbkJDLFdBQUEsQ0FBQSxHQUFBLEdBQUEsSUFXUUMsWUFBYSxHQVRyQkMsY0FBQSxHQUNlQyxnQkFBZ0JaLEVBQ3ZCYSxZQUFjLEdBQ2RSLFVBRGMsR0FDa0JTLGNBQUEsRUFDaENSLGNBRmMsQ0FBQSxFQUFBLEtBQUEsR0FFa0JTLFVBQUEsRUFDaENSLFFBSGMsTUFBQU4sR0FLZE8sRUFMYyxHQUtrQlEsRUFBQSxHQUNoQ1AsRUFBaUIsR0FBZVEsRUFBQSxHQUNoQ1AsRUFBYSxHQUFtQlEsRUFBQSxFQUFBQSxFQUFBbkIsRUFBQSxHQUFBb0IsT0FBQUQsSUFDaENQLEVBQWVTLEtBUkRyQixFQUFBLEdBQUFtQixHQUFBRyxlQUFBQyxRQUFBQyxFQUFBQyxZQUFBLEtBUWtCUixFQUFBSSxLQUFBckIsRUFBQSxHQUFBbUIsR0FBQU8sY0FDQUMsRUFBQU4sS0FBQSxDQUNoQ0ksS0FBQUEsTUFBZ0NHLEtBQUFKLEVBQUFkLFdBQUEsR0FDaENtQixLQUFTWixFQUF1QmEsWUFBQSxHQUNoQ2YsVUFBZSxDQUFpQmdCLE1BQUEsSUFBQUMsU0FBQUEsUUFBQUMsUUFBQUMsZUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsQ0FDaENDLE9BQW1CLEVBQWFKLE1BQUEsV0FDdEIsQ0FBc0JLLE9BQUEsRUFDdkJMLE1BQXVCLGdCQUlwQyxJQUFJTSxJQUFBQSxFQUFVLEVBQUdDLEVBQWpCdEMsRUFBQSxHQUFBb0IsT0FBQWtCLElBQ0lyQixFQUFjSSxLQURsQnJCLEVBQUEsR0FBQXNDLEdBQUFaLGNBQUFDLEVBR0lULEtBQUFBLENBQ0FTLEtBQU0sT0F5Qk5DLEtBQU1KLEVBQUtkLFdBQVcsR0F4QnRCVixLQUFLdUMsRUFDTEYsVUFBQSxDQUNBcEIsTUFBWUksYUFFaEJNLElBQU9OLElBQVBtQixFQUFZLEVBQUFBLEVBQUF4QyxFQUFBLEdBQUFvQixPQUFBb0IsSUFDSnRCLEVBRElHLEtBQUFyQixFQUFBLEdBQUF3QyxHQUFBZCxjQUdSMUIsRUFBTWlCLEtBQUFBLENBQ05hLEtBQUFBLE9BQ0FXLEtBQVNqQixFQUFFZCxXQUFBLEdBQ1BxQixLQUFPYixFQUNIa0IsVUFEbUQsQ0FFbkRMLE1BQU8sYUFHUEEsSUFBQUEsRUFBT0MsU0FBQUEsUUFBQVUsS0FBQUMsU0FBQUMsZUFBQTNDLEdBQUEsWUFMSjRDLEVBQUF6QyxPQUFBQyxPQUFBLENBREF5QyxRQUFBLE9BTGZDLFlBQUEsQ0F5Q1lDLEtBQU0sT0ExQmxCQyxVQUF3QixDQUNwQmxCLE1BQXFCLE9BQ3hCbUIsTUFBQSxHQUNXQyxNQUFBLENBQUFDLFVBQUEsR0FHRmIsRUFBQUEsR0FFR2MsVUFBRSxTQUFBQyxHQUxmLElBSWUsSUFBQUMsRUFBQUQsRUFBQSxHQUFBMUIsS0FKZlQsRUFBQSxFQUFBQSxFQUFBbUMsRUFBQWxDLE9BQUFELElBQUEsQ0FTSW9DLEdBQTRCN0IsUUFESk4sa0hBNEJBa0MsRUFBT25DLEdBQUdZLE1BQU15QixXQUFZRixFQUFPbkMsR0FBR1ksTUFBTXlCLFdBQVcsR0FBR3pCLE1BQVF1QixFQUFPbkMsR0FBR1ksT0E1Qi9ELGNBQ3JDdUIsRUFBQW5DLEdBQUFzQyxXQUFBLElBQUFILEVBQUFuQyxHQUFBdUMsTUFBQWxDLEVBQUFiLFlBK0JRLE9BQU80QyxJQTVCVEksY0FBQUEsU0FDTi9CLEVBQU1KLFVBQUtkLENBQ1BtQyxRQUFFM0IsRUFDTnVCLEtBQVMsQ0FDQW1CLEtBQUVwQyxFQUFBbEIsU0FEQXVELElBQUFyQyxFQUFBakIsUUFKZnVELE1BQUF0QyxFQUFBaEIsVUFzQ1F1RCxPQUFRdkMsRUFBS3JCLFdBOUJaNkQsY0FBR2hDLEdBRUpjLE9BQVMsQ0FDVEMsSUFBYXZCLEVBQUFmLFVBQ0hULEtBREd3QixFQUFBZCxZQUdMcUIsTUFBTyxDQUNQbUIsS0FBT2IsRUFKRjRCLFVBQUEsQ0FNRkMsV0FBQTFDLEVBQUFaLGNBQ0h3QyxTQUFXNUIsRUFBQVosY0FQTnlDLFVBQUEsU0FBQUssR0FZSSxJQUhWLElBQUFTLEVBQUEsR0FYYUMsRUFBQTVDLEVBQUFYLGdCQWFUd0QsRUFBQUMsS0FBVWhCLEtBQU9JLEVBQUF0QyxPQUFBZ0QsR0FDRmpELEVBQUlTLEVBQUFBLEVBQTFCeUMsRUFBQWxELElBQUEsQ0FnQ1EsSUFBSW9ELEVBQU9iLEVBQU1jLE1BQU1yRCxFQUFJaUQsR0FBWWpELEVBQUksR0FBS2lELEdBL0I5QmhELEVBQVZpRCxFQUFVakQsSUFBU21ELEdBQUcsTUFDdEJqQixHQUFVdkIsRUFFYixPQUFJb0MsS0FHcEJNLE1BQUEsQ0FDRmQsS0FBQUEsUUFrQ0NlLFlBQWFsRCxFQUFLVCxjQWpDcEI0RCxVQUFVLENBQ0g5QixVQURHLFNBQUFhLEdBRU4sT0FBQUEsRUFBQWxDLEVBQUFLLGFBSUZrQyxPQUFRdkMiLCJmaWxlIjoibW9kdWxlcy9iYXJEb3VibGVMaW5lQ2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZWNoYXJ0cyBmcm9tICdlY2hhcnRzJ1xuaW1wb3J0IHRvb2x0aXBTdHlsZSBmcm9tICcuLi9jb25maWcvdG9vbHRpcFN0eWxlJ1xuXG4vL+afseeKtuWPjOaKmOe6v+WbvlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGRhdGEsIGNoYXJ0SUQsIG9wdGlvbnMpe1xuICAgIHZhciBkZWZhdWx0T3B0cyA9IHtcbiAgICAgICAgZ3JpZExlZnQ6IDMwLCAgICAgICAgICAgICAgICAgICAvL+WbvuihqOi3neemu+WuueWZqOW3pui+ueeVjOi3neemu1xuICAgICAgICBncmlkVG9wOiA2MCwgICAgICAgICAgICAgICAgICAgIC8v5LiKXG4gICAgICAgIGdyaWRSaWdodDogMzAsICAgICAgICAgICAgICAgICAgLy/lj7NcbiAgICAgICAgZ3JpZEJvdHRvbTogMzAsICAgICAgICAgICAgICAgICAvL+S4i1xuICAgICAgICBsZWdlbmRUb3A6IDEwLCAgICAgICAgICAgICAgICAgIC8v5Zu+5L6L6Led56a75a655Zmo5LiK6L6555WM6Led56a7XG4gICAgICAgIGxlZ2VuZE5hbWU6IFsnJywgJycsICcnXSwgICAgICAgLy/lm77kvovlkI3np7BcbiAgICAgICAgdG9vbHRpcFVuaXQ6ICcnLCAgICAgICAgICAgICAgICAvL+aPkOekuuahhuWNleS9jVxuICAgICAgICB4QXhpc0ZvbnRTaXplOiAxMiwgICAgICAgICAgICAgIC8vWOi9tOWtl+S9k+Wkp+Wwj1xuICAgICAgICB4QXhpc01heENoYXJOdW06IDIsICAgICAgICAgICAgIC8vWOi9tOavj+ihjOaWh+Wtl+acgOWkp+S4quaVsFxuICAgICAgICB4QXhpc0ZpbHRlcjogJycsICAgICAgICAgICAgICAgIC8vWOi9tOi/h+a7pOaWh+Wtl1xuICAgICAgICB5QXhpc1VuaXQ6ICcnLCAgICAgICAgICAgICAgICAgIC8vWei9tOWNleS9jVxuICAgICAgICB5QXhpc1NwbGl0TnVtOiA1LCAgICAgICAgICAgICAgIC8vWei9tOWIhuWJsue6v+S4quaVsFxuICAgICAgICBkYXRhWm9vbVN0eWxlOiBbMCwgMTAwLCBmYWxzZV0sIC8v5Zu+6KGo5ZKMZGF0YVpvb23nu4Tku7bnmoTlvIDlp4vkvY3nva7vvIznu5PmnZ/kvY3nva7ku6Xlj4rmmK/lkKbmmL7npLpkYXRhWm9vbee7hOS7tlxuICAgICAgICBzaG93UGxhbjogZmFsc2UsICAgICAgICAgICAgICAgIC8v5piv5ZCm5pi+56S66K6h5YiS44CC5rOo77ya5b2T5YC85Li6dHJ1ZeaXtu+8jOehruS/neWMheWQq+aVsOaNrueahOaVsOe7hOS4quaVsOS4ujFcbiAgICAgICAgY2xpY2tGbjogbnVsbCAgICAgICAgICAgICAgICAgICAvL+eCueWHu+S6i+S7tlxuICAgIH07XG4gICAgdmFyIG9wdHMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRzLCBvcHRpb25zKTtcblxuICAgIHZhciB4QXhpc05hbWVzID0gW10sXG4gICAgICAgIHNlcmllc0RhdGExID0gW10sXG4gICAgICAgIHNlcmllc0RhdGEyID0gW10sXG4gICAgICAgIHNlcmllc0RhdGEzID0gW10sXG4gICAgICAgIHNlcmllcyA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkYXRhWzBdLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgeEF4aXNOYW1lcy5wdXNoKGRhdGFbMF1baV0uZGVwYXJ0bWVudE5hbWUucmVwbGFjZShvcHRzLnhBeGlzRmlsdGVyLCcnKSk7XG4gICAgICAgIHNlcmllc0RhdGExLnB1c2goZGF0YVswXVtpXS5hY3R1YWxUYXJnZXQpXG4gICAgfVxuICAgIHNlcmllcy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgIG5hbWU6IG9wdHMubGVnZW5kTmFtZVswXSxcbiAgICAgICAgZGF0YTogc2VyaWVzRGF0YTEsXG4gICAgICAgIGJhck1heFdpZHRoOiAyMCxcbiAgICAgICAgaXRlbVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogbmV3IGVjaGFydHMuZ3JhcGhpYy5MaW5lYXJHcmFkaWVudCgwLCAwLCAwLCAxLCBbe1xuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogJyMxNTk1ZmYnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzhjNTNjYSdcbiAgICAgICAgICAgIH1dKVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgZm9yKHZhciBqID0gMDsgaiA8IGRhdGFbMV0ubGVuZ3RoOyBqKyspe1xuICAgICAgICBzZXJpZXNEYXRhMi5wdXNoKGRhdGFbMV1bal0uYWN0dWFsVGFyZ2V0KVxuICAgIH1cbiAgICBzZXJpZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgbmFtZTogb3B0cy5sZWdlbmROYW1lWzFdLFxuICAgICAgICBkYXRhOiBzZXJpZXNEYXRhMixcbiAgICAgICAgaXRlbVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogJyM0RUQ1NTInXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbMl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgc2VyaWVzRGF0YTMucHVzaChkYXRhWzJdW2tdLmFjdHVhbFRhcmdldClcbiAgICB9XG4gICAgc2VyaWVzLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIG5hbWU6IG9wdHMubGVnZW5kTmFtZVsyXSxcbiAgICAgICAgZGF0YTogc2VyaWVzRGF0YTMsXG4gICAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICAgICAgY29sb3I6ICcjZmY2MTYxJ1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIGNoYXJ0ID0gZWNoYXJ0cy5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SUQpLCAnY3VzdG9tZWQnKSxcbiAgICAgICAgdG9vbHRpcCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLFxuICAgICAgICAgICAgYXhpc1BvaW50ZXI6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2NjYycsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICBwcmVjaXNpb246IDJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHo6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHZhciByZXR1cm5WYWwgPSByZXN1bHRbMF0ubmFtZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gcmVzdWx0W2ldLmNvbG9yLmNvbG9yU3RvcHM/IHJlc3VsdFtpXS5jb2xvci5jb2xvclN0b3BzWzBdLmNvbG9yIDogcmVzdWx0W2ldLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjVweDtib3JkZXItcmFkaXVzOjEwcHg7d2lkdGg6MTBweDtoZWlnaHQ6MTBweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBjb2xvciArICc7XCI+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbCArPSAnPGJyPicgKyBtYXJrZXIgKyByZXN1bHRbaV0uc2VyaWVzTmFtZSArICfvvJonICsgcmVzdWx0W2ldLnZhbHVlICsgb3B0cy50b29sdGlwVW5pdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdG9vbHRpcFN0eWxlKTtcbiAgICBjaGFydC5zZXRPcHRpb24oe1xuICAgICAgICB0b29sdGlwOiB0b29sdGlwLFxuICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBsZWZ0OiBvcHRzLmdyaWRMZWZ0LFxuICAgICAgICAgICAgdG9wOiBvcHRzLmdyaWRUb3AsXG4gICAgICAgICAgICByaWdodDogb3B0cy5ncmlkUmlnaHQsXG4gICAgICAgICAgICBib3R0b206IG9wdHMuZ3JpZEJvdHRvbSxcbiAgICAgICAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgIHRvcDogb3B0cy5sZWdlbmRUb3AsXG4gICAgICAgICAgICBkYXRhOiBvcHRzLmxlZ2VuZE5hbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHhBeGlzOiB7XG4gICAgICAgICAgICBkYXRhOiB4QXhpc05hbWVzLFxuICAgICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogb3B0cy54QXhpc0ZvbnRTaXplLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBvcHRzLnhBeGlzRm9udFNpemUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGggPSBvcHRzLnhBeGlzTWF4Q2hhck51bSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bSA9IE1hdGguY2VpbCh2YWx1ZS5sZW5ndGggLyBtYXhMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcm93TnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gdmFsdWUuc2xpY2UoaSAqIG1heExlbmd0aCwgKGkgKyAxKSAqIG1heExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW0gLSAxID4gMCAmJiAocGFydCArPSAnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gcGFydDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeUF4aXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICBzcGxpdE51bWJlcjogb3B0cy55QXhpc1NwbGl0TnVtLFxuICAgICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIG9wdHMueUF4aXNVbml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWVzOiBzZXJpZXNcbiAgICB9KTtcbn07XG4iXX0=
