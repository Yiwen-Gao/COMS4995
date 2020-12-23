// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { Clipboard } from './clipboard';

/**
 * Set up custom VSCode commands
 * Function is called when extension is first activated
 * @param {vscode.ExtensionContext} context current context
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('extension is active!');
    let clipboard = new Clipboard();

	/**
	 * If editor is active and selection isn't empty, copy text to clipboard as new entry
	 */
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
	
	/**
	 * If editor is active and selection isn't empty, copy text to clipboard as part of previous entry
	 */
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

	/**
	 * If editor is active, paste text to editor
	 */
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
	
	/**
	 * If editor is active, copy text to editor and remove from clipboard
	 */
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


/**
 * Function is called when extension is deactivated
 */
export function deactivate() {}
