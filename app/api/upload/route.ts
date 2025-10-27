import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    const type = formData.get("type") || "unknown";
    const uuid = formData.get("uuid") || randomUUID();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder:
                        process.env.NODE_ENV === "production"
                            ? "production"
                            : "development",
                    public_id: `${type}_${uuid}`,
                    overwrite: true,
                    invalidate: true,
                },
                (error, result) => {
                    if (error) {
                        reject(
                            Response.json(
                                { error: error.message },
                                { status: 500 },
                            ),
                        );
                    } else {
                        resolve(Response.json({ url: result?.secure_url }));
                    }
                },
            )
            .end(buffer);
    });
}
