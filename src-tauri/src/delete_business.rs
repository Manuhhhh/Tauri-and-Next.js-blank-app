use reqwest::Client;

pub async fn delete_business(id: String, password: String) -> Result<bool, reqwest::Error> {
    let client = Client::new();

    let url = format!(
        "{}/api/business?id={}&&password={}",
        crate::config::HOST,
        id,
        password
    );

    let response = client.delete(&url).send().await?;

    if response.status().is_success() {
        Ok(true)
    } else {
        Ok(false)
    }
}
