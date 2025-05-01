import { InputTypes } from "../types";

export default class Editor {
  editor = document.querySelector("#editor") as HTMLDivElement;
  initialParagraph = document.querySelector("#initial-paragraph") as HTMLParagraphElement;

  constructor() {
    this.handleEditorInput();
  }

  /** Handles inputs */
  private handleEditorInput() {
    this.editor.addEventListener("beforeinput", (event: InputEvent) => {
      console.log(event.inputType);
      switch (event.inputType as InputTypes) {
        case "deleteContentBackward":
          this.handleBackwardsDeletion(event);
          break;

        case "insertParagraph":
          this.handleParagraphInsertion(event);
          break;
      }
    });
  }

  /** Handles deletion of characters with the <backspace> key, also preserves the initial paragraph */
  private handleBackwardsDeletion(event: InputEvent) {
    const targetRanges: Array<StaticRange> = event.getTargetRanges();

    if (targetRanges.length === 1) {
      this.handleSingleRangeBackwardsDeletion(event, targetRanges[0]);
    } else {
      // Handle multiple StatocRange objects ?
      for (const range of targetRanges) {
        console.info("[Backwards deletion]:", range);
      }
    }
  }

  /** Handle deletion when a single StaticRange is available */
  private handleSingleRangeBackwardsDeletion(event: InputEvent, targetRange: StaticRange) {
    const startP = this.getEditorLevelParent(targetRange.startContainer);
    const endP = this.getEditorLevelParent(targetRange.endContainer);

    const isInitialParagraph = this.getEditorLevelParent(startP).isSameNode(this.initialParagraph);
    const sO = targetRange.startOffset;

    if (startP.isEqualNode(endP)) {
      const eO = targetRange.endOffset;
      const rangeLength = eO - sO;
      const initialText = this.initialParagraph.innerText;

      if (isInitialParagraph && initialText.length === rangeLength) {
        event.preventDefault();
        this.initialParagraph.innerHTML = "";
        this.initialParagraph.removeAttribute("data-empty");
      }
    } else {
      if (isInitialParagraph && sO === 0) {
        setTimeout(() => {
          this.initialParagraph.innerHTML = "";
          if (this.editor.childElementCount !== 1) {
            this.initialParagraph.setAttribute("data-empty", "");
          } else {
            this.initialParagraph.removeAttribute("data-empty");
          }
        });
      }
    }
  }

  /** Handles inserting paragraphs into the editor */
  private handleParagraphInsertion(event: InputEvent) {
    const targetRanges: Array<StaticRange> = event.getTargetRanges();

    if (targetRanges.length === 1) {
      this.handleSingleRangeParagraphInsertion(event, targetRanges[0]);
    } else {
      // Handle multiple StatocRange objects ?
      for (const range of targetRanges) {
        console.info("[Paragraph Insertion]", range);
      }
    }
  }

  /** Handles inserting a paragraph when a single StaticRange is available */
  private handleSingleRangeParagraphInsertion(event: InputEvent, targetRange: StaticRange) {
    event.preventDefault();

    const selection = window.getSelection();
    if (!selection) return;

    // Copying range, deleting content
    const range = new Range();
    range.setStart(targetRange.startContainer, targetRange.startOffset);
    range.setEnd(targetRange.endContainer, targetRange.endOffset);
    range.deleteContents();

    // Paragraph creation
    const newP = document.createElement("p");
    const startP = this.getEditorLevelParent(targetRange.startContainer);
    const newPRange = new Range();

    if (startP.lastChild === null) {
      const newline = document.createElement("br");
      newP.appendChild(newline);
    } else {
      newPRange.setStart(targetRange.startContainer, targetRange.startOffset);
      newPRange.setEndAfter(startP.lastChild);

      const nodes: DocumentFragment = newPRange.extractContents();
      if (nodes.textContent === null || nodes.textContent.length === 0) {
        const newline = document.createElement("br");
        newP.appendChild(newline);
      } else {
        nodes.childNodes.forEach((child) => {
          newP.appendChild(child);
        });
      }
    }

    startP.insertAdjacentElement("afterend", newP);
    newPRange.setStartBefore(newP);
    newPRange.setEndBefore(newP);

    selection.removeAllRanges();
    selection.addRange(newPRange);

    if (this.editor.childElementCount > 1) {
      this.initialParagraph.setAttribute("data-empty", "");
    }
  }

  private getEditorLevelParent(node: NonNullable<Node>): HTMLParagraphElement {
    let parentNode: Node = node;
    while (parentNode.parentNode !== null && !parentNode.parentNode.isEqualNode(this.editor)) {
      parentNode = parentNode.parentNode;
    }
    return parentNode as HTMLParagraphElement;
  }
}
