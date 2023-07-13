import { Wanted } from "../components/wanted";

export const RootPage = () => {
  return (
    <main className="mx-auto my-24 w-full max-w-xl px-3 text-center">
      <h1 className="mb-10 text-3xl font-medium">Are you wanted?</h1>

      <Wanted />
    </main>
  );
};
