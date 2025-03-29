export const regexUrlWithVariables = /^(https?:\/\/)?([\w.-]+)?(:\d+)?(\/(\$\{[\w.]+\}|[\w.-]*))*$/;
export const regexGetVariableByThis = /\${this\.(\w+)}/g;
export const regexGetVariables = /\${([^}]*)}/g;
export const regexWatchDoubleQuote = /watch\("([^"]*)"\)/; // Double quotes
export const regexWatchSingleQuote = /watch\('([^']*)'\)/; // Single quotes
export const regexEmptyKeyController = /@([^:]+):(?:{empty}|{notempty})/;
export const replaceEmptyKeyController = /@([^:]+):(?:{empty}|{notempty})/g;