from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings): # this is how class are extended in python
    database_url: str
    secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 7
    cookie_secure: bool = False

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings() #creates an instance of the Settings class when the module first loads, which will read the environment variables from the .env file and make them accessible through the settings object.