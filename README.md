This is a Tauri empty project with Next.js frontend.

To run it you just need to modify the `tauri.conf.json` file.
First you need to change the `productName` and `identifier` fields to your project name. 

Once you have done that, you have to execute `pnpm install`. After that you can run `pnpm tauri dev` to start the development server.

`pnpm tauri build` will build the app.

`pnpm tauri dev -- --debug` will start the development server in debug mode.

You can find more information about Tauri in the [Tauri 2.0 guide](https://v2.tauri.app/es/start/) or in the [Tauri 1.0 official documentation](https://v2.tauri.app/es/start/).
