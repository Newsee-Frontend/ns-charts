import echarts from 'echarts'
import tooltipStyle from '../config/tooltipStyle'
import colorList from '../config/colorList'

//堆叠柱状图
export default function (data, chartID, options) {
    const defaultOpts = {
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
    }, opts = Object.assign(defaultOpts, options);
    let [xAxisNames, seriesData, series, sumName, sumData] = [[], [], [], opts.legendName[0], {}];
    opts.legendName.shift();
    for (let i = 0; i < data.length; i++) {
        seriesData.push([]);
        for (let j = 0; j < data[i].length; j++) {
            if (i === 0) {
                xAxisNames.push(data[i][j].departmentName.replace(opts.xAxisFilter, ''));
                sumData[data[i][j].departmentName.replace(opts.xAxisFilter, '')] = data[i][j].actualTarget;
                continue;
            }
            seriesData[i].push(data[i][j].actualTarget);
        }
        if (i === 0) continue;
        series.push({
            type: 'bar',
            name: opts.legendName[i - 1],
            data: seriesData[i],
            itemStyle: colorList[i - 1],
            barMaxWidth: 20,
            barCategoryGap: '30%',
            stack: '1' //相同的stack值可以堆叠放置
        });
    }
    let chart = echarts.init(document.getElementById(chartID), 'customed');
    const tooltip = Object.assign({
        trigger: 'axis',
        formatter: function (result) {
            result.unshift({
                seriesName: sumName,
                value: sumData[result[0].name],
                color: {
                    colorStops: [{color: 'white'}]
                }
            });
            let returnVal = result[1].name;
            for (let i = 0; i < result.length; i++) {
                let marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + result[i].color.colorStops[0].color + ';"></span>';
                i === 0 && (marker = '');
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
            offset: 0,
            data: xAxisNames,
            axisLabel: {
                lineHeight: opts.xAxisFontSize,
                fontSize: opts.xAxisFontSize,
                formatter: function (value) {
                    let str = '',
                        maxLength = opts.xAxisMaxCharNum,
                        rowNum = Math.ceil(value.length / maxLength);
                    for (let i = 0; i < rowNum; i++) {
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
                formatter: function (value) {
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
};
