var Editor = /** @class */ (function () {
    function Editor() {
        this.editor = document.querySelector("#editor");
        this.initialParagraph = document.querySelector("#initial-paragraph");
        this.handleEditorInput();
    }
    Editor.prototype.handleEditorInput = function () {
        console.log("hi");
        this.editor.addEventListener("beforeinput", function (event) {
            console.log(event.inputType);
        });
    };
    return Editor;
}());
export default Editor;
