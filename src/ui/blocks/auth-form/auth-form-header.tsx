type AuthFormHeaderProps = {
  title: string;
};

export function AuthFormHeader({ title }: AuthFormHeaderProps) {
  return (
    <header className="bg-background text-foreground w-full  flex justify-center items-center p-[50px]">
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-foreground text-3xl font-bold">{title}</h4>
        <div className="w-12 h-[3.29px] bg-primary-100" />
      </div>
    </header>
  );
}
