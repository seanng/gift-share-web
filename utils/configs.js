export const WIZARD_STEPS = [
  {
    title: "What's your name and email?",
    description: '請留下可收信的信箱，我們會透過此信箱寄送禮物進度給您！',
    inputs: [
      {
        name: 'creator',
        type: 'text',
        label: 'Name',
        validation: { required: true },
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        validation: { required: true },
      },
    ],
  },
  {
    title: "Who's the lucky recipient?",
    inputs: [
      {
        name: 'recipient',
        type: 'text',
        label: 'Recipient',
        validation: { required: true },
      },
    ],
  },
  {
    title: 'Enter the gift details',
    inputs: [
      {
        name: 'giftName',
        type: 'text',
        label: 'Gift name',
        validation: { required: true },
      },
      {
        name: 'giftPrice',
        type: 'number',
        label: 'Gift price',
        validation: { required: true },
      },
      {
        name: 'giftWebsite',
        type: 'text',
        label: 'Gift website (optional)',
      },
    ],
  },
  {
    title: 'How many contributors?',
    description:
      'Enter the minimum number of contributors for this gift.\nThe project will be cancelled if this number is not met.',
    inputs: [
      {
        name: 'minContributors',
        type: 'number',
        label: 'Minimum contributors',
        validation: { required: true, min: 1 },
        defaultValue: 1,
      },
    ],
  },
]

export const INITIAL_CREATE_FORM_STATE = {
  creator: '',
  email: '',
  recipient: '',
  giftName: '',
  giftPrice: '',
  giftWebsite: '',
  minContributors: '',
}

export const INITIAL_ROOM_DATA_STATE = {}
