<template>
    <div class="ns-charts-demo">
        <h1>ns-charts-demo</h1>
        <div v-for="index in list"
             :key="index"
             class="charts-blcok"
             :id="`charts-blcok-${index + 1}`"
             :style="{width: (index + 1) === 3?'500px':null}"
        >
        </div>
    </div>
</template>

<script>
    import nsCharts from '../../../../es/ns-charts.min'

    const baseUrl = '../../static/chartsData';
    export default {
        name: 'ns-charts-demo',
        data() {
            return {
                list: []
            }
        },
        created() {
            console.log('ns-charts 模块导入：');
            console.log(nsCharts);
            this.list = [...Array(10).keys()];
        },
        mounted() {
            //环形图
            $.get(`${baseUrl}/pie.json`, function (data) {
                nsCharts.pieChart(data, 'charts-blcok-1', {
                    centerPosition: ['30%', '50%'],
                    radiusScale: ['52%', '68%'],
                    legendPosition: ['56%', '26%'],
                    textPosition: ['29%', '44%'],
                    text: ['各业态', '收入占比'],
                    centerFontSize: 14,
                    legendMaxRowNum: 4,
                    tooltipUnit: '元',
                    clickFn: function (result) {
                        alert(result.name + '\n' + result.value + '万元 (' + result.percent + '%)');
                    }
                });
            });
            //简单环形图
            $.get(`${baseUrl}/pie.simple.json`, function (data) {
                nsCharts.simplePieChart(data, 'charts-blcok-2', {
                    radiusScale: ['52%', '68%'],
                    text: '完成率',
                    tooltipText: ['', '未完成项<br>1. 项目一<br>2. 项目二']
                });
            });
            //引导线环形图
            $.get(`${baseUrl}/pie.json`, function (data) {
                nsCharts.labelLinePieChart(data, 'charts-blcok-3', {
                    radiusScale: ['16%', '68%'],
                    centerPosition: ['42%', '50%'],
                    legendPosition: ['83%', '6%'],
                    legendMaxRowNum: 7,
                    tooltipUnit: '个'
                });
            });
            //柱状图
            $.get(`${baseUrl}/bar.column.json`, function (data) {
                nsCharts.columnChart(data, 'charts-blcok-4', {
                    gridLeft: 10,
                    gridTop: 50,
                    gridRight: 30,
                    gridBottom: 10,
                    tooltipUnit: '万元',
                    legendName: ['指标一', '指标二', '指标三'],
                    xAxisMaxCharNum: 3,
                    xAxisFilter: '城市公司',
                    yAxisSplitNum: 2,
                    dataZoomStyle: [0, 50, false]
                });
            });
            //柱状图(含计划)
            $.get(`${baseUrl}/bar.column-showplan.json`, function (data) {
                nsCharts.columnChart(data, 'charts-blcok-5', {
                    gridLeft: 10,
                    gridTop: 50,
                    gridRight: 30,
                    gridBottom: -10,
                    tooltipUnit: '万元',
                    legendName: ['计划', '实际'],
                    dataZoomStyle: [0, 50, false],
                    showPlan: true
                });
            });
            //堆叠柱状图
            $.get(`${baseUrl}/bar.stacked.json`, function (data) {
                nsCharts.stackedBarChart(data, 'charts-blcok-6', {
                    gridLeft: 10,
                    gridTop: 50,
                    gridRight: 30,
                    gridBottom: -10,
                    tooltipUnit: '万元',
                    legendName: ['总营收', '本年营收', '往年营收']
                });
            });
            //条形图
            $.get(`${baseUrl}/bar.column-showplan.json`, function (data) {
                nsCharts.barChart(data, 'charts-blcok-7', {
                    gridLeft: 10,
                    gridTop: 10,
                    gridRight: 50,
                    gridBottom: -30,
                    tooltipUnit: '万元',
                    // yAxisUnit: '万元'
                });
            });
            //甘特图
            $.get(`${baseUrl}/bar.gantt.json`, function (data) {
                nsCharts.ganttChart(data, 'charts-blcok-8', {
                    // scale: 3
                });
            });
            //折线图
            $.get(`${baseUrl}/line.json`, function (data) {
                nsCharts.lineChart(data, 'charts-blcok-9', {
                    gridLeft: 10,
                    gridTop: 50,
                    gridRight: 30,
                    gridBottom: 10,
                    tooltipUnit: '%',
                    legendName: ['X公司', 'Y公司']
                });
            });
            //柱状单折线
            $.get(`${baseUrl}/bar.line.json`, function (data) {
                nsCharts.barLineChart(data, 'charts-blcok-10', {
                    gridLeft: 10,
                    gridTop: 50,
                    gridRight: 30,
                    gridBottom: -10,
                    legendName: ['计划', '实际'],
                    tooltipUnit: '元',
                    yAxisSplitNum: 2
                });
            });
            //柱状双折线
            $.get(`${baseUrl}/line.bar.json`, function (data) {
                nsCharts.barDoubleLineChart(data, 'charts-blcok-11', {
                    gridLeft: 10,
                    gridTop: 50,
                    gridRight: 30,
                    gridBottom: -10,
                    legendName: ['净增长合同额', '接管合同额', '撤管合同额']
                });
            });
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
