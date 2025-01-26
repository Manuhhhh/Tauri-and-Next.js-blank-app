mod add_business;
mod add_event;
mod delete_business;
mod delete_event;
mod edit_business;
mod edit_event;
mod fetch_business_list;
mod fetch_event_list;
mod verify_password;
mod config;
mod add_category;
mod delete_category;

use add_event::{add_event, AddEvent};
use delete_event::delete_event;
use edit_event::{edit_event, Event};
use fetch_event_list::{fetch_event_list, EventResponse};

use add_business::{add_business, AddBusiness};
use delete_business::delete_business;
use edit_business::{edit_business, Business};
use fetch_business_list::{fetch_business_list, Response};
use verify_password::check_password;

use add_category::{add_category, CategoryData};
use delete_category::{delete_category, DeleteCategoryBody};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            verify_pass,
            fetch_shops,
            delete_bus,
            edit_bus,
            add_bus,
            fetch_activities,
            delete_eve,
            edit_eve,
            add_eve,
            add_cat,
            delete_cat
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
async fn fetch_activities(page: u32, search: String, category: String) -> EventResponse {
    let result = fetch_event_list(page, search, category).await;
    match result {
        Ok(result) => result,
        Err(e) => {
            println!("Error: {:?}", e);
            EventResponse {
                event_list: vec![],
                pages_count: 1,
            }
        }
    }
}

#[tauri::command]
async fn delete_bus(id: String, password: String) {
    match delete_business(id, password).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}

#[tauri::command]
async fn delete_eve(id: String, password: String) {
    match delete_event(id, password).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}

#[tauri::command]
async fn edit_bus(data: Business) {
    match edit_business(data).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}

#[tauri::command]
async fn edit_eve(data: Event) {
    match edit_event(data).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}


#[tauri::command]
async fn add_bus(data: AddBusiness) {
    match add_business(data).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}

#[tauri::command]
async fn add_eve(data: AddEvent) {
    match add_event(data).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}

#[tauri::command]
async fn add_cat(data: CategoryData) {
    match add_category(data).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}

#[tauri::command]
async fn delete_cat(data: DeleteCategoryBody) {
    match delete_category(data).await {
        Ok(_) => {
            true;
        }
        Err(_) => {
            false;
        }
    }
}