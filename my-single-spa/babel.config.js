module.exports = function (api) {
    // 缓存 babel 的配置
    api.cache(true); // 等同于 api.cache.forever()
    return {
        presets: [
            ['@babel/preset-env', {module: false}]
        ],
        plugins:['@babel/plugin-syntax-dynamic-import']
    }
}