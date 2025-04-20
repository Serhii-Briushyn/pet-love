import LogOutBtn from "components/LogOutBtn/LogOutBtn";
type UserProps = {
  isInverted?: boolean;
  variant?: "header" | "menu";
};

const UserNav: React.FC<UserProps> = ({ isInverted, variant }) => {
  return (
    <>
      <LogOutBtn isInverted={isInverted} variant={variant} />
    </>
  );
};

export default UserNav;
