/**
 * 修复浮点数精度丢失的引起“四舍五不入”问题(Chrome/Firefox)
 * @param num
 * @param len
 * @returns {string}
 */

export const toFixed = (result,num, len) => {
    const mul = Math.pow(10, len);
    let temp = Math.round(num * mul) / mul + '';//null+''不会引起报错
    if (len !== 0) {
        temp.indexOf('.') === -1 && (temp += '.');//保留小数时加小数点
        const num = temp.length - temp.indexOf('.') - 1;//获取小数点后0的个数
        for (let i = 0; i < len - num; i++) {//补0
            temp += '0';
        }
    }
    return temp;
};
