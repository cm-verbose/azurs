/**
 * @description Represents possible InputEvent，only used types are defined
 * @see {@link https://w3c.github.io/input-events/#interface-InputEvent-Attributes}
 * */
declare interface InputTypesInterface {
  readonly DELETE_CONTENT_BACKWARDS: "deleteContentBackward";
  readonly PARAGRAPH_INSERTION: "insertParagraph";
}

type InputTypes = InputTypesInterface[keyof InputTypesInterface];

export { InputTypes };
