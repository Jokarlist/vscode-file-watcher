// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { dirname } = require("path");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * 激活函数：当扩展被首次激活（例如，通过执行其命令）时调用
 * @param {vscode.ExtensionContext} context 扩展上下文，用于存储全局状态，注册命令等
 */
function activate(context) {
	// 用于存储上一次活动编辑器文件的顶层目录路径
  let previousTopLevelDir = "";

	// 监听活动编辑器变化的事件
  const disposable = vscode.window.onDidChangeActiveTextEditor((editor) => {
		// 检查是否有活动编辑器，因为在关闭所有编辑器时，editor 为 null
    if (editor) {
			// 获取当前活动编辑器文件的完整路径
      const filePath = editor.document.uri.fsPath;
			// 获取文件的顶层目录路径
      const topLevelDir = dirname(filePath);
      console.log("🚀 ~ disposable ~ topLevelDir:", topLevelDir)
			// 检查顶层目录路径是否发生变化
      if (topLevelDir !== previousTopLevelDir) {
				// 更新存储的顶层目录路径
        previousTopLevelDir = topLevelDir;
				// 根据顶层目录路径获取对应的颜色
        const color = getColorBasedOnPath(topLevelDir);
				// 根据获取的颜色修改编辑器颜色
        changeColor(color);
      }
    }
  });

	// 将监听活动编辑器变化的事件添加到上下文的订阅列表中
  // 这样做是为了确保当扩展被禁用或卸载时，事件监听也会被正确地清理
  context.subscriptions.push(disposable);
}

/**
 * 根据文件的顶层目录路径决定编辑器的颜色
 * @param {string} topLevelDir 文件的顶层目录路径
 * @returns {string} 返回一个颜色值，用于设置编辑器的背景和前景颜色
 */
function getColorBasedOnPath(topLevelDir) {
  // 生成一个随机的颜色值
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  // 返回随机颜色值
  return `#${randomColor}`;
}

/**
 * 修改编辑器各区域的颜色
 * @param {string} color 颜色值
 */
function changeColor(color) {
  vscode.workspace.getConfiguration().update("workbench.colorCustomizations", {
    "activityBar.background": color,
    "titleBar.activeBackground": color
  });
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
