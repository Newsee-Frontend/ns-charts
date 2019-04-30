


import pieChart from './theme/barChart';
import simplePieChart from './theme/simplePieChart';
import labelLinePieChart from './theme/labelLinePieChart';
import columnChart from './theme/columnChart';
import stackedBarChart from './theme/stackedBarChart';
import barChart from './theme/barChart';
import ganttChart from './theme/ganttChart';
import lineChart from './theme/lineChart';
import barLineChart from './theme/barLineChart';
import barDoubleLineChart from './theme/barDoubleLineChart';

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
