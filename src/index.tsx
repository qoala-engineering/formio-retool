import React, { createRef, useEffect, useRef, useState } from 'react'
import { type FC } from 'react'
import { Form, Components } from '@formio/react'

import './css/_form-io.css'
import './output.css'

import { Retool } from '@tryretool/custom-component-support'
import moment from 'moment'

import components from './formio'

import S3Uploder from './S3Uploader'
import CPhoneNumber from './cPhoneNumber'

interface Props {
  action: any
  setPristine: boolean
  isNewForm: boolean
}

console.log(components)

Components.setComponents({
  ...components,
  s3uploader: S3Uploder,
  cPhoneNumber: CPhoneNumber
})

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

  if (
    !prefillData ||
    !formsContainer?.current?.length ||
    !formsData ||
    !formsData.length
  ) {
    return null
  }

  const updateDataArrayAtIndex = (index: any, event: any, isValid: any) => {
    updatedArray[index] = { ...event?.data, isValid }

    setUpdatedData(updatedArray)
  }

  function updateForms(forms: any) {
    setFormsIO(forms)
  }

  const handleFormSubmitFormIO = () => {
    let isValid = true

    formsIO.forEach((form: any, index: number) => {
      form.setPristine(false)

      console.log('filter', updatedData)
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
              <Form
                form={form}
                onChange={(obj: any) => {
                  updateDataArrayAtIndex(i, obj, obj.isValid)
                }}
                formReady={(form: any) => {
                  forms.push(form)
                  updateForms(forms)
                  if (prefillData && prefillData.length) {
                    let data = prefillData[i],
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
                }}
              />
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
