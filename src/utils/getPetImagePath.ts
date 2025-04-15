type Page = "registration" | "login" | "add";
type Screen = "mobile" | "tablet" | "desktop";
type Size = "1x" | "2x";
type Type = "img" | "bg";

export const getImagePath = ({
  page,
  screen,
  size,
  type,
}: {
  page: Page;
  screen: Screen;
  size: Size;
  type: Type;
}): string => {
  const postfix = size === "2x" ? "@2x" : "";
  const fileName =
    type === "bg"
      ? `bg-${screen}${postfix}.png`
      : `pet-${screen}-img${postfix}.png`;

  return `/images/pet-block/${page}/${fileName}`;
};
