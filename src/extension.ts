// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Clipboard } from './clipboard';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('extension is active!');
    let clipboard = new Clipboard();

    let copy = vscode.commands.registerCommand('extension.copy', () => {
        console.log('enter copy');
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
	
	let mergeCopy = vscode.commands.registerCommand('extension.mergeCopy', () => {
        console.log('enter mergeCopy');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
			const selection = editor.selection; 
			if (!selection.isEmpty) {
				const text = editor.document.getText(selection);
				clipboard.mergeCopy(text);
				console.log(clipboard.getData());
			}
        } 
    });

    let paste = vscode.commands.registerCommand('extension.paste', () => {
        console.log('enter paste');
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
	
	let removePaste = vscode.commands.registerCommand('extension.removePaste', () => {
        console.log('enter removePaste');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
			const selection = editor.selection; 
			editor.edit(builder => {
				const text = clipboard.removePaste();
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

	context.subscriptions.push(copy);
	context.subscriptions.push(mergeCopy);
	context.subscriptions.push(paste);
	context.subscriptions.push(removePaste);
}

// this method is called when your extension is deactivated
export function deactivate() {}
