import { randomUUID } from "crypto";

import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import {
  extensionFromMimeType,
  isAcceptedImageType,
  MAX_IMAGE_SIZE,
} from "@/lib/uploads";

export const runtime = "nodejs";

function uploadError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function fileToDataUrl(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return uploadError("로그인 후 이미지를 올릴 수 있습니다.", 401);
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return uploadError("대표 이미지 파일을 선택해주세요.");
    }

    if (!isAcceptedImageType(file.type)) {
      return uploadError("jpg, jpeg, png, webp 형식의 이미지만 기록할 수 있습니다.");
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return uploadError("이미지는 5MB 이하로 올려주세요.");
    }

    const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

    if (!hasBlobToken) {
      return NextResponse.json({
        url: await fileToDataUrl(file),
        fallback: true,
      });
    }

    try {
      const extension = extensionFromMimeType(file.type);
      const pathname = `items/${userId}/${randomUUID()}.${extension}`;

      const blob = await put(pathname, file, {
        access: "public",
      });

      return NextResponse.json({
        url: blob.url,
        fallback: false,
      });
    } catch (error) {
      console.error("[UPLOAD_BLOB_FAILED]", error);

      return NextResponse.json({
        url: await fileToDataUrl(file),
        fallback: true,
      });
    }
  } catch (error) {
    console.error("[UPLOAD_ROUTE_FAILED]", error);

    return uploadError(
      "이미지 업로드 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      500
    );
  }
}