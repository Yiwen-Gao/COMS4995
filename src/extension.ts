// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('extension is active!');
    const maxLen = 5;
    var data:string[] = [];

    let addData = vscode.commands.registerCommand('extension.addData', () => {
        console.log('enter addData');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
			const selection = editor.selection; 
			if (!selection.isEmpty) {
				const text = editor.document.getText(selection);
				if (data.length >= maxLen) {
					data.shift();
				} 
				data.push(text);
				console.log(data);
			}
        } 
    });

    let removeData = vscode.commands.registerCommand('extension.removeData', () => {
        console.log('enter removeData');
        const editor = vscode.window.activeTextEditor;
        if (editor && data.length > 0) {
			const selection = editor.selection; 
			editor.edit(builder => {
				const text = data.pop();
				if (text !== undefined) {
					builder.replace(selection, text);
				}
			})
			.then(success => {
				if (success) {
					const position = editor.selection.end; 
					editor.selection = new vscode.Selection(position, position);
				}
			});
			console.log(data);
        }
    });

    context.subscriptions.push(addData);
    context.subscriptions.push(removeData);
}

// this method is called when your extension is deactivated
export function deactivate() {}
