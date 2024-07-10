import React, { createRef, useEffect, useRef, useState } from 'react'
import { type FC } from 'react'
import { Formio } from 'formiojs'

import './css/_form-io.css'

import { Retool } from '@tryretool/custom-component-support'
import moment from 'moment'

import S3Uploader from './S3Uploader'
import cPhoneNumber from './cPhoneNumber'

interface Props {
  action: any
  setPristine: boolean
  isNewForm: boolean
}

const CPHONE_NUMBER = ['phoneNumber']

export const FormIO: FC<Props> = ({}) => {
  const [formsData] = Retool.useStateArray({ name: 'formsData' }),
    [prefillData, setPrefillData] = Retool.useStateArray({
      name: 'prefillData'
    }),
    [isFilter] = Retool.useStateBoolean({
      name: 'isFilter'
    }),
    [filterData, setFilterData] = Retool.useStateObject({
      name: 'filterData'
    }),
    formsContainer: any = useRef(
      formsData && Array.isArray(formsData)
        ? formsData.map(() => createRef())
        : null
    ),
    [updatedData, setUpdatedData] = useState<any>(prefillData),
    [formsIO, setFormsIO] = useState<any>([]),
    retoolAction = Retool.useEventCallback({ name: 'retoolAction' })

  if (
    !prefillData ||
    !formsContainer?.current?.length ||
    !formsData ||
    !formsData.length
  ) {
    return null
  }

  let updatedArray = [...prefillData],
    forms: any = []

  function loadScript(
    d: any,
    s: string,
    id: string,
    src: string,
    callback: string
  ) {
    let js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.onload = callback || function () {}
    js.src = src
    fjs.parentNode.insertBefore(js, fjs)
  }

  function loadCss(id: string, src: string) {
    if (!document.getElementById(id)) {
      let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = src
      link.media = 'all'
      head.prepend(link)
    }
  }

  loadScript(
    window.document,
    'script',
    '',
    'https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js',
    ''
  )
  loadCss(
    'choices',
    'https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css'
  )
  loadCss('formio', 'https://cdn.form.io/formiojs/formio.full.min.css')

  useEffect(() => {
    console.log('formsData', formsData)
    console.log('prefillData', prefillData)
    Formio.use({
      components: {
        s3uploader: S3Uploader,
        cPhoneNumber: cPhoneNumber
      }
    })
  }, [])

  useEffect(() => {
    console.log('formsData', formsData)
    console.log('prefillData', prefillData)
  }, [prefillData])

  const updateDataArrayAtIndex = (index: any, event: any, isValid: any) => {
    updatedArray[index] = { ...event?.data, isValid }

    setUpdatedData(updatedArray)
  }

  function updateForms(forms: any) {
    setFormsIO(forms)
  }

  useEffect(() => {
    if (formsData.length && !formsIO.length) {
      formsData.map((formData: any, index: number) => {
        if (formData && !Object.keys(formData).length) {
          return
        }

        Formio.createForm(formsContainer.current[index].current, formData, {
          readOnly: false
        }).then((form: any) => {
          forms.push(form)
          updateForms(forms)

          // form.getComponent('traveller1', (component: any) => {
          //   if (index === 0 && isNewForm) {
          //     // To collapse the panel
          //     component.collapsed = false
          //   }

          //   // To change the panel title
          //   component.component.title = `Traveller ${index + 1}`
          //   component.redraw()
          // })

          CPHONE_NUMBER.forEach((phoneNumberType) => {
            form.getComponent(phoneNumberType, (component: any) => {
              let obj: any = prefillData[index]
              if (
                obj &&
                obj[phoneNumberType] &&
                Object.keys(obj[phoneNumberType]).length
              ) {
                component.setValue(
                  {
                    ...obj[phoneNumberType]
                  },
                  { modified: true }
                )
                component.triggerRedraw()
              }
            })
          })

          form.on('change', (event: any) => {
            updateDataArrayAtIndex(index, event, form.checkValidity())
          })

          if (prefillData && prefillData.length) {
            let data = prefillData[index],
              submissionData = {
                data
              }

            form
              .setSubmission(submissionData)
              .then(function () {
                // This function is called after the form is successfully prefilled
                console.log('Form is prefilled with data.')
              })
              .catch(function (error: any) {
                // Handle any errors
                console.error('Error setting submission: ', error)
              })
          }
        })
      })
    }
  }, [formsData])

  const handleFormSubmitFormIO = () => {
    let isValid = true

    formsIO.forEach((form: any, index: number) => {
      form.setPristine(false)
      if (form.checkValidity()) {
        if (isFilter) {
          let filter = { ...updatedData[index] }
          if (filter.trip_type === 'multi_trip') {
            filter.travel_start_date = moment().format('YYYY-MM-DD')
            filter.travel_end_date = moment()
              .add(filter.min_day_lte, 'days')
              .format('YYYY-MM-DD')
          }
          setFilterData(filter)
          setTimeout(() => {
            retoolAction()
          }, 1000)
        }
      } else {
        console.log('Form not valid')
        isValid = false
      }
    })
    if (isValid) {
      console.log('updatedData', updatedData)
      setPrefillData(updatedData)
      setTimeout(() => {
        retoolAction()
      }, 1000)
    }
  }

  return (
    <div className="forms-container">
      {formsData && formsData.length ? (
        <>
          {formsData.map((form: any, i: number) => {
            return (
              <div
                className="form-io-wrapper"
                ref={(el) =>
                  formsContainer.current[i]
                    ? (formsContainer.current[i].current = el)
                    : null
                }
                key={i}
              ></div>
            )
          })}
          <div className="button-wrapper">
            <button onClick={handleFormSubmitFormIO}>Continue</button>
          </div>
        </>
      ) : null}
    </div>
  )
}
