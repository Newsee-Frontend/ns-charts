// 环形图
// commonPieChart(data, chartID, options)
// data             数据
// chartID	        放置图表的元素id
// options包含了下列参数
// radiuPosition    环形图圆心位置，，数组的元素分别对应离容器左侧和顶部的距离，默认值为['30%','50%']
// radiusScale      饼图半径，对应内圈和外圈的大小，默认值为['50%','70%']
// legendPosition   图例位置，默认值为['50%','25%']
// formatterName    中心文字内容，默认值为function(){ return ''; }
var pieChart = function (data, chartID, options) {
    var defaultOpts = {
        centerPosition: ['30%','50%'], //圆心left, top
        radiusScale: ['50%','70%'],    //半径inner, outer
        legendPosition: ['50%','25%'], //图例left, top
        formatterName: function(){ return ''; },
        maxRowNum: 5
    };
    var opts = assign(defaultOpts, options);
    var pie = echarts.init(document.getElementById(chartID), 'customed');
    var names = [],
        nums = [],
        length = data.length >= opts.maxRowNum? opts.maxRowNum : data.length,
        height = 24 * length + 10 * (length - 1);
    for (var i = 0; i < data.length; i++) {
        names.push({
            icon: 'pin',
            name: data[i].targetItem
        });
        nums.push({
            name: data[i].targetItem,
            value: data[i].actualTarget
        });
    }
    pie.setOption({
        tooltip: {//提示框
            trigger: 'item',
            show: true,
            formatter: '{b}: {c} ({d}%)',
            width: '159px',
            height: '64px',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#e5e5e5',
            padding: [
                11,
                16,
                11,
                16,
            ],
            textStyle: {
                color: '#333',
                fontSize: 14,
                fontFamily: 'PingFangSC-Regular'
            },
            extraCssText: 'box-shadow: 0 3px 6px 0 rgba(0,0,0,0.24);'
        },
        legend: {//图例
            left: opts.legendPosition[0],
            top: opts.legendPosition[1],
            height: height,
            orient: 'vertical',
            selectedMode: false,
            data: names
        },
        series: [{
            type: 'pie',//图表类型
            radius: opts.radiusScale,
            center: opts.centerPosition,
            avoidLabelOverlap: false,
            data: nums,//图表数据
            itemStyle: {
                normal: {
                    label: {
                        position: 'center',
                        textStyle: {
                            color: '#4b4b4b',
                            fontSize: 12,
                            lineHeight: 12
                        },
                        formatter: opts.formatterName
                    },
                    labelLine: {
                        length: 30,
                        length2: 15,
                        show: false
                    }
                }
            }
        }]
    });
};