import PhoneInput from '@/components/ui/form/PhoneInput'
import Select from '@/components/ui/form/Select'
import TextInput from '@/components/ui/form/TextInput'
import Spinner from '@/components/ui/loaders/Spinner'

export default function Home() {
  return (
    <div>
      <h1 className="border bg-red-400">Hello World - Storybook</h1>
      <Select
        items={[
          { component: <h1>Hey</h1>, value: 'Het' },
          { component: <h1>Hey</h1>, value: 'Het' },
          { component: <h1>Hey</h1>, value: 'Het' },
        ]}
        onChange={() => {}}
        selectedOption={{ component: <h1>Hey</h1>, value: 'Het' }}
      />
      <TextInput label="Input" error="This is an error message" />
      <Spinner />
      <PhoneInput onPrefixChange={() => {}} />
    </div>
  )
}
