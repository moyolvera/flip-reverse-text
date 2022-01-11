import * as vscode from "vscode";

const formatString = (str: string) => {
  return str
    .split("")
    .reverse()
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    )
    .join("");
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("flip-reverse-text.flipReverseIt", () => {
      const editor = vscode.window.activeTextEditor;
      const selection = editor?.selections[0];
      if (!selection) {
        vscode.window.showInformationMessage(
          "Something went wrong, try again!"
        );
        return;
      }

      editor.edit((editBuilder) => {
        editor.selections.forEach((selection) => {
          editBuilder.replace(
            selection,
            formatString(
              editor.document.getText(
                new vscode.Range(selection.start, selection.end)
              )
            ).toString()
          );
        });
      });
    })
  );
}

export function deactivate() {}
