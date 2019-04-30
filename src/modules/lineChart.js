import tooltipStyle from '../config/tooltipStyle'

//折线图
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
        xAxisMaxCharNum: 8,             //X轴每行文字最大个数
        xAxisFilter: '',                //X轴过滤文字
        yAxisUnit: '',                  //Y轴单位
        yAxisSplitNum: 5,               //Y轴分割线个数
        dataZoomStyle: [0, 100, false], //图表和dataZoom组件的开始位置，结束位置以及是否显示dataZoom组件
        clickFn: null                   //点击事件
    };
    var opts = Object.assign(defaultOpts, options);
    var colorList = [{
        color: '#15a3ff'
    }, {
        color: '#ff6161'
    }, {
        color: '#4ed552'
    }, {
        color: '#ffc715'
    }];
    var colorLinearList = [{
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                offset: 0,
                color: '#15a3ff'
            }, {
                offset: 1,
                color: 'rgba(41,197,255,0.20)'
            }]),
            opacity: 0.3
        }
    }, {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                offset: 0,
                color: '#ff6161'
            }, {
                offset: 1,
                color: 'rgba(255,97,97,0.25)'
            }]),
            opacity: 0.3
        }
    }, {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                offset: 0,
                color: '#4ed552'
            }, {
                offset: 1,
                color: 'rgba(78,213,82,0.20)'
            }]),
            opacity: 0.3
        }
    }, {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                offset: 0,
                color: '#ffc715'
            }, {
                offset: 1,
                color: 'rgba(255,199,21,0.20)'
            }]),
            opacity: 0.3
        }
    }];
    var xAxisNames = [],
        series = [],
        seriesData = [];
    for(var i = 0; i < data.length; i++){
        seriesData.push([]);
        for(var j = 0; j < data[i].length; j++){
            var date = data[i][j].date;
            date.length == 5 && (date = date.slice(0,4) + '0' + date.slice(4)); //补零
            i == 0 && xAxisNames.push(date.replace(opts.xAxisFilter,''));
            seriesData[i].push(data[i][j].actualTarget);
        }
        series.push({
            type: 'line',
            name: opts.legendName[i],
            data: seriesData[i],
            itemStyle: colorList[i],
            areaStyle: colorLinearList[i]
        });
    }
    var chart = echarts.init(document.getElementById(chartID), 'customed'),
        tooltip = Object.assign({
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#ccc',
                    width: 1
                },
                label: {
                    precision: 2
                },
                z: 0
            },
            formatter: function (result){
                var returnVal = result[0].name;
                for(var i = 0; i < result.length; i++){
                    returnVal += '<br>' + result[i].marker + result[i].seriesName + '：' + result[i].value + opts.tooltipUnit;
                }
                return returnVal;
            }
        }, tooltipStyle);
    chart.setOption({
        tooltip: tooltip,
        grid: {
            left: opts.gridLeft,
            top: opts.gridTop,
            right: opts.gridRight,
            bottom: opts.gridBottom,
            containLabel: true
        },
        legend: {
            top: opts.legendTop,
            data: opts.legendName,
        },
        xAxis: {
            boundaryGap: false,
            data: xAxisNames,
            axisLabel: {
                lineHeight: opts.xAxisFontSize,
                fontSize: opts.xAxisFontSize,
                formatter: function (value){
                    var str = '',
                        maxLength = opts.xAxisMaxCharNum,
                        rowNum = Math.ceil(value.length / maxLength);
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
            type: 'inside',
            xAxisIndex: 0,
            start: opts.dataZoomStyle[0],
            end: opts.dataZoomStyle[1],
            zoomOnMouseWheel: false
        }, {
            type: 'slider',
            xAxisIndex: 0,
            start: opts.dataZoomStyle[0],
            end: opts.dataZoomStyle[1],
            show: opts.dataZoomStyle[2],
            zoomLock: true
        }],
        series: series
    });
    opts.clickFn && (chart.on('click',opts.clickFn));
};