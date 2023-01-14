import { ComponentMeta, ComponentStory } from '@storybook/react'
import TextInput from './TextInput'

export default {
  title: 'UI/Form/TextInput',
  component: TextInput,
  argTypes: {},
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
)

export const Default = Template.bind({})

Default.args = {}

export const WithLabel = Template.bind({})

WithLabel.args = {
  label: 'Example',
}

export const WithLabelOptional = Template.bind({})

WithLabelOptional.args = {
  label: 'Example',
  optional: true,
}

export const WithError = Template.bind({})

WithError.args = {
  error: 'This is the error message',
  label: 'Error input',
}
