import pieChart from './modules/barChart';
import pieChart from './modules/simplePieChart';
import pieChart from './modules/labelLinePieChart';
import pieChart from './modules/columnChart';
import pieChart from './modules/stackedBarChart';
import pieChart from './modules/barChart';
import pieChart from './modules/ganttChart';
import pieChart from './modules/lineChart';
import pieChart from './modules/barLineChart';
import pieChart from './modules/barDoubleLineChart';

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
    _colorList: [
        {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                offset: 0,
                color: '#1595ff'
            }, {
                offset: 1,
                color: '#8c53ca'
            }])
        }
    },
        {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#ffa87a'
            }, {
                offset: 1,
                color: '#ff6161'
            }])
        }
    },
        {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a5ec27'
            }, {
                offset: 1,
                color: '#4ed552'
            }])
        }
    },
        {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#11d6cb'
            }, {
                offset: 1,
                color: '#23c8c4'
            }])
        }
    }
    ],
    //环形图
    ...pieChart,
    //简单环形图
    ...simplePieChart,
    //显示引导线的环形图
    ...labelLinePieChart,
    //柱状图
    ...columnChart,
    //堆叠柱状图
    ...stackedBarChart,
    //条形图
    ...barChart,
    //甘特图(时间跨度最大为本年1月到次年1月)
    ...ganttChart,
    //折线图
    ...lineChart,
    //柱状单折线图
    ...barLineChart,
    //柱状双折线图
    ...barDoubleLineChart
};
