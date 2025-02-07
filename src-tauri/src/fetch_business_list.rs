use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Business {
    #[serde(rename = "_id")]
    pub id: String,
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
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    pub business_list: Vec<Business>,
    pub pages_count: u32,
}

pub async fn fetch_business_list(
    page: u32,
    search: String,
    category: String,
) -> Result<Response, reqwest::Error> {
    let client = Client::new();

    let url = format!(
        "{}/api/business?page={}&title={}&category={}",
        crate::config::HOST,
        page,
        search,
        category
    );

    let response = client.get(url).send().await?;

    if response.status().is_success() {
        let result = response.json::<Response>().await?;
        Ok(result)
    } else {
        Ok(Response {
            business_list: vec![],
            pages_count: 1,
        })
    }
}
