import echarts from 'echarts'
import {toFixed} from '../utils'
import tooltipStyle from '../config/tooltipStyle'

//简单环形图
export default function (data, chartID, options) {
    const defaultOpts = {
        centerPosition: ['50%', '50%'],  //饼图圆心位置，数组的元素分别对应离容器左侧和顶部的距离
        radiusScale: ['50%', '70%'],     //饼图半径，对应内圈和外圈的大小
        textPosition: ['49%', '44%'],   //标题离容器左侧和顶部的距离
        text: '',                       //标题文本
        color: '#333',                  //标题文字颜色
        fontSize: 12,                   //标题字体大小
        subtextFontSize: 12,            //副标题字体大小
        tooltipText: ['', ''],          //提示框对应有色区域和灰色区域的文本
        clickFn: null                   //点击事件
    }, opts = Object.assign(defaultOpts, options);
    let result;
    if (data.length === 1) {
        result = parseFloat(data[0][0].actualTarget);
    } else {
        let one = data[0][0].actualTarget,
            all = data[1][0].actualTarget;
        result = one / all * 100;
    }
    let chart = echarts.init(document.getElementById(chartID), 'customed');
    const tooltip = Object.assign({
        trigger: 'item',
        formatter: function (result) {
            if (result.dataIndex === 0) {
                return opts.tooltipText[0];
            } else {
                return opts.tooltipText[1];
            }
        }
    }, tooltipStyle);
    chart.setOption({
        title: {
            text: opts.text,
            subtext: `${toFixed(result, 2)}%`,
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
    opts.clickFn && (chart.on('click', opts.clickFn));
};
