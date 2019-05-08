
import echarts from 'echarts'

const packageJson = require('../package.json');
const version = packageJson.version;

import themeInit from './config/theme-init';

echarts.registerTheme('customed', themeInit);


//环形图
import pieChart from './modules/pieChart';

//简单环形图
import simplePieChart from './modules/simplePieChart';
//显示引导线的环形图
import labelLinePieChart from './modules/labelLinePieChart';
//柱状图
import columnChart from './modules/columnChart';
//堆叠柱状图
import stackedBarChart from './modules/stackedBarChart';
//条形图
import barChart from './modules/barChart';
//甘特图(时间跨度最大为本年1月到次年1月)
import ganttChart from './modules/ganttChart';
//折线图
import lineChart from './modules/lineChart';
//柱状单折线图
import barLineChart from './modules/barLineChart';
//柱状双折线图
import barDoubleLineChart from './modules/barDoubleLineChart';

const testgcx = function () {
    return '高仓雄'
};

export {
    version,
    testgcx,

    pieChart,


    simplePieChart,

    labelLinePieChart,

    columnChart,

    stackedBarChart,

    barChart,

    ganttChart,

    lineChart,

    barLineChart,

    barDoubleLineChart
}

export default {
    version,
    testgcx,
    pieChart,

    simplePieChart,

    labelLinePieChart,

    columnChart,

    stackedBarChart,

    barChart,

    ganttChart,

    lineChart,

    barLineChart,

    barDoubleLineChart
};
