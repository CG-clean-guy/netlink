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
                const driveLetterMap = {
                    'ACE': 'A',
                    'KEN': 'K',
                    'GOOGLE': 'G',
                };
    
                const driveLetters = driveLetterMap[selectedOption];
    
                if (driveLetters) {
                    if (path.startsWith(`/Volumes/Media`)) {
                        // Replace '/Volumes/Media' and any number that follows with the drive letter
                        const convertedPath = path.replace(/^\/Volumes\/Media(-\d+)?\//, `${driveLetters}:\\`).replace(/\//g, '\\');
                        const notification = `${selectedOption} Drive Path Copied to Windows`;
                        return { convertedPath, notification };
                    } else if (selectedOption === "GOOGLE" && (path.includes('Shared drives/') || path.includes('Shared Drives/'))) {
                        // Handle GOOGLE option with "Shared drives" or "Shared Drives"
                        const prefix = path.includes('Shared drives/') ? 'Shared drives' : 'Shared Drives';
                        const convertedPath = path.replace(new RegExp(`.*${prefix}/`), `${driveLetters}:\\${prefix}\\`).replace(/\//g, '\\');
                        const notification = "G Drive Path Copied to Windows";
                        return { convertedPath, notification };
                    }
                }
                // If driveLetters is undefined, handle as an invalid MAC path
                return { convertedPath: path, notification: "Invalid MAC Path: Please Check Your Link And Try Again" };
            // ... (remaining cases)
              default: 
        return { convertedPath: path, notification: null 
        }
        // Return a default object if no matching case is found
      
    }
}