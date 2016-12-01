const fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Generate entries
const entry = {
    style: './frontend/less/index.less',
};
const templates = {};
const imageDirs = [];
function processDirEntries(name, parentName = null) {
    ['js', 'less', 'html'].forEach(ext => {
        if (fs.existsSync(`${__dirname}/frontend/${name}/index.${ext}`)) {
            const key = name.replace(/\//g, '-');
            if (ext === 'html') {
                const path = `./${name}/index.${ext}`;
                templates[key] = path;
                if (parentName) {
                    const parentKey = parentName.replace(/\//g, '-');
                    if (!Array.isArray(templates[parentKey])) {
                        templates[parentKey] = [];
                    }
                    templates[parentKey].push(path)
                }
            } else if (!entry[key]) {
                entry[key] = `./frontend/${name}/index.${ext}`;
            }
        }
    });

    if (fs.existsSync(`${__dirname}/frontend/${name}/images`)) {
        imageDirs.push({
            from: `frontend/${name}/images`,
            to: `images`,
        });
    }
}
fs.readdirSync(`${__dirname}/frontend`).forEach(name => {
    if (name === 'less' || !fs.lstatSync(`${__dirname}/frontend/${name}`).isDirectory()) {
        return;
    }

    fs.readdirSync(`${__dirname}/frontend/${name}`).forEach(subname => {
        processDirEntries(`${name}/${subname}`, name);
    });
    processDirEntries(name);
});

const webpackEasy = require('webpack-easy');

webpackEasy
    .entry(entry)
    .output({
        path: `${__dirname}/public/`,
        filename: 'assets/bundle-[name].js',
        chunkFilename: 'assets/bundle-[name].js',
    })
    .serverConfig({
        contentBase: './public',
        historyApiFallback: true,
        proxy: {
            '**': 'http://localhost',
        },
        staticOptions: {
            '**': 'http://localhost',
        },
    })
    .loader({
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?' + JSON.stringify({
                hash: 'sha512',
                digest: 'hex',
                name: 'images/[hash].[ext]'
            }),
            'image-webpack?' + JSON.stringify({
                bypassOnDebug: true,
                optimizationLevel: 7,
                interlaced: false
            }),
        ]
    })
    .plugin([
        imageDirs.length > 0 && new CopyWebpackPlugin(imageDirs),
        !webpackEasy.isProduction() && new HtmlWebpackPlugin({
            template: 'frontend/index.html',
            filename: 'index.html',
            TEMPLATE_NAMES: Object.keys(templates),
            inject: false,
        }),
    ])
    .plugin(Object.keys(templates).map(name => {
        return new HtmlWebpackPlugin({
            template: 'frontend/index.html',
            filename: name + '.html',
            inject: false,
            BUNDLE_NAME: name,
            FILES_TO_REQUIRE: [].concat(templates[name])
        });
    }));
