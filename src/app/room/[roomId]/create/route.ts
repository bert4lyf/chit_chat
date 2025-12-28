import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

export async function POST() {
  const roomId = nanoid()
  return NextResponse.json({ roomId })
}
