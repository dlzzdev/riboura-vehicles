import { PropsWithChildren } from "react";

interface ContainerProps {
  children: any;
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
}) => {
  return (
    <main className="min-h-container p-container max-w-container m-container">
      {children}
    </main>
  );
};
