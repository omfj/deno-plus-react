import { useState } from "react";

import { prettyList } from "../utils/list";
import { capitalize } from "../utils/text";

type WantedResponse = {
  name: string;
  reason: string;
  agency: string;
  countries: Array<string>;
};

export const Wanted = () => {
  const [name, setName] = useState("");
  const [resp, setResp] = useState<WantedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async () => {
    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    setError(null);
    setIsFetching(true);

    const resp = await fetch("/api/wanted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const json = (await resp.json()) as WantedResponse;

    setResp(json);
    setIsFetching(false);
  };

  const handleBack = () => {
    setResp(null);
    setName("");
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (resp) {
    return (
      <div className="space-y-4">
        <p>According to our databases,</p>

        <h2 className="text-2xl font-medium">{capitalize(resp.name)}</h2>

        <p>
          is wanted for <strong>{resp.reason.toLowerCase()}</strong> by{" "}
          <strong>{resp.agency}</strong> in{" "}
          <strong>{prettyList(resp.countries)}</strong>.
        </p>

        <button
          className="rounded-lg bg-blue-700 px-3 py-1 text-white transition-colors hover:bg-blue-600"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 text-left">
        <label htmlFor="name" className="font-medium">
          Your name
        </label>
        <input
          id="name"
          autoComplete="name"
          type="text"
          value={name}
          className="rounded-lg border bg-gray-100 px-3 py-1"
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />
        <p>
          <small className="text-sm text-red-500">{error}</small>
        </p>
      </div>

      <button
        className="rounded-lg bg-blue-700 px-3 py-1 text-white transition-colors hover:bg-blue-600"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleClick}
      >
        Check
      </button>
    </div>
  );
};
