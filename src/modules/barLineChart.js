import echarts from 'echarts'
import tooltipStyle from '../config/tooltipStyle'

//柱状单折线图
export default function (data, chartID, options){
    const defaultOpts = {
        gridLeft: 30,                   //图表距离容器左边界距离
        gridTop: 60,                    //上
        gridRight: 30,                  //右
        gridBottom: 30,                 //下
        legendTop: 10,                  //图例距离容器上边界距离
        legendName: ['', ''],            //图例名称
        tooltipUnit: '',                //提示框单位
        xAxisFontSize: 12,              //X轴字体大小
        xAxisMaxCharNum: 2,             //X轴每行文字最大个数
        xAxisFilter: '',                //X轴过滤文字
        yAxisUnit: '',                  //Y轴单位
        dataZoomStyle: [0, 100, false], //图表和dataZoom组件的开始位置，结束位置以及是否显示dataZoom组件
        clickFn: null,                  //点击事件
    }, opts = Object.assign(defaultOpts, options);
    let [xAxisNames, seriesData1, seriesData2, series] = [[], [], [], []];
    for(let i = 0; i < data.length; i++){
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
    let chart = echarts.init(document.getElementById(chartID), 'customed');
    const tooltip = Object.assign({
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
            let returnVal = result[0].name;
            for(let i = 0; i < result.length; i++){
                let color = result[i].color.colorStops? result[i].color.colorStops[0].color : result[i].color,
                    marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
                if(result[i].seriesName === ''){
                    returnVal += `<br>${result[i].value}${opts.tooltipUnit}`;
                }else{
                    returnVal += `<br>${marker}${result[i].seriesName}：${result[i].value}${opts.tooltipUnit}`;
                }
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
            data: xAxisNames,
            axisLabel: {
                lineHeight: opts.xAxisFontSize,
                fontSize: opts.xAxisFontSize,
                formatter: function (value){
                    let str = '',
                        maxLength = opts.xAxisMaxCharNum,
                        rowNum = Math.ceil(value.length / maxLength);
                    for(let i = 0; i < rowNum; i++) {
                        let part = value.slice(i * maxLength, (i + 1) * maxLength);
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
