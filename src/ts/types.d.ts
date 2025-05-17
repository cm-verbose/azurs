/**
 * @description Represents possible InputEvent，only used types are defined
 * @see {@link https://w3c.github.io/input-events/#interface-InputEvent-Attributes|InputEvent}
 * */

declare interface InputTypesInterface {
  DELETE_CONTENT_BACKWARDS: "deleteContentBackward";
  PARAGRAPH_INSERTION: "insertParagraph";
}
type InputTypes = InputTypesInterface[keyof Readonly<InputTypesInterface>];

export { InputTypes };
