import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

{
  /* GET - Fetch Gallery Items */
}
export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

{
  /* POST - Create New Gallery Item */
}
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    {
      /* Validate Required Fields */
    }
    if (
      !body.title ||
      !body.image ||
      !body.description ||
      !body.imagePublicId
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, image, imagePublicId, and description are required",
        },
        { status: 400 }
      );
    }

    const newItem = await Gallery.create(body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create gallery item",
      },
      { status: 500 }
    );
  }
}
