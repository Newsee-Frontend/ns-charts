

var nscharts = {
    //提示框通用样式
    _tooltipStyle: {
        padding: [11, 16],
        width: 159,
        height: 64,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        extraCssText: 'box-shadow: 0 3px 6px 0 rgba(0,0,0,0.24);',
        textStyle: {
            color: '#333',
            fontSize: 14
        }
    },
    //图形通用颜色列表
    _colorList: [{
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
    }],
    //环形图
    pieChart: function (data, chartID, options){ // data--数据，chartID--放置图表的元素id，options包含了下列参数
        var defaultOpts = {
            centerPosition: ['30%','50%'],      //饼图圆心离容器左侧和顶部的距离
            radiusScale: ['50%','70%'],         //饼图半径，对应内圈和外圈的大小
            textPosition: ['29%', '44%'],       //标题离容器左侧和顶部的距离
            text: ['', ''],                     //标题和副标题文本
            color: '#333',                      //标题文字颜色
            fontSize: 12,                       //标题字体大小
            subtextFontSize: 12,                //副标题字体大小
            legendPosition: ['50%','25%'],      //图例离容器左侧和顶部的距离
            legendMaxRowNum: 5,                 //图例每列最多个数
            legendFontSize: 12,                 //图例字体大小
            tooltipConfine: false,              //是否将提示框限制在图表区域内
            tooltipUnit: '',                    //提示框单位
            clickFn: null                       //点击事件
        };
        var opts = assign(defaultOpts, options);
        var names = [],
            nums = [],
            length = data.length >= opts.legendMaxRowNum? opts.legendMaxRowNum : data.length,
            height = 15 * length + 10 * (length - 1);
        for (var i = 0; i < data.length; i++) {
            names.push({
                name: data[i].targetItem,
                icon: 'circle' //图例图标类型
            });
            nums.push({
                name: data[i].targetItem,
                value: data[i].actualTarget
            });
        }
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
                trigger: 'item',
                confine: opts.tooltipConfine,
                formatter: function (result){
                    var unit = opts.tooltipUnit;
                    if(parseInt(result.value).toString().length > 4){
                        result.value = (parseFloat(result.value) / 10000).toFixed(2);
                        if(opts.tooltipUnit.indexOf('万') > -1){
                            unit = unit.replace('万','亿');
                        }else{
                            unit = '万' + unit;
                        }
                    }
                    return result.name + '<br>' + result.value + unit + ' (' + result.percent + '%)';
                }
            }, this.__tooltipStyle);
        chart.setOption({
            title: {
                text: opts.text[0],
                subtext: opts.text[1],
                left: opts.textPosition[0],
                top: opts.textPosition[1],
                itemGap: 0,
                textAlign: 'center',
                triggerEvent: true, //是否触发事件
                textStyle: {
                    fontWeight: 'bold',
                    lineHeight: opts.fontSize,
                    fontSize: opts.fontSize,
                    color: opts.color
                },
                subtextStyle: {
                    fontWeight: 'bold',
                    lineHeight: opts.subtextFontSize,
                    fontSize: opts.subtextFontSize,
                    color: opts.color
                }
            },
            tooltip: tooltip, //提示框
            legend: { //图例
                left: opts.legendPosition[0],
                top: opts.legendPosition[1],
                height: height,
                orient: 'vertical',
                selectedMode: false, //选中图例是否改变系列的显示状态
                data: names,
                textStyle: {
                    lineHeight: 15, //行高最小为15px
                    fontSize: opts.legendFontSize
                }
            },
            series: [{
                type: 'pie', //图表类型
                radius: opts.radiusScale,
                center: opts.centerPosition,
                avoidLabelOverlap: false, //是否启用防止标签重叠策略
                data: nums,
                label: {
                    show: false //图表上是否显示数据
                }
            }]
        });
        opts.clickFn && (chart.on('click',opts.clickFn));
    },
    //简单环形图
    simplePieChart: function (data, chartID, options){
        var defaultOpts = {
            centerPosition: ['50%','50%'],  //饼图圆心位置，数组的元素分别对应离容器左侧和顶部的距离
            radiusScale: ['50%','70%'],     //饼图半径，对应内圈和外圈的大小
            textPosition: ['49%', '44%'],   //标题离容器左侧和顶部的距离
            text: '',                       //标题文本
            color: '#333',                  //标题文字颜色
            fontSize: 12,                   //标题字体大小
            subtextFontSize: 12,            //副标题字体大小
            tooltipText: ['', ''],          //提示框对应有色区域和灰色区域的文本
            clickFn: null                   //点击事件
        };
        var result;
        if(data.length == 1){
            result = parseFloat(data[0][0].actualTarget);
        }else{
            var one = data[0][0].actualTarget,
                all = data[1][0].actualTarget;
            result = one / all * 100;
        }
        var opts = assign(defaultOpts, options);
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
                trigger: 'item',
                formatter: function (result){
                    if(result.dataIndex == 0){
                        return opts.tooltipText[0];
                    }else{
                        return opts.tooltipText[1];
                    }
                }
            }, this._tooltipStyle);
        chart.setOption({
            title: {
                text: opts.text,
                subtext: result.toFixed(2) + '%',
                left: opts.textPosition[0],
                top: opts.textPosition[1],
                itemGap: 0,
                textAlign: 'center',
                triggerEvent: true,
                textStyle: {
                    fontWeight: 'bold',
                    lineHeight: opts.fontSize,
                    fontSize: opts.fontSize,
                    color: opts.color
                },
                subtextStyle: {
                    fontWeight: 'bold',
                    lineHeight: opts.subtextFontSize,
                    fontSize: opts.subtextFontSize,
                    color: opts.color
                }
            },
            tooltip: tooltip,
            series: [{
                type: 'pie',
                radius: opts.radiusScale,
                center: opts.centerPosition,
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启hover在扇区上的放大动画效果
                data: [{
                    name: '',
                    value: result,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0.5, 0.5, 1, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            offset: 0,
                            color: '#DDFF36'
                        }, {
                            offset: 1,
                            color: '#00FFA0'
                        }])
                    }
                }, {
                    name: '',
                    value: 100 - result,
                    itemStyle: {
                        color: '#000',
                        opacity: 0.5
                    }
                }],
                label: {
                    show: false
                }
            }]
        });
        opts.clickFn && (chart.on('click',opts.clickFn));
    },
    //显示引导线的环形图
    labelLinePieChart: function (data, chartID, options){
        var defaultOpts = {
            centerPosition: ['30%','50%'],  //饼图圆心离容器左侧和顶部的距离
            radiusScale: ['50%','70%'],     //饼图半径，对应内圈和外圈的大小
            legendPosition: ['50%','25%'],  //图例位置
            legendMaxRowNum: 5,             //图例每列最多个数
            legendFontSize: 12,             //图例字体大小
            labelLineLength: 10,            //引导线第一段长度
            labelLineLength2: 10,           //引导线第二段长度
            tooltipUnit: '',                //提示框单位
            clickFn: null                   //点击事件
        };
        var opts = assign(defaultOpts, options);
        var names = [],
            nums = [],
            length = data.length >= opts.legendMaxRowNum? opts.legendMaxRowNum : data.length,
            height = 15 * length + 10 * (length - 1);
        for (var i = 0; i < data.length; i++) {
            names.push({
                name: data[i].targetItem,
                icon: 'circle'
            });
            nums.push({
                value: data[i].actualTarget,
                name: data[i].targetItem
            });
        }
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
                trigger: 'item',
                formatter: function (result){
                    var unit = opts.tooltipUnit;
                    if(parseInt(result.value).toString().length > 4){
                        result.value = (parseFloat(result.value) / 10000).toFixed(2);
                        if(opts.tooltipUnit.indexOf('万') > -1){
                            unit = unit.replace('万','亿');
                        }else{
                            unit = '万' + unit;
                        }
                    }
                    return result.name + '<br>' + result.value + unit + ' (' + result.percent + '%)';
                }
            }, this._tooltipStyle);
        chart.setOption({
            tooltip: tooltip,
            legend: {
                left: opts.legendPosition[0],
                top: opts.legendPosition[1],
                height: height,
                orient: 'vertical',
                selectedMode: false,
                data: names,
                textStyle: {
                    lineHeight: 15,
                    fontSize: opts.legendFontSize
                }
            },
            series: [{
                type: 'pie',
                radius: opts.radiusScale,
                center: opts.centerPosition,
                avoidLabelOverlap: true,
                data: nums,
                label: {
                    lineHeight: 12,
                    formatter: '{b}：{c} ({d}%)'
                },
                labelLine: {
                    length: opts.labelLineLength,
                    length2: opts.labelLineLength2
                }
            }]
        });
        opts.clickFn && (chart.on('click',opts.clickFn));
    },
    //柱状图
    columnChart: function (data, chartID, options){
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
        var opts = assign(defaultOpts, options);
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
                itemStyle: this._colorList[0],
                barMaxWidth: 20,
                barCategoryGap: '30%' //柱间距离
            });
            series.push({
                type: 'bar',
                name: opts.legendName[1],
                data: seriesData2,
                itemStyle: this._colorList[1],
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
                    itemStyle: this._colorList[j],
                    barMaxWidth: 20,
                    barCategoryGap: '30%'
                });
            }
        }
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
                trigger: 'axis',
                formatter: function (result){
                    var returnVal = result[0].name;
                    for(var i = 0; i < result.length; i++){
                        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + result[i].color.colorStops[0].color + ';"></span>';
                        returnVal += '<br>' + marker + result[i].seriesName + '：' + result[i].value + opts.tooltipUnit;
                    }
                    return returnVal;
                }
            }, this._tooltipStyle);
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
    },
    //堆叠柱状图
    stackedBarChart: function (data, chartID, options) {
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
            clickFn: null,                  //点击事件
        };
        var opts = assign(defaultOpts, options);
        var xAxisNames = [],
            series = [],
            seriesData = [],
            sumName = opts.legendName[0],
            sumData = {};
        opts.legendName.shift();
        for(var i = 0; i < data.length; i++){
            seriesData.push([]);
            for(var j = 0; j < data[i].length; j++){
                if(i == 0){
                    xAxisNames.push(data[i][j].departmentName.replace(opts.xAxisFilter,''));
                    sumData[data[i][j].departmentName.replace(opts.xAxisFilter,'')] = data[i][j].actualTarget;
                    continue;
                }
                seriesData[i].push(data[i][j].actualTarget);
            }
            if(i == 0) continue;
            series.push({
                type: 'bar',
                name: opts.legendName[i-1],
                data: seriesData[i],
                itemStyle: this._colorList[i - 1],
                barMaxWidth: 20,
                barCategoryGap: '30%',
                stack: '1' //相同的stack值可以堆叠放置
            });
        }
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
                trigger: 'axis',
                formatter: function (result){
                    result.unshift({
                        seriesName: sumName,
                        value: sumData[result[0].name],
                        color: {
                            colorStops:[{ color: 'white' }]
                        }
                    });
                    var returnVal = result[1].name;
                    for(var i = 0; i < result.length; i++){
                        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + result[i].color.colorStops[0].color + ';"></span>';
                        i == 0 && (marker = '');
                        returnVal += '<br>' + marker + result[i].seriesName + '：' + result[i].value + opts.tooltipUnit;
                    }
                    return returnVal;
                }
            }, this._tooltipStyle);
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
                offset: 0,
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
                    formatter: function (value){
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
    },
    //条形图
    barChart: function (data, chartID, options){
    var defaultOpts = {
        gridLeft: 30,                   //图表距离容器左边界距离
        gridTop: 30,                    //上
        gridRight: 30,                  //右
        gridBottom: 30,                 //下
        tooltipUnit: '',                //提示框单位
        yAxisUnit: '',                  //Y轴单位
        yAxisFontSize: 12,              //Y轴字体大小
        yAxisFilter: '',                //Y轴过滤文字
        clickFn: null                   //点击事件
    };
    var opts = assign(defaultOpts, options);
    var names = [],
        nums = [];
        for(var i = 0; i < data[0].length; i++) {
            names.push(data[0][data[0].length - 1 - i].departmentName.replace(opts.yAxisFilter,''));
            nums.push(data[0][data[0].length - 1 - i].actualTarget);
        }
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
                trigger: 'item',
                formatter: '{b0}<br>{c0}' + opts.tooltipUnit,
            }, this._tooltipStyle);
        chart.setOption({
            tooltip: tooltip,
            grid: {
                left: opts.gridLeft,
                top: opts.gridTop,
                right: opts.gridRight,
                bottom: opts.gridBottom,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show: false
            },
            yAxis: {
                data: names,
                axisLabel: {
                    fontSize: opts.yAxisFontSize
                }
            },
            series: [{
                type: 'bar',
                data: nums,
                barWidth: 14,
                barGap: 10,
                smooth: true,
                label: {
                    show: true,
                    position: 'right',
                    offset: [5, 1],
                    textStyle: {
                        color: '#000',
                        fontSize: 13
                    },
                    formatter: '{c}' + opts.yAxisUnit
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0.5, 1, [{
                            offset: 0,
                            color: '#1595ff'
                        }, {
                            offset: 1,
                            color: '#12edff'
                        }]
                    )
                }
            }]
        });
    },
    //甘特图(时间跨度最大为本年1月到次年1月)
    ganttChart: function (data, chartID, options){
        var defaultOpts = {
            gridLeft: 0,       //图表距离容器左边界距离
            gridTop: 60,       //上
            gridRight: 30,     //右
            gridBottom: 30,    //下
            scale: 3,          //占据刻度,
            xAxisFontSize: 12, //X轴字体大小
            clickFn: null      //点击事件
        };
        var opts = assign(defaultOpts, options);
        var yAxisNames = [],
            assistData = [],
            series = [],
            year = data[0].date.slice(0,4),
            month = data[0].date.slice(4);
        for(var i = 0; i < data.length; i++) {
            yAxisNames.push(data[i].actualTarget);
            assistData.push(i * opts.scale);
            var seriesData = [];
            for(var j = 0; j < data.length; j++) {
                seriesData[j] = 0;
            }
            seriesData[i] = opts.scale * 1;
            series.push({
                type: 'bar',
                name: data[i].actualTarget,
                data: seriesData,
                barMaxWidth: 24,
                stack: '1',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#1595FF'
                    }, {
                        offset: 1,
                        color: '#12EDFF'
                    }])
                },
                label: { //图形上的文本标签
                    show: true,
                    fontSize: 13,
                    offset: [0, 2],
                    color: '#fff',
                    formatter: function(e) {
                        if (e.seriesIndex - 1 == e.dataIndex) {
                            return e.name
                        } else {
                            return ''
                        }
                    }
                }
            });
        }
        series.unshift({
            type: 'bar',
            name: 'blank',
            data: assistData,
            barMaxWidth: 24,
            stack: "1",
            itemStyle: {
                opacity: 0
            }
        });
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
                trigger: 'item',
                formatter: function(result){
                    if(result.seriesName == 'blank') return '';
                    var startYear = year * 1,
                        endYear = startYear,
                        startMonth = month * 1 + result.dataIndex * opts.scale,
                        endMonth = startMonth + opts.scale - 1;
                    if(endMonth > 12){
                        endYear += 1;
                        endMonth -= 12;
                        if(startMonth > 12){
                            startYear += 1;
                            startMonth -= 12;
                        }
                    }
                    return result.name + '<br>' + startYear + startMonth.toString().replace(/^(\d)$/,'0$1') + '~' + endYear + endMonth.toString().replace(/^(\d)$/,'0$1');
                }
            }, this._tooltipStyle);
        chart.setOption({
            tooltip: tooltip,
            grid: {
                left: opts.gridLeft,
                top: opts.gridTop,
                right: opts.gridRight,
                bottom: opts.gridBottom,
                containLabel: true
            },
            xAxis: [{
                type: 'value',
                axisLabel: {
                    color: '#666',
                    lineHeight: opts.xAxisFontSize,
                    fontSize: opts.xAxisFontSize,
                    formatter: function (value){
                        var thisYear = year * 1,
                            thisMonth = month * 1 + value;
                        thisMonth > 12 && (thisYear += 1, thisMonth -= 12);
                        thisYear + '' + (thisMonth).toString().replace(/^(\d)$/,'0$1');
                        return thisYear + '' + (thisMonth).toString().replace(/^(\d)$/,'0$1');

                    }
                }
            }],
            yAxis: [{
                show: false,
                //inverse: true, //是否是反向坐标轴
                data: yAxisNames
            }],
            series: series
        });
        opts.clickFn && (chart.on('click',opts.clickFn));
    },
    //折线图
    lineChart: function (data, chartID, options){
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
        var opts = assign(defaultOpts, options);
        var _colorList = [{
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
                itemStyle: _colorList[i],
                areaStyle: colorLinearList[i]
            });
        }
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
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
            }, this._tooltipStyle);
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
    },
    //柱状单折线图
    barLineChart: function (data, chartID, options){
        var defaultOpts = {
            gridLeft: 30,                   //图表距离容器左边界距离
            gridTop: 60,                    //上
            gridRight: 30,                  //右
            gridBottom: 30,                 //下
            legendTop: 10,                  //图例距离容器上边界距离
            legendName: ['',''],            //图例名称
            tooltipUnit: '',                //提示框单位
            xAxisFontSize: 12,              //X轴字体大小
            xAxisMaxCharNum: 2,             //X轴每行文字最大个数
            xAxisFilter: '',                //X轴过滤文字
            yAxisUnit: '',                  //Y轴单位
            dataZoomStyle: [0, 100, false], //图表和dataZoom组件的开始位置，结束位置以及是否显示dataZoom组件
            clickFn: null,                  //点击事件
        };
        var opts = assign(defaultOpts, options);
        var xAxisNames = [],
            seriesData1 = [],
            seriesData2 = [],
            series = [];
        for(var i = 0; i < data.length; i++){
            xAxisNames.push(data[i].departmentName.replace(opts.xAxisFilter,''));
            seriesData1.push(data[i].shouldTarget);
            seriesData2.push(data[i].actualTarget);
        }
        series.push({
            type: 'line',
            name: opts.legendName[0],
            data: seriesData1,
            itemStyle: {
                color: '#4ED552'
            }
        });
        series.push({
            type: 'bar',
            name: opts.legendName[1],
            data: seriesData2,
            barMaxWidth: 20,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1595ff'
                }, {
                    offset: 1,
                    color: '#8c53ca'
                }])
            }
        });
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
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
                        var color = result[i].color.colorStops? result[i].color.colorStops[0].color : result[i].color,
                            marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
                        returnVal += '<br>' + marker + result[i].seriesName + '：' + result[i].value + opts.tooltipUnit;
                    }
                    return returnVal;
                }
            }, this._tooltipStyle);
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
    },
    //柱状双折线图
    barDoubleLineChart: function (data, chartID, options){
        var defaultOpts = {
            gridLeft: 30,                   //图表距离容器左边界距离
            gridTop: 60,                    //上
            gridRight: 30,                  //右
            gridBottom: 30,                 //下
            legendTop: 10,                  //图例距离容器上边界距离
            legendName: ['', '', ''],       //图例名称
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
        var opts = assign(defaultOpts, options);

        var xAxisNames = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [],
            series = [];
        for(var i = 0; i < data[0].length; i++){
            xAxisNames.push(data[0][i].departmentName.replace(opts.xAxisFilter,''));
            seriesData1.push(data[0][i].actualTarget)
        }
        series.push({
            type: 'bar',
            name: opts.legendName[0],
            data: seriesData1,
            barMaxWidth: 20,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1595ff'
                }, {
                    offset: 1,
                    color: '#8c53ca'
                }])
            }
        });
        for(var j = 0; j < data[1].length; j++){
            seriesData2.push(data[1][j].actualTarget)
        }
        series.push({
            type: 'line',
            name: opts.legendName[1],
            data: seriesData2,
            itemStyle: {
                color: '#4ED552'
            }
        });
        for (var k = 0; k < data[2].length; k++) {
            seriesData3.push(data[2][k].actualTarget)
        }
        series.push({
            type: 'line',
            name: opts.legendName[2],
            data: seriesData3,
            itemStyle: {
                color: '#ff6161'
            }
        });
        var chart = echarts.init(document.getElementById(chartID), 'customed'),
            tooltip = assign({
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
                        var color = result[i].color.colorStops? result[i].color.colorStops[0].color : result[i].color,
                            marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
                        returnVal += '<br>' + marker + result[i].seriesName + '：' + result[i].value + opts.tooltipUnit;
                    }
                    return returnVal;
                }
            }, this._tooltipStyle);
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
            series: series
        });
    }
};
