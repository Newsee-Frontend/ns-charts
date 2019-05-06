import echarts from 'echarts'
import tooltipStyle from '../config/tooltipStyle'

//甘特图(时间跨度最大为本年1月到次年1月)
export default function (data, chartID, options){
    const defaultOpts = {
        gridLeft: 0,       //图表距离容器左边界距离
        gridTop: 60,       //上
        gridRight: 30,     //右
        gridBottom: 30,    //下
        scale: 3,          //占据刻度,
        xAxisFontSize: 12, //X轴字体大小
        clickFn: null      //点击事件
    }, opts = Object.assign(defaultOpts, options);
    let [yAxisNames, assistData, series] = [[], [], []];
    const [year, month] = [data[0].date.slice(0,4), data[0].date.slice(4)];
    for(let i = 0; i < data.length; i++) {
        yAxisNames.push(data[i].actualTarget);
        assistData.push(i * opts.scale);
        let seriesData = [];
        for(let j = 0; j < data.length; j++) {
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
                    if (e.seriesIndex - 1 === e.dataIndex) {
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
    let chart = echarts.init(document.getElementById(chartID), 'customed');
    const tooltip = Object.assign({
        trigger: 'item',
        formatter: function(result){
            if(result.seriesName === 'blank') return '';
            let startYear = year * 1,
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
            return `${result.name}<br>${startYear}${startMonth.toString().replace(/^(\d)$/,'0$1')}~${endYear}${endMonth.toString().replace(/^(\d)$/,'0$1')}`;
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
        xAxis: [{
            type: 'value',
            axisLabel: {
                color: '#666',
                lineHeight: opts.xAxisFontSize,
                fontSize: opts.xAxisFontSize,
                formatter: function (value){
                    let thisYear = year * 1,
                        thisMonth = month * 1 + value;
                    thisMonth > 12 && (thisYear += 1, thisMonth -= 12);
                    return `${thisYear}${thisMonth.toString().replace(/^(\d)$/,'0$1')}`;

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
};
