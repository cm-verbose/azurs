describe("Editor", () => {
  it("Inserts paragraphs correctly", () => {
    cy.visit("../src/index.html");
    const editor = cy.get("#editor");
    editor.click();
    for (let i = 0; i < 20; i++) {
      editor.type(`a: (${i}) {enter}`);
    }
  });
});
