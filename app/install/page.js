import React from "react";

export default function InstallCert() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Install Certificate for Local Server</h1>
      <p className="mb-2">To securely connect to your school&apos;s local server, install this certificate:</p>

      <a
        href="/rootCA.crt"
        download
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download Certificate
      </a>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">📱 Android</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Download the certificate above.</li>
        <li>Go to <b>Settings → Security → Install from storage</b>.</li>
        <li>Choose &quot;CA certificate&quot; and install.</li>
        <li>Trust it for &quot;VPN and apps&quot; if prompted.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">📱 iOS</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Download the certificate in Safari.</li>
        <li>Go to <b>Settings → Profile Downloaded</b>.</li>
        <li>Install the profile and trust it at <b>Settings → General → About → Certificate Trust Settings</b>.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">💻 Windows</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Double-click the certificate.</li>
        <li>Click “Install Certificate” → Choose “Local Machine”</li>
        <li>Select “Trusted Root Certification Authorities”</li>
        <li>Finish and restart your browser.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">💻 macOS</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Double-click the certificate.</li>
        <li>It opens in Keychain Access.</li>
        <li>Right-click → “Get Info” → Expand “Trust”</li>
        <li>Set “When using this certificate” to “Always Trust”</li>
      </ul>
    </div>
  );
}
