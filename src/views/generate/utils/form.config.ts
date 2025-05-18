interface FormData {
  niche: string
  companyName: string
  imageContent: string
  colors: string
  ctaText: string
  designStyle: string
  imageSize: string
}

interface FormField {
  label: string
  model: keyof FormData
  placeholder: string
}

export const form = ref<FormData>({
  niche: '',
  companyName: '',
  imageContent: '',
  colors: '',
  ctaText: '',
  designStyle: '',
  imageSize: '1024x1024'
})

export const formConfig: FormField[] = [
  {
    label: 'Enter a niche',
    model: 'niche',
    placeholder: 'e.g Healthcare'
  },
  {
    label: 'Enter a company name',
    model: 'companyName',
    placeholder: 'e.g IT Company'
  },
  {
    label: 'Enter an image content',
    model: 'imageContent',
    placeholder: 'e.g Person with laptop'
  },
  {
    label: 'Enter additional colors',
    model: 'colors',
    placeholder: 'e.g blue, green, white'
  },
  {
    label: 'Enter a call-to-action text',
    model: 'ctaText',
    placeholder: 'e.g Get Started'
  },
  {
    label: 'Enter a design style',
    model: 'designStyle',
    placeholder: 'e.g Minimalistic, Future'
  }
]
