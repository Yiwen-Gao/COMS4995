"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var stack = [];

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let addLocation = vscode.commands.registerCommand('extension.addLocation', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }

        vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider', 
            activeEditor.document.uri, 
            activeEditor.selection.active
        ).then((locations) => {
            const curr = locations[0];
            stack.push(curr);
            console.log('curr pos:', curr);
            return vscode.commands.executeCommand('editor.action.goToDefinition');
            // return vscode.commands.executeCommand('vscode.open', curr.uri);
        // }).then(() => {
        //     const curr = stack[stack.length - 1];
        //     return vscode.commands.executeCommand('cursorMove', curr.uri, curr.range);
        // }).then(() => {

        }).catch(err => console.log(err));
    });

    let removeLocation = vscode.commands.registerCommand('extension.removeLocation', () => {
        if (locations.length > 0) {
            const curr = locations.pop();
            console.log(`remove location ${curr}`);
        }
    });

    context.subscriptions.push(addLocation);
    context.subscriptions.push(removeLocation);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map