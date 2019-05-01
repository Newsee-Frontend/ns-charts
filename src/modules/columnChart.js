import echarts from 'echarts'
import colorList from '../config/colorList'
import tooltipStyle from '../config/tooltipStyle'

//柱状图
export default function (data, chartID, options){
    var defaultOpts = {
        gridLeft: 30,                   //图表距离容器左边界距离
        gridTop: 60,                    //上
        gridRight: 30,                  //右
        gridBottom: 30,                 //下
        legendTop: 10,                  //图例距离容器上边界距离
        legendName: [''],               //图例名称
        tooltipUnit: '',                //提示框单位
        xAxisFontSize: 12,              //X轴字体大小
        xAxisMaxCharNum: 2,             //X轴每行文字最大个数
        xAxisFilter: '',                //X轴过滤文字
        yAxisUnit: '',                  //Y轴单位
        yAxisSplitNum: 5,               //Y轴分割线个数
        dataZoomStyle: [0, 100, false], //图表和dataZoom组件的开始位置，结束位置以及是否显示dataZoom组件
        showPlan: false,                //是否显示计划。注：当值为true时，确保包含数据的数组个数为1
        clickFn: null                   //点击事件
    };
    var opts = Object.assign(defaultOpts, options);
    var xAxisNames = [],
        series = [];
    if(opts.showPlan){
        if(data.length > 1) throw('当设置showPlan的值为true时，数组长度不能大于1');
        var seriesData1 = [], seriesData2 = [];
        for(var i = 0; i < data[0].length; i++) {
            xAxisNames.push(data[0][i].departmentName.replace(opts.xAxisFilter,''));
            seriesData1.push(data[0][i].shouldTarget);
            seriesData2.push(data[0][i].actualTarget);
        }
        series.push({
            type: 'bar',
            name: opts.legendName[0],
            data: seriesData1,
            itemStyle: colorList[0],
            barMaxWidth: 20,
            barCategoryGap: '30%' //柱间距离
        });
        series.push({
            type: 'bar',
            name: opts.legendName[1],
            data: seriesData2,
            itemStyle: colorList[1],
            barMaxWidth: 20,
            barCategoryGap: '30%'
        });
    }else{
        var seriesData = [];
        for(var j = 0; j < data.length; j++){
            seriesData.push([]);
            for(var k = 0; k < data[j].length; k++){
                j == 0 && xAxisNames.push(data[j][k].departmentName.replace(opts.xAxisFilter,'')); //以第一个数组元素的值作为x轴的名称
                seriesData[j].push(data[j][k].actualTarget);
            }
            series.push({
                type: 'bar',
                name: opts.legendName[j],
                data: seriesData[j],
                itemStyle: colorList[j],
                barMaxWidth: 20,
                barCategoryGap: '30%'
            });
        }
    }
    var chart = echarts.init(document.getElementById(chartID), 'customed'),
        tooltip = Object.assign({
            trigger: 'axis',
            formatter: function (result){
                var returnVal = result[0].name;
                for(var i = 0; i < result.length; i++){
                    var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + result[i].color.colorStops[0].color + ';"></span>';
                    returnVal += '<br>' + marker + result[i].seriesName + '：' + result[i].value + opts.tooltipUnit;
                }
                return returnVal;
            }
        }, tooltipStyle);
    chart.setOption({
        tooltip: tooltip,
        grid: { //容器间距
            left: opts.gridLeft,
            top: opts.gridTop,
            right: opts.gridRight,
            bottom: opts.gridBottom,
            containLabel: true //是否包含坐标轴的刻度标签
        },
        legend: {
            top: opts.legendTop,
            data: opts.legendName,
        },
        xAxis: {
            offset: 0, //X轴相对于默认位置的上下偏移
            data: xAxisNames,
            axisLabel: {
                lineHeight: opts.xAxisFontSize,
                fontSize: opts.xAxisFontSize,
                formatter: function (value){
                    var str = '',
                        maxLength = opts.xAxisMaxCharNum,
                        rowNum = Math.ceil(value.length / maxLength); //总行数
                    for(var i = 0; i < rowNum; i++) {
                        var part = value.slice(i * maxLength, (i + 1) * maxLength);
                        rowNum - 1 > 0 && (part += '\n');
                        str += part;
                    }
                    return str;
                }
            }
        },
        yAxis: {
            type: 'value',
            splitNumber: opts.yAxisSplitNum,
            axisLabel: {
                formatter: function(value){
                    return value + opts.yAxisUnit;
                }
            }
        },
        dataZoom: [{
            type: 'inside', //坐标系内拖动或滚轮(或移动触屏上的两指滑动)进行缩放
            xAxisIndex: 0,
            start: opts.dataZoomStyle[0],
            end: opts.dataZoomStyle[1],
            zoomOnMouseWheel: false //鼠标滚轮不能触发缩放
        }, {
            type: 'slider', //dataZoom组件内拖动
            xAxisIndex: 0,
            start: opts.dataZoomStyle[0],
            end: opts.dataZoomStyle[1],
            show: opts.dataZoomStyle[2],
            zoomLock: true //是否锁定选择区域
        }],
        series: series
    });
    opts.clickFn && (chart.on('click',opts.clickFn));
};
