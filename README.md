# Enhanced Code Navigation in VSCode

[![GitHub issues](https://img.shields.io/github/issues/Yiwen-Gao/COMS4995)](https://github.com/Yiwen-Gao/COMS4995/issues)
[![GitHub license](https://img.shields.io/github/license/Yiwen-Gao/COMS4995)](https://github.com/Yiwen-Gao/COMS4995)

## Problem
Easy and intuitive code navigation is necessary for a developer to understand and work with large codebases. One text editor feature that I find myself using frequently when I don't understand a particular function/variable usage is to CMD + click on the function/variable name and jump directly to its definition. However, this makes me lose my place in the code, so it's difficult to navigate back to what I was originally looking at. I'd like to automate the renavigation process by implementing a key command or UI button that takes the user from the function/variable definition back to the usage.

## Tentative Plan
On a conceptual level, it's simple to keep track of a user's place in the code with a stack data structure. When the user uses CMD + click, I'll push the current file name/line number to the stack. When the user clicks the back button, I'll pop the most recent file name/line number from the stack and take the user to this address. To incorporate my code into VSCode, I can use the [VSCode Extension API](https://code.visualstudio.com/api).
