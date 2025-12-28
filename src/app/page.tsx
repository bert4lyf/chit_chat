"use client"

import { useUsername } from "@/hooks/use-username"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

const Page = () => {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  )
}

export default Page

function Lobby() {
  const { username } = useUsername()
  const router = useRouter()

  const searchParams = useSearchParams()
  const wasDestroyed = searchParams.get("destroyed") === "true"
  const error = searchParams.get("error")

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post()

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`)
      }
    },
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {wasDestroyed && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM DESTROYED</p>
            <p className="text-zinc-500 text-xs mt-1">
              All messages were permanently deleted.
            </p>
          </div>
        )}
        {error === "room-not-found" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM NOT FOUND</p>
            <p className="text-zinc-500 text-xs mt-1">
              This room may have expired or never existed.
            </p>
          </div>
        )}
        {error === "room-full" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM FULL</p>
            <p className="text-zinc-500 text-xs mt-1">
              This room is at maximum capacity.
            </p>
          </div>
        )}

        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.12)]">
            {">"}chit *_* chat
          </h1>
          <p className="text-zinc-300 text-base">Let's Chat and self destruct any Trace 😈</p>
        </div>

        <div className="border border-zinc-700 bg-linear-to-b from-zinc-900/70 to-zinc-800/60 p-8 backdrop-blur-md rounded-xl shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-300 font-semibold">Your Identity</label>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-800 border border-zinc-700 p-3 text-sm text-zinc-100 font-mono rounded-md">
                  {username}
                </div>
              </div>
            </div>

            <button
              onClick={() => createRoom()}
              className="w-full bg-emerald-500 text-white py-3 text-base font-bold hover:bg-emerald-600 transition-colors mt-4 rounded-lg shadow-md uppercase tracking-wide disabled:opacity-50"
            >
              Create secured room
            </button>

            <p className="text-xs text-zinc-400 text-center mt-1">Tap to create a room — share the link with friends and start chatting privately.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
