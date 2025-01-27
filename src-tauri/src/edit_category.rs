use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct EditCategory {
    pub edit_id: String,
    pub name: String,
    pub description: Option<String>,
    pub svg_logo: Option<String>,
    #[serde(rename = "type")] //
    pub cat_type: Option<String>,
    pub password: Option<String>,
}

pub async fn edit_category(data: EditCategory) -> Result<bool, reqwest::Error> {
    let client = Client::new();

    let url = format!("{}/api/categories/edit", crate::config::HOST);

    let response = client.put(url).json(&data).send().await?;

    if response.status().is_success() {
        Ok(true)
    } else {
        Ok(false)
    }
}
