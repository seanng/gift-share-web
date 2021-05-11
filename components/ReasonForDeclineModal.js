/**
 * @see https://tailwindui.com/components/application-ui/overlays/modals
 * @see https://tailwindui.com/components/application-ui/forms/radio-groups
 * */

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition, RadioGroup } from '@headlessui/react'

const reasons = [
  'The gift is too expensive',
  "I don't trust this site",
  'Another reason',
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReasonForDeclineModal({ open, setOpen }) {
  const [selected, setSelected] = useState(reasons[-1])
  const cancelButtonRef = useRef()

  const handleSendClick = () => {
    console.log('selected reason: ', selected)
    // send the state to google analytics or something
  }

  const handleCancelClick = () => {
    // reset form state.
    setOpen(false)
    setSelected(-1)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Please tell us why:
                  </Dialog.Title>
                  <div className="mt-5">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <RadioGroup.Label className="sr-only">
                        Privacy setting
                      </RadioGroup.Label>
                      <div className="bg-white rounded-md -space-y-px">
                        {reasons.map((reason, settingIdx) => (
                          <RadioGroup.Option
                            key={reason}
                            value={reason}
                            className={({ checked }) =>
                              classNames(
                                settingIdx === 0
                                  ? 'rounded-tl-md rounded-tr-md'
                                  : '',
                                settingIdx === reasons.length - 1
                                  ? 'rounded-bl-md rounded-br-md'
                                  : '',
                                checked
                                  ? 'bg-indigo-50 border-indigo-200 z-10'
                                  : 'border-gray-200',
                                'relative border p-4 flex cursor-pointer focus:outline-none'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <span
                                  className={classNames(
                                    checked
                                      ? 'bg-indigo-600 border-transparent'
                                      : 'bg-white border-gray-300',
                                    active
                                      ? 'ring-2 ring-offset-2 ring-indigo-500'
                                      : '',
                                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                  )}
                                  aria-hidden="true"
                                >
                                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                                </span>
                                <div className="ml-3 flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className={classNames(
                                      checked
                                        ? 'text-indigo-900'
                                        : 'text-gray-900',
                                      'block text-sm font-medium'
                                    )}
                                  >
                                    {reason}
                                  </RadioGroup.Label>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSendClick}
                >
                  Send
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={handleCancelClick}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
