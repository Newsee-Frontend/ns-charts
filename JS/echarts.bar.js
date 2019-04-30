// 柱状图
// barChart(data, chartID, options)
// data             数据
// chartID          放置图表的元素id
// options包含了下列参数
// legendName       图例名称，默认值为['']
// yAxisFormatter   Y轴文字，默认值为function(value){ return value; }
// dataZoomStyle    图表和dataZoom组件的开始位置，结束位置以及是否显示dataZoom组件，默认值为[0, 50, true]
// showPlan         是否显示计划，默认值为false。注：当值为true时，确保包含数据的数组个数为1
var barChart = function (data, chartID, options) {
    var defaultOpts = {
        legendName: [''],
        yAxisFormatter: function(value){ return value; },
        dataZoomStyle: [0, 50, true],
        showPlan: false
    };
    var opts = assign(defaultOpts, options);
    var bar = echarts.init(document.getElementById(chartID), 'customed');
    var colorList = [{
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                offset: 0,
                color: '#1595ff'
            }, {
                offset: 1,
                color: '#8c53ca'
            }])
        }
    }, {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#ffa87a'
            }, {
                offset: 1,
                color: '#ff6161'
            }])
        }
    }, {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a5ec27'
            }, {
                offset: 1,
                color: '#4ed552'
            }])
        }
    }, {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#11d6cb'
            }, {
                offset: 1,
                color: '#23c8c4'
            }])
        }
    }];
    var names = opts.legendName,
        xAxisNames = [],
        series = [];
    if(opts.showPlan){
        if(data.length > 1) throw('当设置showPlan的值为true时，数组长度不能大于1。');
        var seriesData1 = [], seriesData2 = [];
        for(var i = 0; i < data[0].length; i++) {
            xAxisNames.push(data[0][i].departmentName);
            seriesData1.push(data[0][i].shouldTarget);
            seriesData2.push(data[0][i].actualTarget);
        }
        series.push({
            type: 'bar',
            name: names[0],
            barMaxWidth: 20,
            data: seriesData1,
            itemStyle: colorList[0]
        })
        series.push({
            type: 'bar',
            name: names[1],
            barMaxWidth: 20,
            data: seriesData2,
            itemStyle: colorList[1]
        })
    }else{
        var seriesData = [];
        for(var o = 0; o < data.length; o++){
            seriesData.push([]);
        }
        for(var j = 0; j < data.length; j++){
            for(var k = 0; k < data[j].length; k++){
                j == 0 && xAxisNames.push(data[j][k].departmentName);
                seriesData[j].push(data[j][k].actualTarget);                 
            }
            series.push({
                type: 'bar',
                name: names[j],
                barMaxWidth: 20,
                data: seriesData[j],
                itemStyle: colorList[j]
            });
        }
    }
    bar.setOption({
        tooltip: {
            trigger: 'axis',
            show: true,
            width: 159,
            height: 64,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#e5e5e5',
            padding: [
                11,
                16,
                11,
                16,
            ],
            textStyle: {
                color: '#333',
                fontSize: 14,
                fontFamily:'PingFangSC-Regular'
            },
            extraCssText: 'box-shadow: 0 3px 6px 0 rgba(0,0,0,0.24);',
        },
        grid: {//四周留白
            x: 65,
            y: 30,
            x2: 50,
            y2: 95
        },
        legend: {
            data: names
        },
        xAxis: {
            offset: 10,  //X轴相对于默认位置的偏移
            nameGap: 50, //坐标轴名称与轴线之间的距离
            axisLabel: {
                lineHeight: 12
            },
            data: xAxisNames,
            axisLabel: {
                fontSize: 12,
                fontWeight: 900,
                interval: 0,
                formatter: function(value) {
                    var ret = ""; //拼接加\n返回的类目项
                    var maxLength = 2; //每项显示文字个数
                    var valLength = value.length; //X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1) {//如果类目项的文字大于3,
                        for (var i = 0; i < rowN; i++) {
                            var temp = ""; //每次截取的字符串
                            var start = i * maxLength; //开始截取的位置
                            var end = start + maxLength; //结束截取的位置
                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                            temp = value.substring(start, end) + "\n";
                            ret += temp; //凭借最终的字符串
                        }
                        return ret;
                    } else {
                        return value;
                    }
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: opts.yAxisFormatter
            }
        },
        dataZoom: [{
            type: 'inside', //坐标系内拖动或滚轮(或移动触屏上的两指滑动)进行缩放
            xAxisIndex: 0,
            start: opts.dataZoomStyle[0],
            end: opts.dataZoomStyle[1]
        }, {
            type: 'slider', //dataZoom组件内拖动
            xAxisIndex: 0,
            start: opts.dataZoomStyle[0],
            end: opts.dataZoomStyle[1],
            show: opts.dataZoomStyle[2]
        }],
        series: series
    });
};