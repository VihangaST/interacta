import Form from "../components/Form";
import { useState } from "react";
function LandingPage() {
  const [descriptionBased, setDescriptionBased] = useState(false);
  return (
    <>
      <main className="min-vh-100 bg-secondary-subtle">
        <div>
          <button
            className={`btn btn-${
              descriptionBased ? "success" : "primary"
            } col font-monospace fs-6`}
            onClick={() => setDescriptionBased(!descriptionBased)}
          >
            {descriptionBased ? "Enable topic based" : "Enable Description"}
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <Form descriptionBased={descriptionBased} />
        </div>
      </main>
    </>
  );
}

export default LandingPage;
