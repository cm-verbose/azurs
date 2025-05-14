/**
 * @description Represents possible InputEvent
 * @see {@link https://w3c.github.io/input-events/#interface-InputEvent-Attributes|InputEvent}
 * */

declare interface InputTypesInterface {
  DELETE_CONTENT: "deleteContent";
  DELETE_CONTENT_FOWARDS: "deleteContentForward";
  DELETE_CONTENT_BACKWARDS: "deleteContentBackward";
  FORMAT_BOLD: "formatBold";
  PARAGRAPH_INSERTION: "insertParagraph";
}
type InputTypes = InputTypesInterface[keyof Readonly<InputTypesInterface>];

export { InputTypes };
