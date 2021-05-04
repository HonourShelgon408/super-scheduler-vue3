module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,png,css,js,woff,ttf,html,json,txt,vue,jpg,jpeg,bmp,svg}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};