"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const maxLen = 5;
    var data = [];

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let addData = vscode.commands.registerCommand('extension.addData', () => {
        console.log('enter addData');
        const editor = vscode.window.activeTextEditor;
        const selection = editor.selection; 
        if (!editor || selection.empty) {
            return;
        }

        const text = editor.document.getText(selection);
        if (data.length >= maxLen) {
            data.pop(0);
        } 
        data.push(text);
        console.log(data);
    });

    let removeData = vscode.commands.registerCommand('extension.removeData', () => {
        console.log('enter removeData');
        const editor = vscode.window.activeTextEditor;
        const selection = editor.selection; 
        if (!editor || data.length === 0) {
            return;
        }
    
        editor.edit(builder => {
            const text = data.pop();
            builder.replace(selection, text);
        })
        .then(success => {
            if (success) {
                const position = editor.selection.end; 
                editor.selection = new vscode.Selection(position, position);
            }
        });
        console.log(data);
    });

    context.subscriptions.push(addData);
    context.subscriptions.push(removeData);
}

exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map