use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CategoryData {
    pub category_type: String,
    pub description: Option<String>,
    pub name: String,
    pub svg_logo: Option<String>,
    pub password: String,
}

pub async fn add_category(category_data: CategoryData) -> Result<bool, Box<dyn std::error::Error>> {
    let client = Client::new();

    let url = format!("{}/api/categories", crate::config::HOST);

    let response = client.put(url).json(&category_data).send().await?;

    if response.status().is_success() {
        Ok(true)
    } else {
        Ok(false)
    }
}
