import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./index";

const meta = {
  component: Icon.Logo.Large,
} as Meta<typeof Icon.Logo.Large>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  render: () => <Icon.Home />,
};

export const Comment: Story = {
  render: () => <Icon.Comment />,
};

export const Plus: Story = {
  render: () => <Icon.Plus />,
};

export const Fav: Story = {
  render: () => <Icon.Fav />,
};

export const Down: Story = {
  render: () => <Icon.Down />,
};

export const Search: Story = {
  render: () => <Icon.Search />,
};

export const Posts: Story = {
  render: () => <Icon.Posts />,
};

export const Share: Story = {
  render: () => <Icon.Share />,
};

export const BookMark: Story = {
  render: () => <Icon.BookMark />,
};

export const LogoSmall: Story = {
  render: () => <Icon.Logo.Small />,
};

export const LogoLarge: Story = {
  render: () => <Icon.Logo.Large />,
};
