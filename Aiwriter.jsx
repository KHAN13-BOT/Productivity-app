import { useState } from "react";
import { FaMagic, FaCopy } from "react-icons/fa";

export default function Aiwriter() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("http://localhost:5000/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      setOutput(
        data?.output || "No response received from AI"
      );
    } catch (error) {
      console.log(error);
      setOutput("Error: Server not responding");
    }

    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="p-6 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">AI Writer</h1>
        <p className="text-gray-500 text-sm">
          Generate smart content using AI
        </p>
      </div>

      {/* INPUT */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">

        <textarea
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          rows="5"
          placeholder="Write your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition disabled:opacity-50"
        >
          <FaMagic />
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* OUTPUT */}
      <div className="bg-white p-4 rounded-lg shadow min-h-[150px]">

        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold">Output</h2>

          {output && (
            <button
              onClick={copyText}
              className="text-sm text-purple-600 flex items-center gap-1"
            >
              <FaCopy /> Copy
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-500 animate-pulse">
            Generating response...
          </p>
        ) : (
          <p className="text-gray-700 whitespace-pre-line">
            {output || "Your AI result will appear here..."}
          </p>
        )}
      </div>

    </div>
  );
}