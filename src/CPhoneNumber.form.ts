import { Components } from "formiojs";

const nestedComponentForm = Components.baseEditForm;

export default function customPhoneNumberEditForm(...extend: unknown[]): any {
  return nestedComponentForm(
    [
      {
        key: "display",
        components: [
          {
            key: "showWordCount",
            ignore: true,
          },
          {
            key: "showCharCount",
            ignore: true,
          },
        ],
      },
      {
        key: "data",
        components: [
          {
            key: "case",
            ignore: true,
          },
          {
            key: "multiple",
            ignore: true,
          },
        ],
      },
      {
        key: "validation",
        components: [
          {
            key: "validate.minLength",
            ignore: true,
          },
          {
            key: "validate.maxLength",
            ignore: true,
          },
          {
            key: "validate.pattern",
            ignore: true,
          },
          {
            key: "validate.minWords",
            ignore: true,
          },
          {
            key: "validate.maxWords",
            ignore: true,
          },
        ],
      },
    ],
    ...extend,
  );
}