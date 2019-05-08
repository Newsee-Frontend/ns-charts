import echarts from 'echarts'
import tooltipStyle from '../config/tooltipStyle'

//柱状双折线图
export default function (data, chartID, options){
    const defaultOpts = {
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
    const opts = Object.assign(defaultOpts, options);
    let [xAxisNames, seriesData1, seriesData2, seriesData3, series] = [[], [], [], [], []];
    for(let i = 0; i < data[0].length; i++){
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
    for(let j = 0; j < data[1].length; j++){
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
    for (let k = 0; k < data[2].length; k++) {
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
        series: series
    });
};
