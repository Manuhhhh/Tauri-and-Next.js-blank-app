use reqwest::Client;

pub async fn delete_business(id: String) -> Result<bool, reqwest::Error> {
    let client = Client::new();

    let url = format!("http://localhost:3005/api/business?id={}", id);

    let response = client.delete(&url).send().await?;

    if response.status().is_success() {
        Ok(true)
    } else {
        Ok(false)
    }
}
