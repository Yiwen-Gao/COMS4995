// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Clipboard } from './clipboard';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('extension is active!');
    let clipboard = new Clipboard();

    let addData = vscode.commands.registerCommand('extension.addData', () => {
        console.log('enter addData');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
			const selection = editor.selection; 
			if (!selection.isEmpty) {
				const text = editor.document.getText(selection);
				clipboard.copy(text);
				console.log(clipboard.getData());
			}
        } 
    });

    let removeData = vscode.commands.registerCommand('extension.removeData', () => {
        console.log('enter removeData');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
			const selection = editor.selection; 
			editor.edit(builder => {
				const text = clipboard.paste();
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
			console.log(clipboard.getData());
        }
    });

    context.subscriptions.push(addData);
    context.subscriptions.push(removeData);
}

// this method is called when your extension is deactivated
export function deactivate() {}
