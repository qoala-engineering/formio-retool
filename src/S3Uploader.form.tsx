import { Components } from 'formiojs'
const nestedComponentForm = Components.baseEditForm
const S3UploaderEditDisplay = [
  {
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'tabindex',
    ignore: true
  },
  {
    key: 'disabled',
    ignore: true
  },
  {
    type: 'checkbox',
    key: 'enableThumbnail',
    label: 'Image Thumbnail',
    tooltip: 'Shows Image Thumbnails, only works for image files',
    defaultValue: false,
    input: true
  },
  {
    type: 'checkbox',
    key: 'enablePreview',
    label: 'Image Preview',
    tooltip: 'Shows Image Previews, only works for image files.',
    defaultValue: false,
    input: true
  },
  {
    type: 'input',
    label: 'Document Type',
    key: 'documentType',
    input: true,
    tooltip: 'Input supported file format type'
  },
  {
    type: 'input',
    label: 'Helper Info',
    key: 'buttonInfo',
    input: true,
    tooltip: 'Input supported file type information'
  },
  {
    type: 'input',
    label: 'Button Label',
    key: 'buttonLabel',
    input: true,
    tooltip: 'Input upload button label'
  },
  {
    type: 'number',
    label: 'Max Size in MB',
    key: 'maxSize',
    input: true,
    tooltip: 'Input max size of file'
  }
]
const S3UploaderEditValidation = [
  {
    weight: 130,
    key: 'validate.customEvent',
    label: 'Custom Validation Event',
    placeholder: 'myCustomValidator',
    type: 'textfield',
    tooltip: 'The custom event fired befor file uploaded.',
    input: true
  },
  {
    type: 'number',
    label: 'Max Size in MB',
    key: 'maxSize',
    input: true,
    tooltip: 'Input max size of file'
  }
]
export default function s3UploaderEditForm(...extend: unknown[]): any {
  return nestedComponentForm(
    [
      {
        key: 'display',
        components: S3UploaderEditDisplay
      },
      {
        key: 'validation',
        components: S3UploaderEditValidation
      }
    ],
    ...extend
  )
}
