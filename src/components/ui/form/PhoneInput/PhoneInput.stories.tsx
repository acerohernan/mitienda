import { ComponentStory } from '@storybook/react'
import PhoneInput from './PhoneInput'

export default {
  title: 'UI/Form/PhoneInput',
  component: PhoneInput,
}

const Template: ComponentStory<typeof PhoneInput> = (args) => (
  <PhoneInput {...args} />
)

export const Default = Template.bind({})

Default.args = {
  onPrefixChange: () => {},
}
