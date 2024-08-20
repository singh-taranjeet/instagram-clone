import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from './index';

const meta = {
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};