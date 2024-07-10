import { Components } from 'formiojs'
import s3UploaderEditForm from './S3Uploader.form'
const Field = Components.components.field
class S3Uploader extends Field {
  isImageFile = false
  previewUrl = ''
  constructor(
    component: unknown,
    options: Record<string, unknown>,
    data: Record<string, unknown>
  ) {
    super(component, options, data)
  }
  static schema(...extend: any[]): any {
    return Field.schema(
      {
        type: 's3uploader',
        label: 'Upload',
        key: 'file',
        documentType: 'image/*, application/pdf',
        buttonLabel: 'Choose File',
        buttonInfo: 'Supported files: .csv',
        maxSize: 1
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...extend
    )
  }
  static get builderInfo(): any {
    return {
      title: 'S3 Uploader',
      group: 'advanced',
      icon: 'fa fa-upload',
      weight: 70,
      schema: S3Uploader.schema()
    }
  }
  static editForm = s3UploaderEditForm
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get defaultSchema(): any {
    return S3Uploader.schema()
  }
  render(): string {
    const s3UploaderTemplate = this.renderTemplate('input', {
      input: {
        type: 'input',
        attr: {
          id: `${this.id}-${this.component.key}`,
          type: 'file',
          value: this.getValue(),
          accept: this.component.documentType
        }
      }
    })
    const currentValue = this.getValue()
    if (currentValue?.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      this.isImageFile = true
    }
    const template = `
      <div ref="s3uploader" class="formio-s3uploader-container d-flex justify-content-between">
          ${(() => {
            if (currentValue?.name) {
              return `
                  <div class="file-container d-flex align-items-center">
                    ${
                      this.isImageFile &&
                      this.component?.enableThumbnail &&
                      this.previewUrl
                        ? `<img src="${
                            this.previewUrl || currentValue?.downloadUrl
                          }" style="height:50px;width:50px;cursor:pointer;" class="image-thumbnail object-fit-cover border rounded mr-2" alt="Image Thumbnail"/>`
                        : ''
                    }
                    <span class="file-name subtitle-2">
                      ${
                        currentValue?.downloadUrl
                          ? `
                          <a href="${currentValue?.downloadUrl}" target="_blank">
                            ${currentValue.name}
                          </a>
                        `
                          : `<span style="cursor:pointer;" class="file-name-title">${currentValue.name}</span>`
                      }
                    </span>
                  </div>
                  ${
                    !this.disabled
                      ? `<button role="button" class="close btn-file-remove">
                      <span aria-hidden="true">&times;</span>
                    </button>`
                      : ''
                  }
                  ${
                    this.isImageFile && this.component?.enablePreview
                      ? `<div class="formio-modal">
                      <div class="formio-modal-content">
                        <img src="${
                          this.previewUrl || currentValue?.downloadUrl
                        }" alt="Image Thumbnail"/>
                      </div>
                    </div>`
                      : ''
                  }
              `
            } else {
              if (this.disabled) {
                return `<span class="subtitle-2">no file(s) uploaded</span>`
              }
              return `
              <span class="btn btn-file">${this.component.buttonLabel} ${s3UploaderTemplate}</span>
              <span class="ml-2 btn-file-info">${this.component.buttonInfo}</span>
              `
            }
          })()}
      </div>`
    return super.render(template)
  }
  attach(element: unknown): any {
    const el = element as HTMLElement
    const fileInput = el.querySelector('input[type=file]') as HTMLInputElement
    const fileRemove = el.querySelector(
      'button[role=button].btn-file-remove'
    ) as HTMLButtonElement
    const imageThumbnail = el.querySelector(
      '.image-thumbnail'
    ) as HTMLImageElement
    const fileNameTitle = el.querySelector('.file-name-title') as HTMLElement
    const formioModal = el.querySelector('.formio-modal') as HTMLElement
    const rootHTML = document.getElementsByTagName('html')[0] as HTMLElement
    if (fileInput) {
      this.addEventListener(fileInput, 'change', async (e: Event) => {
        const curFiles = fileInput.files
        if (curFiles && curFiles.length) {
          const file = curFiles[0] as File
          const maxAllowedSize = this.component.maxSize * 1024 * 1024 // in megabytes
          const isImageFile = file && file.type.split('/')[0] === 'image'
          const fileReader = new FileReader()
          if (file.size <= maxAllowedSize) {
            if (this.component?.validate?.customEvent) {
              const interpolated = this.interpolate(
                this.component.validate.customEvent,
                {}
              )
              this.emit(interpolated, file)
            } else {
              this.setValue(file, { modified: true })
              this.triggerRedraw()
            }
          } else {
            this.setCustomValidity(
              `File size should not exceed ${this.component.maxSize} MB`,
              false
            )
          }
          fileReader.addEventListener('load', (evt) => {
            if (file && isImageFile) {
              this.previewUrl = evt?.target?.result as string
              this.isImageFile = true
            }
          })
          fileReader.readAsDataURL(file)
        }
        // reset value to enable re-upload same filepath
        // https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
        const element = e.target as HTMLInputElement
        element.value = ''
      })
    }
    if (fileRemove) {
      this.addEventListener(fileRemove, 'click', async (e: Event) => {
        this.deleteValue()
        this.previewUrl = ''
        this.isImageFile = false
        this.triggerRedraw()
      })
    }
    if (imageThumbnail) {
      this.addEventListener(imageThumbnail, 'click', () => {
        if (this.component?.enablePreview) {
          formioModal?.classList.add('active')
          rootHTML.style.overflowY = 'hidden'
        }
      })
    }
    if (fileNameTitle) {
      this.addEventListener(fileNameTitle, 'click', () => {
        if (this.isImageFile && this.component?.enablePreview) {
          formioModal?.classList.add('active')
          rootHTML.style.overflowY = 'hidden'
        }
      })
    }
    if (fileNameTitle) {
      this.addEventListener(fileNameTitle, 'click', () => {
        if (this.isImageFile && this.component?.enablePreview) {
          formioModal?.classList.add('active')
          rootHTML.style.overflowY = 'hidden'
        }
      })
    }
    if (formioModal) {
      this.addEventListener(formioModal, 'click', (event: any) => {
        const isOutside = !event.target.closest('.formio-modal-content')
        if (isOutside) {
          formioModal.classList.remove('active')
          rootHTML.style.overflowY = 'auto'
        }
      })
    }
    return super.attach(el)
  }
  setValue(value: unknown, flags = {}): any {
    return super.setValue(value, flags)
  }
  getValue(): any {
    return super.getValue()
  }
}
export default S3Uploader
