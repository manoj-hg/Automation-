from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "TechDose AI"
    demo_mode: bool = True
    environment: str = "development"
    frontend_url: str = "http://localhost:5173"

    model_config = {
        "env_file": "../../.env"
    }

settings = Settings()
