# export css loader for webpack

## installation

`npm install export-css-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
require("export-css!css!./file.css");
```

Writes css code into a output file ( `[options.output.path]/[name].css` ).

This loader *MUST* be added before css-loader.

[css-loader](https://github.com/webpack/css-loader)

### Example config

This webpack config can load css files, embed small png images as Data Urls and jpg images as files.

``` javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: "export-css-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  }
};
```

### Query Parameters

- remove {boolean | Default to `false`}

Remove CSS content from module to reduce the size of the bundle.

- write {boolean | Default to `true`}

Write CSS content into css file.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
