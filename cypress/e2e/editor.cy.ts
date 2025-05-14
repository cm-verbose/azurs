describe("Editor", () => {
  it("Inserts paragraphs correctly", () => {
    cy.visit("../src/index.html");
    const editor = cy.get("#editor");
    editor.click();
    editor.type("Hi, I hope that this editor can write new lines\n");
    editor.type("If this next line shows up it means that it is working !");
  });
});
