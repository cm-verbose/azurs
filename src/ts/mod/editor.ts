import { InputTypes } from "../types";

export default class Editor {
  editor = document.querySelector("#editor") as HTMLDivElement;
  initialParagraph = document.querySelector("#initial-paragraph") as HTMLParagraphElement;

  constructor() {
    this.ini();
  }

  private ini() {
    this.handleEditorInput();
  }

  private handleEditorInput() {
    this.editor.addEventListener("beforeinput", (e) => {
      switch (e.inputType as InputTypes) {
        case "insertParagraph":
          e.preventDefault();
          this.handleParagraphInsertion();
          break;
      }
    });
  }

  /** @description Normalises paragraph insertions using the Selection and Range APIs */
  private handleParagraphInsertion() {
    const selection = window.getSelection();
    if (!selection) return;

    const selectionRange = selection.getRangeAt(0);
    if (!selectionRange) return;
    selectionRange.deleteContents();

    // TODO: Somehow, when an input is empty, the value changes to be
    // this.editor
    const selectionAnchor = selection.anchorNode;
    const selectionFocus = selection.focusNode;
    if (selectionAnchor === null || selectionFocus === null) return;

    const selectionAnchorParagraph = this.getParentAtEditorLevel(selectionAnchor);
    const lastChild = selectionAnchorParagraph.lastChild;

    const newParagraph = document.createElement("p");
    if (lastChild === null) {
      const br = document.createElement("br");
      newParagraph.appendChild(br);
      selectionAnchorParagraph.insertAdjacentElement("afterend", newParagraph);

      const positionNewParagraphRange = new Range();
      positionNewParagraphRange.setStartBefore(newParagraph);
      positionNewParagraphRange.setEndBefore(newParagraph);

      selection.removeAllRanges();
      selection.addRange(positionNewParagraphRange);
    } else {
      // Here we select the remaining elements after the cursor to be moved in the next
      // line. Using lastChild allows us to set the end of the selection.
      const moveRange = new Range();
      moveRange.setStart(selectionRange.startContainer, selectionRange.startOffset);
      moveRange.setEndAfter(lastChild);
      const nodes = moveRange.extractContents();

      // An element with no text cannot be focused on, so we use a <br>
      if (nodes.textContent === null || nodes.textContent.length === 0) {
        const br = document.createElement("br");
        newParagraph.appendChild(br);
      } else {
        newParagraph.append(...nodes.childNodes);
      }
      selectionAnchorParagraph.insertAdjacentElement("afterend", newParagraph);

      const repositionRange = new Range();
      repositionRange.setStartBefore(newParagraph);
      repositionRange.setEndBefore(newParagraph);

      selection.removeAllRanges();
      selection.addRange(repositionRange);
    }
  }

  private getParentAtEditorLevel(node: NonNullable<Node>): HTMLParagraphElement {
    let parentNode: Node = node;
    while (parentNode.parentNode !== null && !parentNode.parentNode.isEqualNode(this.editor)) {
      parentNode = parentNode.parentNode;
    }
    return parentNode as HTMLParagraphElement;
  }
}
