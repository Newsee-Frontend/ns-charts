import echarts from 'echarts'
import tooltipStyle from '../config/tooltipStyle'

//条形图
export default function (data, chartID, options) {
    const defaultOpts = {
        gridLeft: 30,                   //图表距离容器左边界距离
        gridTop: 30,                    //上
        gridRight: 30,                  //右
        gridBottom: 30,                 //下
        tooltipUnit: '',                //提示框单位
        yAxisUnit: '',                  //Y轴单位
        yAxisFontSize: 12,              //Y轴字体大小
        yAxisFilter: '',                //Y轴过滤文字
        clickFn: null,                  //点击事件
        keyRef: {},
    }, opts = Object.assign(defaultOpts, options);
    if (Object.keys(opts.keyRef).length) {
      data[0].forEach(i => {
        Object.keys(opts.keyRef).forEach(key => {
          i[key] = i[opts.keyRef[key]];
        });
      });
    }
    let [names, nums] = [[], []];
    for (let i = 0; i < data[0].length; i++) {
        names.push(data[0][data[0].length - 1 - i].departmentName.replace(opts.yAxisFilter, ''));
        nums.push(data[0][data[0].length - 1 - i].actualTarget);
    }
    let chart = echarts.init(document.getElementById(chartID), 'customed');
    const tooltip = Object.assign({
        trigger: 'item',
        formatter: `{b0}<br>{c0}${opts.tooltipUnit}`,
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
                formatter: `{c}${opts.yAxisUnit}`
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
    opts.clickFn && (chart.on('click', (result)=>{ opts.clickFn(result,data); }));
};
