import { ComponentStory } from '@storybook/react'
import Spinner from './Spinner'

export default {
  title: 'UI/Loaders/Spinner',
  component: Spinner,
}

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />
export const Default = Template.bind({})
