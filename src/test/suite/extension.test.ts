import * as assert from 'assert';
import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Clipboard } from '../../clipboard';
import * as extension from '../../extension';

const exampleFile = '../example.txt';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('simple copy', () => {
		let clipboard = new Clipboard();
		const input = 'test';
		clipboard.copy(input);

		const data = clipboard.getData();
		assert.strictEqual(1, data.length);
		assert.strictEqual(input, data[0]);
	});

	test('simple paste', () => {
		let clipboard = new Clipboard();
		const input = 'test';
		clipboard.copy(input);
		const output = clipboard.paste();

		const data = clipboard.getData();
		assert.strictEqual(1, data.length);
		assert.strictEqual(input, data[0]);
		assert.strictEqual(input, output);
	});

	test('merge copy', () => {
		let clipboard = new Clipboard();
		const input1 = 'test1';
		const input2 = 'test2';
		clipboard.copy(input1);
		clipboard.mergeCopy(input2);

		const data = clipboard.getData();
		assert.strictEqual(1, data.length);
		assert.strictEqual(`${input1}${input2}`, data[0]);
	});

	test('remove paste', () => {
		let clipboard = new Clipboard();
		const input = 'test';
		clipboard.copy(input);
		const output = clipboard.removePaste();

		const data = clipboard.getData();
		assert.strictEqual(0, data.length);
		assert.strictEqual(input, output);
	});

	test('at most five items', () => {
		let clipboard = new Clipboard();
		const input = 'test';
		for (let i = 0; i < 100; i++) {
			clipboard.copy(input);
		}

		const data = clipboard.getData();
		assert.strictEqual(5, data.length);
	});

	test('no copy if empty selection', async () => {
		// const uri = vscode.Uri.file(path.join(`${__dirname}/../${exampleFile}`));
		// const doc = await vscode.workspace.openTextDocument(uri);
		// const editor = await vscode.window.showTextDocument(doc);
	});

	test('no paste if no previous copies', async () => {

	});
});
