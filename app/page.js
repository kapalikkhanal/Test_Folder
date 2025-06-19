"use client";
import { useState } from "react";
import axios from "axios";

export default function ServerChecker() {
  const [protocol, setProtocol] = useState("https" > "https");
  const [url, setUrl] = useState("");
  const [port, setPort] = useState("3001");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkServer = async () => {
    if (!url || !port) {
      setError("Please enter URL and port");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Clean the URL (remove http/https if present)
      const cleanUrl = url.replace(/^https?:\/\//, "");
      const endpoint = `${protocol}://${cleanUrl}:${port}/check`;

      // For HTTPS with self-signed certs, we need to bypass verification
      const httpsAgent =
        protocol === "https"
          ? new (require("https").Agent)({ rejectUnauthorized: false })
          : undefined;

      const response = await axios.get(endpoint, { httpsAgent });
      setResult(response.data);
    } catch (err) {
      setError(err.message || "Failed to connect to server");
      console.error("Error checking server:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Server Status Checker
            </h1>
            <p className="mt-2 text-gray-600">
              Check if your server is running and accessible
            </p>
          </div>

          <div className="space-y-6">
            {/* Protocol Selector */}
            <div>
              <label
                htmlFor="protocol"
                className="block text-sm font-medium text-gray-700"
              >
                Protocol
              </label>
              <select
                id="protocol"
                value={protocol}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "http" || value === "https") {
                    setProtocol(value);
                  }
                }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              >
                <option value="http">HTTP</option>
                <option value="https">HTTPS</option>
              </select>
            </div>

            {/* URL Input */}
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Server URL or IP Address
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com or 192.168.1.100"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Port Input */}
            <div>
              <label
                htmlFor="port"
                className="block text-sm font-medium text-gray-700"
              >
                Port
              </label>
              <input
                type="text"
                id="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="3001"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Check Button */}
            <div>
              <button
                onClick={checkServer}
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Checking...
                  </>
                ) : (
                  "Check Server"
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Server Response
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <pre className="whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
