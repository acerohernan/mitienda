import { ComponentMeta, ComponentStory } from '@storybook/react'
import Select, { SelectOption } from './Select'

export default {
  title: 'UI/Form/Select',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Default = Template.bind({})

const items: Array<SelectOption> = [
  {
    component: <span>Option 1</span>,
    value: 'Option 1',
  },
  {
    component: <span>Option 2</span>,
    value: 'Option 2',
  },
  {
    component: <span>Option 3</span>,
    value: 'Option 3',
  },
]

const selectedOption: SelectOption = items[0]

Default.args = {
  items,
  selectedOption,
}
