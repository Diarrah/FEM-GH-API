const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'service-worker.js', //takes the base SW
    swDest: 'service-worker.js',//put a new name here incase new SW you want
    globDirectory: '../build',
    globPatterns: [
      '**/*.{js,css,html,png,svg}',
    ]
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
}

buildSW();