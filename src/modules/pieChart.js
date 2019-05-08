import echarts from 'echarts'
import tooltipStyle from '../config/tooltipStyle'

//环形图
export default function (data, chartID, options){ // data--数据，chartID--放置图表的元素id，options包含了下列参数
    let defaultOpts = {
        centerPosition: ['30%', '50%'],      //饼图圆心离容器左侧和顶部的距离
        radiusScale: ['50%', '70%'],         //饼图半径，对应内圈和外圈的大小
        textPosition: ['29%', '44%'],       //标题离容器左侧和顶部的距离
        text: ['', ''],                     //标题和副标题文本
        color: '#333',                      //标题文字颜色
        fontSize: 12,                       //标题字体大小
        subtextFontSize: 12,                //副标题字体大小
        legendPosition: ['50%', '25%'],      //图例离容器左侧和顶部的距离
        legendMaxRowNum: 5,                 //图例每列最多个数
        legendFontSize: 12,                 //图例字体大小
        tooltipConfine: false,              //是否将提示框限制在图表区域内
        tooltipUnit: '',                    //提示框单位
        clickFn: null                       //点击事件
    };
    const opts = Object.assign(defaultOpts, options);
    let names = [],
        nums = [],
        length = data.length >= opts.legendMaxRowNum? opts.legendMaxRowNum : data.length,
        height = 15 * length + 10 * (length - 1);
    for (let i = 0; i < data.length; i++) {
        names.push({
            name: data[i].targetItem,
            icon: 'circle' //图例图标类型
        });
        nums.push({
            name: data[i].targetItem,
            value: data[i].actualTarget
        });
    }
    let chart = echarts.init(document.getElementById(chartID), 'customed');
    const tooltip = Object.assign({
        trigger: 'item',
        confine: opts.tooltipConfine,
        formatter: function (result){
            let unit = opts.tooltipUnit;
            if(parseInt(result.value).toString().length > 4){
                result.value = (parseFloat(result.value) / 10000).toFixed(2);
                if(opts.tooltipUnit.indexOf('万') > -1){
                    unit = unit.replace('万','亿');
                }else{
                    unit = `万${unit}`;
                }
            }
            return `${result.name}<br>${result.value}${unit} (${result.percent}%)`;
        }
    }, tooltipStyle);
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
};
