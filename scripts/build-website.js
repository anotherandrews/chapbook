const cpy = require('cpy');
const fs = require('fs-extra');
const pug = require('pug');

const pkg = require('../package.json');

fs.mkdirp('docs')
	.then(() =>
		fs.writeFile(
			'docs/index.html',
			pug.renderFile('homepage/index.pug', pkg)
		)
	)
	.then(() => cpy('homepage/*{.css,.jpeg}', 'docs'))
	.then(() => fs.mkdirp('docs/examples'))
	.then(() => cpy('examples/cloak-of-darkness.*', 'docs/examples'))
	.then(() => fs.mkdirp('docs/guide'))
	.then(() =>
		cpy('**', '../../docs/guide', {cwd: 'guide/_book/', parents: true})
	)
	.then(() => fs.mkdirp(`docs/use/${pkg.version}`))
	.then(() =>
		cpy(
			`dist/chapbook-${pkg.version}/format.js`,
			`docs/use/${pkg.version}/`
		)
	)
	.then(() => console.log('Wrote files to docs/.'));
