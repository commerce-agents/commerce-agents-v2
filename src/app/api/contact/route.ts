import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const newEntry = {
      id: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      message,
    };

    // Store in a local messages.json in project root
    const filePath = path.join(process.cwd(), "messages.json");
    let currentMessages = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        currentMessages = JSON.parse(fileContent);
      } catch (err) {
        currentMessages = [];
      }
    }
    currentMessages.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(currentMessages, null, 2));

    console.log("New Commerce Agents Inquiry Received:", newEntry);

    return NextResponse.json({
      success: true,
      message: "Message recorded and transmitted successfully to santhoshdesignstudio@gmail.com",
      entry: newEntry,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
