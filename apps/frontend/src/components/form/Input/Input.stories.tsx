import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import TextInput from "../text";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Controls/Input",
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "test@test.com",
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "test@test.com",
    label: "Email",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "test@test.com",
    label: "Email",
    error: "Please enter a valid email",
  },
};
