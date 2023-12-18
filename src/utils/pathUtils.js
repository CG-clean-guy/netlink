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
export function convertPath(path, pathType, user, selectedOption) {
    switch (pathType) {
        case 'windows':
            // Assuming path is like G:\Some\Directory
            const [, driveLetter, restOfWinPath] = path.match(/^([A-Z]):\\(.*)$/);
            if (driveLetter.toLowerCase() === 'g') {
                const convertedPath = `/Users/${user.user}/Library/CloudStorage/GoogleDrive-${user.guser}/${restOfWinPath.replace(/\\/g, '/')}`;
                return { convertedPath, notification: "Converted G-Drive path from Windows to Mac" };
            } else {
                const networkDrive = driveLetter.toLowerCase() === 'k' ? 'Media' : 'Media-1';
                const convertedPath = `/${networkDrive}/${restOfWinPath.replace(/\\/g, '/')}`;
                return {convertedPath: `/Volumes${convertedPath}`, notification: null};
            }
        case 'mac':
            if (selectedOption==="ACE" && path.startsWith('/Volumes/Media-1')) {
                    return {convertedPath: path.replace(/^\/Volumes\/Media-1\//, 'A:\\').replace(/\//g, '\\'), notification: "ACE Drive Path Copied to Windows"};
                }            
            else if (selectedOption==="ACE" && path.startsWith('/Volumes/Media')) {
                    return {convertedPath: path.replace(/^\/Volumes\/Media\//, 'A:\\').replace(/\//g, '\\'), notification: "ACE Drive Path Copied to Windows"};
                }
            else if (selectedOption==="KEN" && path.startsWith('/Volumes/Media-1')) {
                    return {convertedPath: path.replace(/^\/Volumes\/Media-1\//, 'K:\\').replace(/\//g, '\\'), notification: "KEN Drive Path Copied to Windows"};
                }
            else if (selectedOption==="KEN" && path.startsWith('/Volumes/Media')) {
                    return {convertedPath: path.replace(/^\/Volumes\/Media\//, 'K:\\').replace(/\//g, '\\'), notification: "KEN Drive Path Copied to Windows"};
                }
            else if (selectedOption==="GOOGLE" && path.includes('Shared drives/')) {
                return {convertedPath: path.replace(/.*Shared drives\//, 'G:\\Shared drives\\').replace(/\//g, '\\'), notification: "G Drive Path Copied to Windows"};
                }
            else if (selectedOption==="GOOGLE" && path.includes('Shared Drives/')) {
                    return {convertedPath: path.replace(/.*Shared Drives\//, 'G:\\Shared Drives\\').replace(/\//g, '\\'), notification: "G Drive Path Copied to Windows"};
            } 
            else {
                return {convertedPath: path, notification: "Invalid MAC Path: Please Check Your Link And Try Again"}; // handle invalid Mac path
            }
        case 'network':
            return {convertedPath: path.replace(/^\/\/|\\\\/, 'smb://').replace(/\\/g, '/'), notification: null};
        default:
            return {convertedPath: path, notification: null}; // or throw an error if invalid path
    }
}