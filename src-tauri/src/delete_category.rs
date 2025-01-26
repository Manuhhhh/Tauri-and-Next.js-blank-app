use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct DeleteCategoryBody {
    pub category_id: String,
    pub password: String,
}

pub async fn delete_category(data: DeleteCategoryBody) -> Result<bool, Box<dyn std::error::Error>> {
    let client = Client::new();

    let url = format!("{}/api/categories?password={}&id={}", crate::config::HOST, data.password, data.category_id);

    let response = client.delete(url).send().await;

    if response?.status().is_success() {
        Ok(true)
    } else {
        Ok(false)
    }
}   