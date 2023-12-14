// pathUtils.js

// Checks if the path is a valid Windows path
const isValidWindowsPath = (path) => /^[a-zA-Z]:\\/.test(path);

// Checks if the path is a valid macOS path
const isValidMacPath = (path) => /^\//.test(path);

export function detectPathType(path) {
    if (isValidWindowsPath(path)) {
        return 'windows';
    } else if (isValidMacPath(path)) {
        return 'mac';
    } else {
        return 'invalid'; // Return 'invalid' for unrecognized paths
    }
}


// Converts the path to the opposite format
export function convertPath(path, pathType) {
    switch (pathType) {
        case 'windows':
            // Assuming path is like G:\Some\Directory
            const [, driveLetter, restOfWinPath] = path.match(/^([A-Z]):\\(.*)$/);
            if (driveLetter.toLowerCase() === 'g') {
                return restOfWinPath.replace(/\\/g, '/');
            } else {
                const networkDrive = driveLetter === 'K' ? 'Media' : 'Media-1';
                const convertedPath = `/${networkDrive}/${restOfWinPath.replace(/\\/g, '/')}`;
                return `/Volumes${convertedPath}`;
            }
        case 'mac':
            // Assuming path is like /user/jcrsoohf/dfajofj/Shared drives/Creative/Product Labels/_Packaging/HOL373 - Deluxe Clean, Shine, & Protect Car Detailing Kit
            if (path.startsWith('/Volumes/Media-1')) {
                return path.replace(/^\/Volumes\/Media-1\//, 'A:\\').replace(/\//g, '\\');
            } else if (path.includes('/Shared drives/')) {
                return path.replace(/.*\/Shared drives\//, 'G:\\Shared Drives\\').replace(/\//g, '\\');
            } else if (path.startsWith('/Volumes/Media')) {
                return path.replace(/^\/Volumes\/Media\//, 'K:\\').replace(/\//g, '\\');
            } else {
                return path; // handle invalid Mac path
            }
        case 'network':
            return path.replace(/^\/\/|\\\\/, 'smb://').replace(/\\/g, '/');
        default:
            return path; // or throw an error if invalid path
    }
}













