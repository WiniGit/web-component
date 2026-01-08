export const regexUrlWithVariables = /^(https?:\/\/)?([\w.-]+)?(:\d+)?(\/(\$\{[\w.]+\}|[\w.-]*))*$/;
export const regexGetVariableByThis = /\${this\.(\w+)}/;
export const replaceVariableByThis = /\${this\.(\w+)}/g;
export const regexGetVariables = /\${([^}]*)}/;
export const replaceVariables = /\${([^}]*)}/g;
export const regexEmptyKeyController = /@([^:]+):(?:{empty}|{notempty})/;
export const replaceEmptyKeyController = /@([^:]+):(?:{empty}|{notempty})/g;
