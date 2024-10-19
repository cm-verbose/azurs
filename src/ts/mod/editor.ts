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

  /** @description Handles inputing / typing in the editor */
  private handleEditorInput() {
    this.editor.addEventListener("beforeinput", (e: InputEvent) => {
      switch (e.inputType as InputTypes) {
        case "insertParagraph":
          {
            e.preventDefault();
            this.handleParagraphInsertion();
          }
          break;

        case "deleteContentBackward":
          {
            this.handleDeletion(e);
          }
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

    const selectionAnchor = selection.anchorNode;
    const selectionFocus = selection.focusNode;
    if (selectionAnchor === null || selectionFocus === null) return;

    const selectionAnchorParagraph = this.getParentAtEditorLevel(selectionAnchor);
    const lastChild = selectionAnchorParagraph.lastChild;

    const newParagraph = document.createElement("p");

    if (lastChild === null) {
      const newline = document.createElement("br");
      newParagraph.appendChild(newline);
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
        const newline = document.createElement("br");
        newParagraph.appendChild(newline);
      } else {
        nodes.childNodes.forEach(child => {
          newParagraph.append(child); 
        });
      }
      selectionAnchorParagraph.insertAdjacentElement("afterend", newParagraph);

      moveRange.setStartBefore(newParagraph);
      moveRange.setEndBefore(newParagraph);

      selection.removeAllRanges();
      selection.addRange(moveRange);
    }
    // Setting the position is necessary as trying to add more empty paragraphs
    // results in the editor being the anchor.
    selection.setPosition(newParagraph);
  }

  /** @description Handles deletion */
  private handleDeletion(inputEvent: InputEvent) {
    const selection = window.getSelection();
    if (!selection) return;

    const anchorNode = selection.anchorNode;
    if (!anchorNode) return;
    const selectionAnchorParagraph = this.getParentAtEditorLevel(anchorNode);

    // Prevent the initial paragraph from being deleted
    if (selectionAnchorParagraph.isSameNode(this.initialParagraph)) {
      const childNodes = this.initialParagraph.childNodes;
      if (childNodes.length === 1 && this.initialParagraph.firstChild?.textContent?.length === 0) {
        inputEvent.preventDefault();
        this.initialParagraph.firstChild.remove();
      } else if (this.initialParagraph.textContent?.length === 0) {
        inputEvent.preventDefault();
      }

      // Remove automatically inserted <br> element
      if (childNodes.length === 1 && this.initialParagraph.textContent?.length === 1) {
        setTimeout(() => {
          if (!(childNodes.length === 1 && childNodes[0].nodeName === "BR")) return;
          childNodes[0].remove();
        });
      }
    }
  }

  /** @description Fetches a child paragraph from the editor based on a node within the editor */
  private getParentAtEditorLevel(node: NonNullable<Node>): HTMLParagraphElement {
    let parentNode: Node = node;
    while (parentNode.parentNode !== null && !parentNode.parentNode.isEqualNode(this.editor)) {
      parentNode = parentNode.parentNode;
    }
    return parentNode as HTMLParagraphElement;
  }
}
