use reqwest::Client;
pub async fn check_password(password: String) -> Result<bool, reqwest::Error> {
    let client = Client::new();

    let url = format!("http://localhost:3005/api/verify_pass?pass={}", password);

    let response = client.get(url).send().await?;
    if response.status().is_success() {
        Ok(true)
    } else {
        Ok(false)
    }
}
