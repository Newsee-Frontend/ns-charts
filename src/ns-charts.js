import echarts from 'echarts';
import themeInit from 'config/theme-init';

echarts.registerTheme('customed', themeInit);


import pieChart from './modules/barChart';
import simplePieChart from './modules/simplePieChart';
import labelLinePieChart from './modules/labelLinePieChart';
import columnChart from './modules/columnChart';
import stackedBarChart from './modules/stackedBarChart';
import barChart from './modules/barChart';
import ganttChart from './modules/ganttChart';
import lineChart from './modules/lineChart';
import barLineChart from './modules/barLineChart';
import barDoubleLineChart from './modules/barDoubleLineChart';

export default {
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
