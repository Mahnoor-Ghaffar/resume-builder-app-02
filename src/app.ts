// regex for validation
const strRegex: RegExp = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports formats - (123) 456-7890, 123-456-7890, etc. */
const digitRegex: RegExp = /^\d+$/;

const mainForm = document.getElementById('cv-form') as HTMLFormElement;

const validType = {
  TEXT: 'text',
  TEXT_EMP: 'text_emp',
  EMAIL: 'email',
  DIGIT: 'digit',
  PHONENO: 'phoneno',
  ANY: 'any',
} as const;

type ValidType = keyof typeof validType;

// user input elements
const firstnameElem = mainForm.elements.namedItem('firstname') as HTMLInputElement;
const middlenameElem = mainForm.elements.namedItem('middlename') as HTMLInputElement;
const lastnameElem = mainForm.elements.namedItem('lastname') as HTMLInputElement;
const imageElem = mainForm.elements.namedItem('image') as HTMLInputElement;
const designationElem = mainForm.elements.namedItem('designation') as HTMLInputElement;
const addressElem = mainForm.elements.namedItem('address') as HTMLInputElement;
const emailElem = mainForm.elements.namedItem('email') as HTMLInputElement;
const phonenoElem = mainForm.elements.namedItem('phoneno') as HTMLInputElement;
const summaryElem = mainForm.elements.namedItem('summary') as HTMLTextAreaElement;

// display elements
const nameDsp = document.getElementById('fullname_dsp') as HTMLElement;
const imageDsp = document.getElementById('image_dsp') as HTMLImageElement;
const phonenoDsp = document.getElementById('phoneno_dsp') as HTMLElement;
const emailDsp = document.getElementById('email_dsp') as HTMLElement;
const addressDsp = document.getElementById('address_dsp') as HTMLElement;
const designationDsp = document.getElementById('designation_dsp') as HTMLElement;
const summaryDsp = document.getElementById('summary_dsp') as HTMLElement;
const projectsDsp = document.getElementById('projects_dsp') as HTMLElement;
const achievementsDsp = document.getElementById('achievements_dsp') as HTMLElement;
const skillsDsp = document.getElementById('skills_dsp') as HTMLElement;
const educationsDsp = document.getElementById('educations_dsp') as HTMLElement;
const experiencesDsp = document.getElementById('experiences_dsp') as HTMLElement;

type FormDataObject = Record<string, string>;

const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement>[]): FormDataObject[] => {
  const elemsAttrsCount = nodeLists.length;
  const elemsDataCount = nodeLists[0].length;
  const tempDataArr: FormDataObject[] = [];

  for (let i = 0; i < elemsDataCount; i++) {
    const dataObj: FormDataObject = {};
    for (let j = 0; j < elemsAttrsCount; j++) {
      dataObj[attrs[j]] = nodeLists[j][i].value;
    }
    tempDataArr.push(dataObj);
  }
  return tempDataArr;
};

const getUserInputs = () => {
  const achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>;
  const achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLInputElement>;

  const expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>;
  const expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>;
  const expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>;
  const expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>;
  const expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>;
  const expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLInputElement>;

  const eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>;
  const eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>;
  const eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>;
  const eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>;
  const eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>;
  const eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLInputElement>;

  const projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>;
  const projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>;
  const projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLInputElement>;

  const skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

  return {
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,
    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
    experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
    educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
    projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
    skills: fetchValues(['skill'], skillElem),
  };
};

const validateFormData = (elem: HTMLInputElement, elemType: ValidType, elemName: string): void => {
  const value = elem.value.trim();

  if (elemType === 'TEXT' && (!strRegex.test(value) || value.length === 0)) {
    addErrMsg(elem, elemName);
  } else if (elemType === 'TEXT_EMP' && !strRegex.test(value)) {
    addErrMsg(elem, elemName);
  } else if (elemType === 'EMAIL' && (!emailRegex.test(value) || value.length === 0)) {
    addErrMsg(elem, elemName);
  } else if (elemType === 'PHONENO' && (!phoneRegex.test(value) || value.length === 0)) {
    addErrMsg(elem, elemName);
  } else if (elemType === 'ANY' && value.length === 0) {
    addErrMsg(elem, elemName);
  } else {
    removeErrMsg(elem);
  }
};

const addErrMsg = (formElem: HTMLInputElement, formElemName: string): void => {
  if (formElem.nextElementSibling) {
    formElem.nextElementSibling.textContent = `${formElemName} is invalid`;
  }
};

const removeErrMsg = (formElem: HTMLInputElement): void => {
  if (formElem.nextElementSibling) {
    formElem.nextElementSibling.textContent = '';
  }
};

const showListData = (listData: FormDataObject[], listContainer: HTMLElement): void => {
  listContainer.innerHTML = '';
  listData.forEach(listItem => {
    const itemElem = document.createElement('div');
    itemElem.classList.add('preview-item');

    for (const key in listItem) {
      const subItemElem = document.createElement('span');
      subItemElem.classList.add('preview-item-val');
      subItemElem.textContent = `${listItem[key]}`;
      itemElem.appendChild(subItemElem);
    }

    listContainer.appendChild(itemElem);
  });
};

const displayCV = (userData: ReturnType<typeof getUserInputs>): void => {
  nameDsp.textContent = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
  phonenoDsp.textContent = userData.phoneno;
  emailDsp.textContent = userData.email;
  addressDsp.textContent = userData.address;
  designationDsp.textContent = userData.designation;
  summaryDsp.textContent = userData.summary;
  showListData(userData.achievements, achievementsDsp);
  showListData(userData.experiences, experiencesDsp);
  showListData(userData.educations, educationsDsp);
  showListData(userData.projects, projectsDsp);
  showListData(userData.skills, skillsDsp);
};

// Call displayCV to test
mainForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
  const userData = getUserInputs();
  displayCV(userData);
});
