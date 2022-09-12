/** @jsx h */
import { h } from "preact";
import { WP_REST_API_Posts } from "https://raw.githubusercontent.com/johnbillion/wp-json-schemas/trunk/packages/wp-types/index.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<WP_REST_API_Posts> = {
  async GET(_req, ctx) {
    try {
      const api = new URL("./wp/v2/pages", Deno.env.get("WP_REST_API")!);
      const json: WP_REST_API_Posts = await (await fetch(api)).json();
      return ctx.render(json);
    } catch (e) {
      console.error(e);
    }
    return new Response("API endpoint error", { status: 500 });
  },
};

export default function Home(props: PageProps<WP_REST_API_Posts>) {
  return (
    <div>
      <div
        style="background-image: url(macaron.webp)"
        class="h-[48rem] bg-cover bg-center flex flex-col justify-between items-center"
      >
        <div class="bg-gradient-to-b from-gray-900 to-transparent w-full">
          {/* fade */}
          <nav class="flex max-w-7xl p-8 mx-auto">
            <div class="flex-1">
              <img src="/logo.svg" alt="Logo" />
            </div>

            <ul class="flex items-center uppercase text-white gap-4">
              <a href="https://twitter.com/deno_land">
                <img src="./tw.svg" alt="Twitter" />
              </a>
              <li>Menu</li>
              <li>Company</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>

        <div class="bg-gray-900 text-white w-xl text-center rounded px-8 py-12 flex flex-col gap-8 -mb-8 items-center shadow-xl">
          <h2 class="text-3xl font-serif">
            Infinite macarons everywhere.
          </h2>
          <button class="bg-red-600 px-12 py-3 uppercase rounded-3xl">
            Join the Waitlist
          </button>
        </div>
      </div>

      {props.data.map((post) => (
        <div class="mt-40 max-w-5xl mx-auto md:flex gap-16 odd:flex-row-reverse px-4">
          <div class="flex-1 space-y-8">
            <h2 class="text-2xl font-bold">
              {post.title.rendered}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>
          <div
            class="w-md h-md bg-cover"
            style={`background-image: url(${post.image})`}
          >
            <img
              src="flake.svg"
              class="hidden md:block w-32 -ml-16 -mt-8 select-none"
              alt=""
            />
            {/* leave alt empty for the decorative image */}
          </div>
        </div>
      ))}

      <div>
        <img src="./line.svg" alt="" class="mx-auto mt-10" />
      </div>

      <footer class="text-center px-8 py-8">
        <img class="mx-auto w-32" src="/logo-dark.svg" alt="Logo" />
        <p class="text-gray-600 text-sm">
          Copyright © 2022 Sweets, co.
        </p>
      </footer>
    </div>
  );
}
