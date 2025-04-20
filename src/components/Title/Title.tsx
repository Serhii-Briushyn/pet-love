type PageType = "register" | "login" | "news" | "notices" | "friends";

type PageConfigItem = {
  title: string;
  description?: string;
};

type TitleProps = {
  page: PageType;
};

const pageConfig: Record<PageType, PageConfigItem> = {
  register: {
    title: "Registration",
    description: "Thank you for your interest in our platform.",
  },
  login: {
    title: "Log in",
    description:
      "Welcome! Please enter your credentials to login to the platform:",
  },
  news: {
    title: "News",
  },
  friends: {
    title: "Our friends",
  },
  notices: {
    title: "Find your favorite pet",
  },
};

const Title: React.FC<TitleProps> = ({ page }) => {
  const { title, description } = pageConfig[page];

  return (
    <>
      <h1 className="tablet:text-[54px] text-[28px] leading-none font-bold">
        {title}
      </h1>
      {description && <p className="tablet:text-lg text-sm">{description}</p>}
    </>
  );
};

export default Title;
