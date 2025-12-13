use tauri_plugin_shell::ShellExt;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let aria2c = app.shell().sidecar("aria2c").map_err(|e| {
                eprintln!("Aria2c Binary Not Found {}", e);
                e
            })?;

            let (_rx, _child) = aria2c
                .args([
                    "--enable-rpc",
                    "--rpc-listen-port=6800",
                    "--rpc-allow-origin-all",
                    "--rpc-listen-all=false",
                    "--quiet=true",
                ])
                .spawn()
                .expect("Failed to start Aria2c");

            println!("Aria2c Run On Port 6800!");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
