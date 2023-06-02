const fileSystem = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execSync } = require('node:child_process');

if (os.arch() !== 'arm64' && os.platform() !== 'darwin') {
    throw Error('Arch or Platform not supported');
}

const libwebp = {
    'arm64-darwin': path.resolve(path.join(__dirname, 'libwebp-1.3.0-rc1-mac-arm64', 'bin'))
}

const PUBLIC_PATH = path.resolve(path.join(__dirname, '..', 'public'));

const filePath = (...args) => path.resolve(path.join(PUBLIC_PATH, ...args));

(function() {
    const dir = fileSystem.readdirSync(PUBLIC_PATH, {
        encoding: 'utf-8',
        withFileTypes: true
    });

    const jpegFiles = dir.filter(({ name }) => name.endsWith('.jpg') || name.endsWith('.jpeg'));

    for (const { name } of jpegFiles) {
        fileSystem.copyFileSync(filePath(name), filePath(name + '.copy'))
        const nameWithoutType =  name.slice(0, name.length - (name.endsWith('.jpg') ? 4 : 5));
        execSync(libwebp[os.arch + '-' + os.platform] + '/cwebp' + ' -q 80 ' + filePath(name) +  ' -o ' + filePath(nameWithoutType) + '.webp');
        fileSystem.rmSync(filePath(name));
        fileSystem.rmSync(filePath(name + '.copy'));
    }
})();
