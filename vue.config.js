module.exports = {
    pages: {
        "index": {
            "entry": './src/main.js',
            "title": "Super Scheduler"
        }
    },
    pwa: {
        // workboxPluginMode: 'InjectManifest',
        // workboxOptions: {
        //     // swSrc: 'public/sw.js',
        //     // exclude: [
        //     //     /\.map$/, 
        //     //     /manifest\.json$/ 
        //     // ],
        // },
        
        manifestPath: './manifest.json',
        manifestOptions: {
            "name": "Super Scheduler",
            "short_name": "S.Scheduler",
            "lang": "en-UK",
            "orientation": "portrait",
            "start_url": ".",
            "display": "standalone",
            // "background_color": "#25e6a6",
            // "theme_color": "#25e6a6",
            "background_color": "#03a9f4",
            "theme_color": "#03a9f4",
            "icons": [
                {
                    "src": "./assets/ss192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "./assets/ss192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "./assets/ss196.png",
                    "sizes": "196x196",
                    "type": "image/png"
                },
                {
                    "src": "./assets/ss512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "./assets/ssMaskable48.png",
                    "sizes": "48x48",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "./assets/ssMaskable192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "./assets/ssMaskable512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ]
        },
    }
}