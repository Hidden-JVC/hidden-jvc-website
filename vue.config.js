module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/hidden-jvc-website/' : '/',
    transpileDependencies: [
        'vuetify'
    ]
};
