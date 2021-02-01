export interface OptionalData {
  label: string,
  value: boolean | string | number
}

interface Field {
  label: string,
  type: "textLabel" | "text" | "multiplechoice" | "number" | "longtext" | "dropdown" | "camera",
  tag: string,
  cols: string,
  required: boolean,
  configuration: {
    metadata: boolean,
    classification?: {
      status: boolean,
      data: string[] | number[]
    },
    alarm?: boolean,
    resource_planning?: {
      status: boolean,
      data: string
    },
    option?: {
      status: boolean,
      data: OptionalData[]
    },
    randomize?: boolean,
    unit?: {
      status: boolean,
      data: string
    },
  },
  standartLabel?: string | boolean | number,
  standart?: {
    topRule?: "<" | "<=" | "=" | ">=" | ">" | "!=" | "",
    topTarget?: number | string,
    downRule?: "<" | "<=" | "=" | ">=" | ">" | "!=" | "",
    downTarget?: number | string,
    type?: "Range" | "multipleChoice",
    target?: boolean,
    label?: string,
    value?: boolean | string | number
  },
}

interface Section {
  id: number,
  label: string,
  type: string,
  shown: boolean,
  tag: string,
  fields: Field[]
}

export interface JSONForm {
  label: string,
  description: string,
  type: string,
  variabelSubmit: string[],
  notRequiredValue: string[],
  cardName: string,
  category: {
    id: number,
    data: string
  },
  step: {
    id: number,
    data: string
  },
  machine: {
    id: number,
    data: string
  } | Record<string, number | string>,
  area: {
    id: number,
    data: string
  },
  lineId?: number,
  tag: {
    id: string,
    data: string
  },
  sop: {
    id: number,
    data: string
  },
  post_url: string,
  redirect: string,
  sections: Section[],
  interlocks?: {
    id: number,
    data: string
  }[],
  isHideAfterInput?: boolean;
}
