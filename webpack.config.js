module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults and not IE 11" }]
            ],
            plugins: ['@babel/transform-runtime']
          }
        }
      }
    ]
  }
}
