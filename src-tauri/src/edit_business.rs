use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Business {
    pub edit_id: String,
    pub title: String,
    pub short_description: Option<String>,
    pub long_description: Option<String>,
    pub opening_hours: Option<String>,
    pub opening_time: Option<String>,
    pub location: Option<String>,
    pub categories: Option<Vec<String>>,
    pub image: Option<String>,
    pub contact: Option<String>,
    pub site: Option<String>,
    pub zone: Option<String>,
    pub email: Option<String>,
    pub password: String,
}

pub async fn edit_business(body: Business) -> Result<bool, Box<dyn std::error::Error>> {
    let client = Client::new();

    let url = format!("{}/api/business/edit", crate::config::HOST);

    let response = client.put(url).json(&body).send().await?;

    if response.status().is_success() {
        Ok(true)
    } else {
        Ok(false)
    }
}
