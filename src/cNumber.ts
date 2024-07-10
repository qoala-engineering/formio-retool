import { Components } from "formiojs";

import cPhoneNumberEditForm from "./CPhoneNumber.form";
import countryList from "./constants/countryList";

// import phoneCountryList from "@/shared/constants/phoneCountryList.constant";

const Field = Components.components.field;

class CPhoneNumber extends Field {
  dataPhoneCountryList = countryList;

  constructor(
    component: unknown,
    options: Record<string, unknown>,
    data: Record<string, unknown>,
  ) {
    super(component, options, data);
  }



  static schema(...extend: any[]): any {
    return Field.schema(
      {
        type: "cPhoneNumber",
        label: "Phone Number",
        key: "phoneNumber",
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...extend,
    );
  }

  static get builderInfo(): any {
    return {
      title: "Phone Number with Dial Code",
      group: "advanced",
      icon: "phone-square",
      weight: 70,
      schema: CPhoneNumber.schema(),
    };
  }

  static editForm = cPhoneNumberEditForm;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get defaultSchema(): any {
    return CPhoneNumber.schema();
  }

  render(): string {
    let optionList = ``;
    const template = `
    <div ref="cPhoneNumber" class="input-group formio-multiple-mask-container" aria-invalid="false">
    <div class="dropdown">
      <input ref="selectDialCode" value="+62" hidden />
      <button ref="refDialCode" class="dropbtn">+62</button>
      <div id="refDropdown" ref="refDropdown" class="dropdown-content">
        <input ref="filterDropdown" id="filterDropdown" type="text" placeholder="Search by name">
        <div class="dropdown-content-wrapper">
          ${(() => {
            for (
              let index = 0;
              index < this.dataPhoneCountryList.length;
              index++
            ) {
              optionList += `<div ref="refDropdownContent" id="refDropdownContent${index}" data-index="${index}" class="list-dropdown">+${this.dataPhoneCountryList[index].dialCode} (${this.dataPhoneCountryList[index].name})</div>`;
            }
            return optionList;
          })()}
        </div>
      </div>
    </div>
      <input ref="refPhoneNumber" value="" spellcheck="true" inputmode="decimal" lang="en" class="form-control formio-multiple-mask-input" type="number" min="0" style="height:auto" name="data[cPhoneNumber]">
    </div>`;
    return super.render(template);
  }

  attach(element: any): any {
    this.loadRefs(element, {
      refPhoneNumber: "single",
      selectDialCode: "single",
      refDialCode: "single",
      refDropdown: "single",
      filterDropdown: "single",
    });

    this.addEventListener(
      (this.refs as any)?.refDialCode,
      "click",
      async (e: any) => {
        e.stopPropagation();
        (this.refs as any).refDropdown.classList.add("show");
      },
    );

    this.addEventListener(
      (this.refs as any)?.filterDropdown,
      "input",
      async (e: any) => {
        if (e?.target?.value != "") {
          const inputValue: string = e?.target?.value.toUpperCase();
          const dialCodeList = this.dataPhoneCountryList.filter(
            (phoneCountry) =>
              phoneCountry.name.toUpperCase().startsWith(inputValue),
          );

          for (let i = 0; i < this.dataPhoneCountryList.length; i++) {
            if (dialCodeList[i]) {
              (
                element.querySelector(`#refDropdownContent${i}`) as HTMLElement
              ).style.display = "";
              (
                element.querySelector(`#refDropdownContent${i}`) as HTMLElement
              ).textContent = `+${dialCodeList[i].dialCode} (${dialCodeList[i].name})`;
            } else {
              (
                element.querySelector(`#refDropdownContent${i}`) as HTMLElement
              ).style.display = "none";
            }
          }
        } else {
          this.dataPhoneCountryList = countryList;
          for (let i = 0; i < this.dataPhoneCountryList.length; i++) {
            (
              element.querySelector(`#refDropdownContent${i}`) as HTMLElement
            ).style.display = "";
            (
              element.querySelector(`#refDropdownContent${i}`) as HTMLElement
            ).textContent = `+${this.dataPhoneCountryList[i].dialCode} (${this.dataPhoneCountryList[i].name})`;
          }
        }
      },
    );

    const elementListDropdown = element.querySelectorAll(`.list-dropdown`);
    if (elementListDropdown) {
      elementListDropdown.forEach((listDropdown: any) =>
        listDropdown.addEventListener("click", (e: Event) => {
          const index = (e?.target as HTMLElement).getAttribute("data-index");
          const contentDropdown =
            (
              element.querySelector(
                `#refDropdownContent${index}`,
              ) as HTMLElement
            ).textContent || "";
          const splitContentDropdown = contentDropdown?.split(" ");
          (this.refs as any).selectDialCode.value =
            splitContentDropdown[0] || "";
          (this.refs as any).refDialCode.innerText = splitContentDropdown[0];
          this.setValue(
            {
              dialCode: (this.refs as any).selectDialCode.value,
              value: (this.refs as any).refPhoneNumber.value,
            },
            { modified: true },
          );
          (this.refs as any).refDropdown.classList.remove("show");
        }),
      );
    }

    this.addEventListener(
      (this.refs as any)?.refPhoneNumber,
      "input",
      async (e: Event) => {
        const dialCode = (this.refs as any).selectDialCode.value;
        const inputNumber = (e.target as any)?.value;
        if (inputNumber === "") {
          this.setValue("", { modified: true });
        }
        if (inputNumber && inputNumber.match("^[0-9]*$")) {
          this.setValue({ dialCode, value: inputNumber }, { modified: true });
        }
      },
    );
    return super.attach(element);
  }

  setValue(value: any, flags = {}): any {
    return super.setValue(value, flags);
  }

  getValue(): any {
    return super.getValue();
  }
}

export default CPhoneNumber;