var url = 'http://10.1.101.120:501' // 公共请求路径
if (process.env.NODE_ENV === 'development') {
} else {
    url = location.protocol + '//' + window.location.host
}
export default {
    url
}