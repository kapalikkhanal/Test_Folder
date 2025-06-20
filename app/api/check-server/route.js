import { NextResponse } from "next/server";
import https from "https";
import axios from "axios";

export async function POST(request) {
  try {
    const { protocol, url, port } = await request.json();

    if (!url || !port) {
      return NextResponse.json(
        { error: "URL and port are required" },
        { status: 400 }
      );
    }

    // Clean the URL (remove http/https if present)
    const cleanUrl = url.replace(/^https?:\/\//, "");
    const endpoint = `${protocol}://${cleanUrl}:${port}/check`;

    // For HTTPS with self-signed certs, bypass verification
    const httpsAgent =
      protocol === "https"
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined;

    console.log(endpoint);
    const response = await axios.get(endpoint, {
      httpsAgent,
      timeout: 10000, // 10 second timeout
    });

    return NextResponse.json(response.data);
  } catch (err) {
    let errorMessage = "Failed to connect to server";
    let statusCode = 500;

    if (err.code === "ECONNABORTED") {
      errorMessage =
        "Request timed out. The server might be slow or unreachable.";
      statusCode = 408;
    } else if (err.response) {
      errorMessage = `Server responded with status ${err.response.status}`;
      statusCode = err.response.status;
    } else if (err.request) {
      errorMessage = "No response received from server";
      statusCode = 502;
    } else {
      errorMessage = err.message || errorMessage;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
