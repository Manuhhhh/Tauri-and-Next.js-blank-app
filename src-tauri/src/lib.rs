mod delete_business;
mod fetch_business_list;
mod verify_password;

use delete_business::delete_business;
use fetch_business_list::{fetch_business_list, Response};
use verify_password::check_password;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            verify_pass,
            fetch_shops,
            delete_bus
        ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn verify_pass(pass: String) -> bool {
    match check_password(pass).await {
        Ok(result) => result,
        Err(e) => {
            println!("Error: {:?}", e);
            false
        }
    }
}

#[tauri::command]
async fn fetch_shops(page: u32, search: String, category: String) -> Response {
    let result = fetch_business_list(page, search, category).await;
    match result {
        Ok(result) => result,
        Err(e) => {
            println!("Error: {:?}", e);
            Response {
                business_list: vec![],
                pages_count: 1,
            }
        }
    }
}

#[tauri::command]
async fn delete_bus(id: String) {
    match delete_business(id).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}
